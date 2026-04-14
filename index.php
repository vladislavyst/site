<?php

require_once dirname(__FILE__) . '/kernel.php';
$config = require __DIR__ . '/config.php';

$engine = new TemplateEngine(dirname(__FILE__) . '/static');
$router = new Router($engine, $config);
$apiHandler = new ApiHandler($config);

$router->beforeDispatch(function (Request $request, UrlBuilder $urlBuilder) use ($config) {
    if ($config['utm_pixel'] !== null) {
        $pixelValue = $request->input($config['utm_pixel']);
        
        if ($pixelValue) {
            $request->session->set('pixel_id', $pixelValue);
            setcookie('pixel_id', $pixelValue, ['httponly' => true, 'secure' => true, 'samesite' => 'Lax']);
        }
    }

    foreach($config['mapping'] as $sessionKey => $requestKey) {
        $request->session->set($sessionKey, $request->input($requestKey));
    }
});

$router->post('/process', function (Request $request, UrlBuilder $urlBuilder) use ($config, $apiHandler) {
    $params = MacroParams::fromRequest($request, array_keys($config['mapping']));
    $params->landing = $config['landing'];

    $result = $apiHandler->sendLead($params);

    if((bool)$result['success']) {

        $request->session->set('lead_id', $result['lead_id']);

        if($config['lead_postback'] !== null) {
            $postbackUrl = replacePostbackMacros($config['lead_postback'], $params->getAll());      
            
            HttpClient::make()->request('GET', $postbackUrl);
        }
    
        Response::redirect($urlBuilder->to('/success', ['lead_id' => $result['lead_id']]));
        return;
    } 

    $errors = $apiHandler->getErrors($result);
    
    $query = ['result' => 'error'];
    
    foreach ($errors as $key => $value) {
        $query[$key] = $value;
    }

    Response::redirect($urlBuilder->back($query));
});

$router->get('/check-lead', function (Request $request, UrlBuilder $url) use ($apiHandler, $config) {
    $params = MacroParams::fromRequest($request, array_keys($config['mapping']));
    
    if (is_null($params->leadId)) {
        Response::badRequest();
        return;
    }

    $result = $apiHandler->checkStatus($params->leadId);

    if($result['status'] === 'reject' && $config['reject_postback'] !== null) {        
        $postbackUrl = replacePostbackMacros($config['reject_postback'], $params->getAll());      
        
        HttpClient::make()->request('GET', $postbackUrl);
    }

    if($result['status'] === 'sent' && $config['success_postback'] !== null) {
        $postbackUrl = replacePostbackMacros($config['success_postback'], $params->getAll());      
        
        HttpClient::make()->request('GET', $postbackUrl);
    }

    Response::json($result);
});


$router->dispatch();