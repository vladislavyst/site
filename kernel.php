<?php 


class SessionManager
{
    public function __construct()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    public function set(string $key, $value): void
    {
        $_SESSION[$key] = $value;
    }

    public function get(string $key, $default = null)
    {
        return $_SESSION[$key] ?? $default;
    }

    public function has(string $key): bool
    {
        return isset($_SESSION[$key]);
    }

    public function remove(string $key): void
    {
        unset($_SESSION[$key]);
    }

    public function destroy(): void
    {
        $_SESSION = [];
        if (session_id() !== '') {
            session_destroy();
        }
    }

    public function all(): array
    {
        return $_SESSION;
    }
}

class HttpClient
{
    protected array $defaultHeaders = [];

    public function __construct(array $defaultHeaders = [])
    {
        $this->defaultHeaders = $defaultHeaders;
    }

    public static function make(array $headers = []): HttpClient {
        return new self($headers);
    }

    public function request(string $method, string $url, $body = null, array $headers = []): array
    {
        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, strtoupper($method));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);

        $mergedHeaders = array_merge($this->defaultHeaders, $headers);
        $headerArray = [];
        foreach ($mergedHeaders as $key => $value) {
            $headerArray[] = "$key: $value";
        }
        
        if (!is_null($body)) {
            if (is_array($body)) {
                $body = json_encode($body);
                if (!isset($mergedHeaders['Content-Type'])) {
                    $headerArray[] = 'Content-Type: application/json';
                }
            }
            curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        }

        curl_setopt($ch, CURLOPT_HTTPHEADER, $headerArray);

        $responseBody = curl_exec($ch);
        $error = curl_error($ch);
        $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        return [
            'status' => $statusCode,
            'body' => json_decode($responseBody, true),
            'error' => $error ?: null,
        ];
    }
}


class Router
{
    private Request $request;
    private TemplateEngine $templateEngine;
    private $basePath = "/";
    private array $routes = [];
    private $beforeDispatchHandler = null;
    public UrlBuilder $urlBuilder;

    public function __construct(TemplateEngine $engine, array $config)
    {
        $this->templateEngine = $engine;

        $this->request = new Request();
        $this->basePath = $this->getBasePath($config['hasPrefix']);

        $urlBuilder = new UrlBuilder($this->basePath, (bool)$config['SEF']);

        $this->urlBuilder = $urlBuilder;
        $this->templateEngine->setUrlGenerator($urlBuilder);
    }

    public function get(string $path, callable $handler): void
    {
        $this->route('GET', $path, $handler); 
    }

    public function post(string $path, callable $handler): void
    {
        $this->route('POST', $path, $handler);
    }

    public function route(string $method, string $route, callable $handler): void
    {
        $method = strtoupper($method);

        $this->routes[$method][$route] = $handler; 
    }

    private function defaultFallback(): callable
    {
        return function (Request $request) {
            if (strtoupper($request->method) !== 'GET') {
                return Response::methodNotAllowed();
            }
            return Response::notFound();
        };
    }

    public function beforeDispatch(callable $handler): void
    {
        $this->beforeDispatchHandler = $handler;
    }

    public function dispatch(): void
    {
        if ($this->beforeDispatchHandler) {
            ($this->beforeDispatchHandler)($this->request, $this->urlBuilder);
        }

        $method = $this->request->method;
        $route  = $this->getCurrentRoute();
        
        if (isset($this->routes[$method][$route])) {
            $handler = $this->routes[$method][$route];
            ($handler)($this->request, $this->urlBuilder);

            return;
        }

        if (
            $method === 'GET' 
            && $this->templateEngine->hasTemplate($route)
        ) {
            $html = $this->templateEngine->renderTemplate($route);

            if ($html !== '') {
                Response::render($html);

                return;
            }
        }

        $handler = $this->defaultFallback();

        ($handler)($this->request);
    }

    private function getCurrentRoute(): string
    {
        if ($this->request->action) {
            $route = '/' . ltrim($this->request->action, '/');
        } else {
            $route = $this->request->path;

            if (
                $this->basePath !== '/'
                && str_starts_with($route, $this->basePath)
            ) {
                $route = substr($route, strlen($this->basePath));
            }
        }

        $route = rtrim($route, '/');
        return $route === '' ? '/' : $route;
    }

    private function getBasePath(bool $hasPrefix): string 
    {
        if ($hasPrefix) {
            $pathSegments = explode('/', trim($this->request->path, '/'));

            return '/' . $pathSegments[0];
        }
        
        return '/';
    }
}

class UrlBuilder
{
    public bool $isSEF;
    public $basePath = null;

    public function __construct(string $basePath, bool $isSEF = true)
    {
        $this->basePath = $basePath;
        $this->isSEF = $isSEF;
    }

    public function back(array $query = []): string
    {
        $referer = $_SERVER['HTTP_REFERER'] ?? '';
        $url = parse_url($referer, PHP_URL_PATH) ?: $this->basePath;

        $url = $this->normilzeUriPath($url);

        if (count($query) > 0) {
            return $url . "?" . http_build_query($query);
        }

        return $url;
    }

    public function to(string $action, array $query = []): string
    {
        $base = rtrim($this->basePath, '/');

        if ($this->isSEF) {
            $url = $base . '/' . ltrim($action, '/');
        } else {
            $url = $base . '/'; // закрывающий слеш обязательно 
            $query['action'] = $action;
        }

        if ($query) {
            $query = http_build_query($query);
            return $url . '?' . $query;
        }

        return $url;
    }

    private function normilzeUriPath(string $path): string
    {
        if ($this->isSEF) {
           $path = rtrim($path, '/');
        } else {
            $path = rtrim($path, '/') . '/'; // закрывающий слеш обязательно 
        }

        if ($path === '') {
            $path = '/';
        }

        return $path;
    }
}

class Request 
{   
    public $method = 'GET';
    public $path;
    public $session;
    public $query = [];
    private $request = [];
    public $ip;
    public $userAgent;
    public $action = null;

    public function __construct()
    {
        $this->method = strtoupper($_SERVER['REQUEST_METHOD'] ?? 'GET');
        $this->path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?: '/';
        $this->action = isset($_GET['action']) ? $_GET['action'] : null;

        $this->query = $_GET ?? [];
        $this->request = $this->parseRequest();

        $this->session = new SessionManager();

        $this->ip = $this->determineIp();
        $this->userAgent = $_SERVER['HTTP_USER_AGENT'] ?? null;
    }

    private function parseRequest(): array
    {
        $jsonData = json_decode(file_get_contents('php://input'), true);
        if (!is_array($jsonData)) $jsonData = [];

        return array_merge($_GET ?? [], $_POST ?? [], $jsonData);
    }

    public function input(string $key,  $default = null)
    {
        return $this->request[$key] ?? $default;
    }

    public function all() 
    {
        return $this->request;
    }

    private function determineIp(): ?string
    {
        $headers = [
            'HTTP_CLIENT_IP',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED',
            'HTTP_X_CLUSTER_CLIENT_IP',
            'HTTP_FORWARDED_FOR',
            'HTTP_FORWARDED',
            'REMOTE_ADDR'
        ];
        
        foreach ($headers as $header) {
            if (isset($_SERVER[$header])) {
                $ipList = explode(',', $_SERVER[$header]);
                foreach ($ipList as $ip) {
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                        return $ip;
                    }
                }
            }
        }
        
        return $_SERVER['REMOTE_ADDR'] ?? null;
    }

    public function getOneOf(array $keys, $default = null)
    {
        foreach ($keys as $key) {
            $value = $this->input($key);

            if (is_string($value)) {
                $value = trim($value);
            }

            if ($value !== null && $value !== '') {
                return $value;
            }
        }

        return $default;
    }
}

class Response
{
    public static function render(string $content, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: text/html; charset=utf-8');
        echo $content;
    }

    public static function json(array $data, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode($data, JSON_UNESCAPED_UNICODE);
    }

    public static function text(string $content, int $status = 200): void
    {
        http_response_code($status);
        header('Content-Type: text/plain; charset=utf-8');
        echo $content;
    }

    public static function redirect(string $url, int $status = 302): void
    {
        http_response_code($status);
        header('Location: ' . $url);
    }

    public static function back(): void
    {
        $referer = $_SERVER['HTTP_REFERER'] ?? '/';

        self::redirect($referer);
    }

    public static function ok(string $content): void
    {
        self::render($content, 200);
    }

    public static function notFound(string $message = '404 Not Found'): void
    {
        self::render("<h1>404</h1><p>{$message}</p>", 404);
    }

    public static function methodNotAllowed(string $message = 'Method Not Allowed'): void
    {
        self::render("<h1>405</h1><p>{$message}</p>", 405);
    }

    public static function badRequest(): void
    {
        self::json([], 400);
    }

    public static function validationError(array $errors): void
    {
        self::json(['errors' => $errors], 422);
    }

    public static function serverError(string $message = 'Internal Server Error'): void
    {
        self::json(['error' => $message], 500);
    }

    public static function badGateway(string $message = 'Bad Gateway'): void
    {
        self::json(['error' => $message], 502);
    }

    public static function success(array $data = []): void
    {
        self::json(array_merge(['success' => true], $data), 200);
    }
}

class Logger
{
    protected string $logFile;

    public function __construct(string $logFile = 'app.log')
    {
        $this->logFile = $logFile;
    }

    public function info(string $message, array $context = []): void
    {
        $this->writeLog('INFO', $message, $context);
    }

    public function error(string $message, array $context = []): void
    {
        $this->writeLog('ERROR', $message, $context);
    }

    public function debug(string $message, array $context = []): void
    {
        $this->writeLog('DEBUG', $message, $context);
    }

    protected function writeLog(string $level, string $message, array $context): void
    {
        $entry = sprintf(
            "[%s] %s: %s %s\n",
            date('Y-m-d H:i:s'),
            $level,
            $message,
            !empty($context) ? json_encode($context, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : ''
        );

        $result = file_put_contents(__DIR__ . '/logs/' . $this->logFile, $entry, FILE_APPEND);

        if ($result === false) {
            error_log("Logger error: cannot write to {$this->logFile}");
        }
    }
}

class TemplateEngine
{
    protected string $root;
    protected string $ext;
    private array $templates = [];
    private UrlBuilder $url; 

    public function __construct(string $root, string $ext = 'html')
    {
        $this->root = rtrim($root, '/'); 
        $this->ext = strtolower(ltrim($ext, '.'));

        $this->templates = $this->collectTemplates();
    }

    public function setUrlGenerator(UrlBuilder $url)
    {
        $this->url = $url;
    }

    private function collectTemplates()
    {
        $templates = [];

        $it = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($this->root, FilesystemIterator::SKIP_DOTS),
            RecursiveIteratorIterator::LEAVES_ONLY
        );

        foreach ($it as $file) {
            if (!$file->isFile()) continue;
            if (strtolower($file->getExtension()) !== $this->ext) continue;

            $relPath = ltrim(substr($file->getRealPath(), strlen($this->root)), '/');
            $relPath = str_replace('\\', '/', $relPath);
            $relPathWithoutExt = substr($relPath, 0, -1 * (strlen($this->ext) + 1));

            $route = $this->trimRoute($relPathWithoutExt);
            $templates[$route] = $relPath;
        }

        return $templates;
    }

    public function hasTemplate(string $route): bool
    {
        return isset($this->templates[$route]);
    }

    public function renderTemplate(string $route): string
    {
        $path = $this->templates[$route] ?? null;

        if ($path === null) return '';

        return $this->readTemplate($path);
    }

    private function readTemplate(string $relPath): string
    {
        $relPath = str_replace('\\', '/', $relPath);
        $file = $this->root . '/' . trim($relPath, '/');

        if (!is_file($file)) {
            return '';
        }        
        
        return $this->renderHTML($file);
    }

    private function renderHTML(string $file): string
    {
        $content = file_get_contents($file);
        
        $content = $this->replaceRoutes($content, $this->url);
        $content = $this->replaceHtmlLinks($content, $this->url);

        $content = $this->replaceAssets($content, 'static');
        
        return $content;
    }


    private function trimRoute(string $path): string
    {
        $path = str_replace('\\', '/', $path);
        $path = trim($path, '/');

        if ($path === 'index') return '/';

        if (str_ends_with($path, '/index')) {
            $path = substr($path, 0, -strlen('/index'));
        }

        return '/' . $path;
    }

    private function replaceAssets(string $content, string $prefix = ''): string
    {
        $prefix = rtrim($prefix, '/');

        $patterns = [
            '#([="\',(\s])assets/#i',
            '#([="\',(\s])\./assets/#i',
            '#([="\',(\s])\.\./assets/#i',
            '#([="\',(\s])/assets/#i',
        ];

        $replacements = [
            '$1' . $prefix . '/assets/',
            '$1' . $prefix . '/assets/',
            '$1' . $prefix . '/assets/',
            '$1' . $prefix . '/assets/',
        ];

        $result = preg_replace($patterns, $replacements, $content);

        return $result;
    }

    private function replaceRoutes(string $content, UrlBuilder $url): string
    {
        return preg_replace_callback(
            '/\{route:([a-zA-Z0-9_-]+)\}/',
            function ($matches) use ($url) {
                $route = $matches[1];

                if ($route === 'home') {
                    $route = '/';
                }

                return $url->to($route);
            },
            $content
        );
    }

    private function replaceHtmlLinks(string $content, UrlBuilder $url): string
    {
        return preg_replace_callback(
            '/\b(href|action)\s*=\s*["\']([^"\']*\.html(?:\?[^"\']*)?(?:#[^"\']*)?)["\']/i',
            function (array $matches) use ($url) {
                $attr = $matches[1];
                $link = $matches[2];

                $parts = parse_url($link);

                $path = $parts['path'] ?? '';
                $query = $parts['query'] ?? '';
                $fragment = $parts['fragment'] ?? '';
              
                $action = preg_replace('/\.html$/i', '', $path);
                
                if ($action === 'index') {
                    $action = '';
                }

                if (str_ends_with($action, '/index')) {
                    $action = substr($action, 0, -strlen('/index'));
                }

                $result = $url->to($action);

                if ($query !== '') {
                    $result .= '?' . $query;
                }

                if ($fragment !== '') {
                    $result .= '#' . $fragment;
                }

                return $attr . '="' . $result . '"';
            },
            $content
        ) ?? $content;
    }    
}

class ApiHandler
{
    private string $apiHash;
    private string $uri;
    private HttpClient $httpClient;

    public function __construct($config)
    {
        $this->uri = rtrim($config['api_uri'], '/');
        $this->apiHash = $config['api_hash'];

        $this->httpClient = new HttpClient([
            'Authorization' => 'Bearer ' . $config['api_token'],
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ]);
    }

    public function sendLead(MacroParams $params)
    {
        $payload = [
            'flow_hash' => $params->apiHash ?? $this->apiHash,
            'first_name' => $params->firstName,
            'last_name' => $params->lastName,
            'email' => $params->email,
            'phone' => $params->phone,
            'sub1' => $params->sub1,
            'sub2' => $params->sub2,
            'sub3' => $params->sub3,
            'sub4' => $params->sub4,
            'click_id' => $params->clickId,
            'ip' => $params->ip,
            'user_agent' => $params->userAgent,
            'landing' => $params->landing,
        ];

        $result = $this->httpClient->request('POST', $this->uri . '/web/lead', $payload);

        if($result['status'] === 201) {
            return [
                'success' => true,
                'http_code' => $result['status'],
                'lead_id' => $result['body']['id'],
            ];
        }
        
        return [
            'success' => false,
            'http_code' => $result['status'],
            'errors' => $result['body']['errors'] ?? [],
        ];
    }

    public function checkStatus(int $leadId)
    {
        $result = $this->httpClient
            ->request('GET', $this->uri . '/web/lead-state', [
                'lead_id' => $leadId,
            ]);

        if($result['status'] === 200) {
            return [
                'success' => true,
                'http_code' => $result['status'],
                'status' => $result['body']['state'],
                'redirect_url' => $result['body']['redirect_url'],
            ];
        }
        
        return [
            'success' => false,
            'http_code' => $result['status'],
            'errors' => $result['body']['errors'] ?? [],
        ];
    }

    public function sendClick()
    {
        return [
            'success' => true, //либо false
            'click_id' => null, // либо errors[]
        ];
    }

    public function getErrors(array $result)
    {
        $noBrokers = 'Registration failed. If you encounter a repeated error, please contact our administrator';
        $platformError = 'Server error. Please contact our administrator';
        $status = $result['http_code'];
        $response = $result['errors'] ?? [];
        $errors = [];

        $i = 0;

        switch ($status) {
            case 401:
                $errors["error.{$i}"] = 'invalid api token';
                break;

            case 409:
                $errors["error.{$i}"] = 'fraud registration';
                break;

            case 422:
                $fieldErrors = [
                    'phone' => 'invalid phone',
                    'first_name' => 'invalid firstname',
                    'last_name' => 'invalid lastname',
                    'email' => 'invalid email',
                    'flow_hash' => 'invalid flow hash',
                    'ip' => 'invalid ip',
                ];

                foreach ($fieldErrors as $field => $msg) {
                    if (!empty($response[$field])) {
                        $errors["error.{$i}"] = $msg;
                        $i++;
                    }
                }

                break;

            case 429:
                $errors["error.{$i}"] = 'too many requests';
                break;

            case 500:
                switch ($response['message'] ?? '') {
                    case $noBrokers:
                        $errors["error.{$i}"] = 'no brokers';
                        break;

                    case $platformError:
                        $errors["error.{$i}"] = 'platform error';
                        break;

                }
                break;

            default:
                $errors["error.{$i}"] = 'unexpected error (status ' . ($status ?: 'undefined') . ')';
                break;
        }

        return $errors;
    }
}

class MacroParams
{
    public $firstName;
    public $lastName;
    public $email;
    public $phone;
    public $apiHash;
    public $sub1;
    public $sub2;
    public $sub3;
    public $sub4;
    public $clickId;
    public $ip;
    public $userAgent;
    public $landing;
    public $pixelId;
    public $leadId;
    public $leadStatus;
    public array $extra = [];

    public static function fromRequest(Request $request, array $extraKeys = []): self
    {
        $instance = new self();
        
        $instance->firstName = $request->getOneOf(['first_name', 'firstname', 'name']);
        $instance->lastName = $request->getOneOf(['last_name', 'lastname', 'surname']);
        $instance->email = $request->getOneOf(['email', 'correo', 'mail']);
        $instance->phone = $request->getOneOf(['phone', 'phone_raw', 'telefono', 'tel']);
        $instance->apiHash = $request->getOneOf(['flow_hash', 'hash']);
        
        $instance->sub1 = $request->input('sub1');
        $instance->sub2 = $request->input('sub2');
        $instance->sub3 = $request->input('sub3');
        $instance->sub4 = $request->input('sub4');
        
        $instance->clickId = $request->getOneOf(['click_id', 'subid', 'sub_id']);
        
        $instance->ip = $request->ip;
        $instance->userAgent = $request->userAgent;

        $instance->leadId =$request->input('lead_id') ?? $request->session->get('lead_id');
        
        foreach ($extraKeys as $key) {
            $instance->extra[$key] = $request->session->get($key);
        }
        
        return $instance;
    }


    public function __get(string $name)
    {
        if (property_exists($this, $name)) {
            return $this->$name;
        }
        
        if (array_key_exists($name, $this->extra)) {
            return $this->extra[$name];
        }
        
        return null;
    }

    public function getExtra(string $key, $default = null)
    {
        return $this->extra[$key] ?? $default;
    }
    
    public function putExtra(string $key, $value): self
    {
        $this->extra[$key] = $value;
        return $this;
    }
    
    public function hasExtra(string $key): bool
    {
        return array_key_exists($key, $this->extra);
    }
    
    public function getAllExtra(): array
    {
        return $this->extra;
    }

    public function getAll(): array
    {
        $result = get_object_vars($this);
        unset($result['extra']);
        
        foreach ($this->extra as $key => $value) {
            $result[$key] = $value;
        }
        
        return $result;
    }
}

function replacePostbackMacros(string $url, array $params): string
{
    foreach ($params as $key => $value) {
        $url = str_replace('{' . $key . '}', urlencode($value ?? ''), $url);
    }
    
    return $url;
}

if (!function_exists('ulid')) {
    function ulid(): string
    {
        return strtoupper(
            base_convert((string) (int)(microtime(true) * 1000), 10, 32)
            . bin2hex(random_bytes(8))
        );
    }
}

// для php7.4
if (!function_exists('str_ends_with')) {
    function str_ends_with(string $haystack, string $needle): bool
    {
        if ($needle === '') return true;

        $needleLen = strlen($needle);
        if ($needleLen > strlen($haystack)) return false;

        return substr($haystack, -$needleLen) === $needle;
    }
}

if (!function_exists('str_starts_with')) {
    function str_starts_with(string $haystack, string $needle): bool
    {
        return $needle === '' || strpos($haystack, $needle) === 0;
    }
}
