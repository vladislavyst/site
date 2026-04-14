window.FIELD_ERROR_KEYS = new Set([
    "invalid phone",
    "invalid firstname",
    "invalid lastname",
    "invalid email",
]);

window.ERROR_I18N = {
    ja: {
        close: "閉じる",
        errorsModal: {
            "invalid api token": {
                message: "無効なAPIトークンです。",
            },
            "fraud registration": {
                message:
                    "現在、リクエストを処理できません。入力されたデータはすでに当社のシステムに登録されています。",
            },
            "invalid flow hash": {
                title: "登録に失敗しました",
                message:
                    "選択されたflow hashは無効です。\n" +
                    "このflowはAPI経由での利用を目的としていません。",
            },
            "invalid ip": {
                message: "ipフィールドは必須です。",
            },
            "too many requests": {
                message: "リクエストが多すぎます。",
            },
            "no brokers": {
                message:
                    "登録に失敗しました。\n" +
                    "エラーが解消されない場合は、\n" +
                    "管理者にお問い合わせください。",
            },
            "platform error": {
                message: "サーバーエラーが発生しました。管理者にお問い合わせください。",
            },
            "unexpected error": {
                message: "予期しないエラーが発生しました（ステータス：{{status}}）。",
            },
        },
        errorsInput: {
            "invalid firstname": "first_nameフィールドが未入力、または無効です。",
            "invalid lastname": "last_nameフィールドが未入力、または無効です。",
            "invalid email": "emailフィールドが未入力、または無効です。",
            "invalid phone": "phoneフィールドが未入力、または無効です。",
        },
        later: "ご不便をおかけして申し訳ございません。",
    },
    ru: {
        close: "Закрыть",
        errorsModal: {
            "invalid api token": {
                message: "Недействительный API-токен",
            },
            "fraud registration": {
                message:
                    "Мы не можем обработать ваш запрос в данный момент, так как указанные данные уже зарегистрированы в нашей системе.",
            },
            "invalid flow hash": {
                title: "Регистрация не удалась",
                message:
                    "Выбранный flow hash недействителен.\n" +
                    "Этот flow не предназначен для работы через API.",
            },
            "invalid ip": {
                message: "Поле IP обязательно.",
            },
            "too many requests": {
                message: "Слишком много запросов.",
            },
            "no brokers": {
                message:
                    "Регистрация не удалась.\n" +
                    "Если ошибка повторяется,\n" +
                    "пожалуйста, свяжитесь с администратором.",
            },
            "platform error": {
                message: "Ошибка сервера. Пожалуйста, свяжитесь с администратором.",
            },
            "unexpected error": {
                message: "Произошла непредвиденная ошибка (статус: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Поле first_name не заполнено или заполнено некорректно",
            "invalid lastname": "Поле last_name не заполнено или заполнено некорректно",
            "invalid email": "Поле email не заполнено или заполнено некорректно",
            "invalid phone": "Поле phone не заполнено или заполнено некорректно",
        },
        later: "Приносим извинения за неудобства!",
    },
    en: {
        close: "Close",
        errorsModal: {
            "invalid api token": {
                message: "Invalid API token.",
            },
            "fraud registration": {
                message:
                    "We are unable to process your request at the moment, as the provided data already exists in our system.",
            },
            "invalid flow hash": {
                title: "Registration failed",
                message:
                    "The selected flow hash is invalid.\n" +
                    "This flow is not intended for use via the API.",
            },
            "invalid ip": {
                message: "The IP field is required.",
            },
            "too many requests": {
                message: "Too many requests.",
            },
            "no brokers": {
                message:
                    "Registration failed.\n" +
                    "If the error persists,\n" +
                    "please contact support.",
            },
            "platform error": {
                message: "Server error. Please contact support.",
            },
            "unexpected error": {
                message: "An unexpected error occurred (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "The first_name field is missing or invalid.",
            "invalid lastname": "The last_name field is missing or invalid.",
            "invalid email": "The email field is missing or invalid.",
            "invalid phone": "The phone field is missing or invalid.",
        },
        later: "We apologize for the inconvenience!",
    },
    sk: {
        close: "Zavrieť",
        errorsModal: {
            "invalid api token": {
                message: "Neplatný API token.",
            },
            "fraud registration": {
                message:
                    "Momentálne nemôžeme spracovať vašu požiadavku, pretože zadané údaje sú už zaregistrované v našom systéme.",
            },
            "invalid flow hash": {
                title: "Registrácia zlyhala",
                message:
                    "Zvolený flow hash je neplatný.\n" +
                    "Tento flow nie je určený na použitie prostredníctvom API.",
            },
            "invalid ip": {
                message: "Pole IP je povinné.",
            },
            "too many requests": {
                message: "Príliš veľa požiadaviek.",
            },
            "no brokers": {
                message:
                    "Registrácia zlyhala.\n" +
                    "Ak sa chyba opakuje,\n" +
                    "kontaktujte administrátora.",
            },
            "platform error": {
                message: "Chyba servera. Kontaktujte administrátora.",
            },
            "unexpected error": {
                message: "Vyskytla sa neočakávaná chyba (stav: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Pole first_name nie je vyplnené alebo je vyplnené nesprávne.",
            "invalid lastname": "Pole last_name nie je vyplnené alebo je vyplnené nesprávne.",
            "invalid email": "Pole email nie je vyplnené alebo je vyplnené nesprávne.",
            "invalid phone": "Pole phone nie je vyplnené alebo je vyplnené nesprávne.",
        },
        later: "Ospravedlňujeme sa za nepríjemnosti!",
    },
    sv: {
        close: "Stäng",
        errorsModal: {
            "invalid api token": {
                message: "Ogiltig API-token.",
            },
            "fraud registration": {
                message:
                    "Vi kan inte behandla din begäran just nu eftersom de angivna uppgifterna redan är registrerade i vårt system.",
            },
            "invalid flow hash": {
                title: "Registreringen misslyckades",
                message:
                    "Den valda flow hash är ogiltig.\n" +
                    "Denna flow är inte avsedd för användning via API.",
            },
            "invalid ip": {
                message: "Fältet IP är obligatoriskt.",
            },
            "too many requests": {
                message: "För många förfrågningar.",
            },
            "no brokers": {
                message:
                    "Registreringen misslyckades.\n" +
                    "Om felet kvarstår,\n" +
                    "vänligen kontakta administratören.",
            },
            "platform error": {
                message: "Serverfel. Vänligen kontakta administratören.",
            },
            "unexpected error": {
                message: "Ett oväntat fel inträffade (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Fältet first_name är tomt eller ogiltigt.",
            "invalid lastname": "Fältet last_name är tomt eller ogiltigt.",
            "invalid email": "Fältet email är tomt eller ogiltigt.",
            "invalid phone": "Fältet phone är tomt eller ogiltigt.",
        },
        later: "Vi ber om ursäkt för besväret!",
    },
    tr: {
        close: "Kapat",
        errorsModal: {
            "invalid api token": {
                message: "Geçersiz API belirteci.",
            },
            "fraud registration": {
                message:
                    "Sağlanan veriler sistemimizde zaten kayıtlı olduğu için isteğinizi şu anda işleyemiyoruz.",
            },
            "invalid flow hash": {
                title: "Kayıt başarısız oldu",
                message:
                    "Seçilen flow hash geçersizdir.\n" +
                    "Bu flow, API üzerinden kullanım için tasarlanmamıştır.",
            },
            "invalid ip": {
                message: "IP alanı zorunludur.",
            },
            "too many requests": {
                message: "Çok fazla istek.",
            },
            "no brokers": {
                message:
                    "Kayıt başarısız oldu.\n" +
                    "Hata devam ederse,\n" +
                    "lütfen sistem yöneticisi ile iletişime geçin.",
            },
            "platform error": {
                message: "Sunucu hatası. Lütfen sistem yöneticisi ile iletişime geçin.",
            },
            "unexpected error": {
                message: "Beklenmeyen bir hata oluştu (durum: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "first_name alanı boş veya geçersiz.",
            "invalid lastname": "last_name alanı boş veya geçersiz.",
            "invalid email": "email alanı boş veya geçersiz.",
            "invalid phone": "phone alanı boş veya geçersiz.",
        },
        later: "Yaşanan aksaklık için özür dileriz!",
    },
    zh: {
        close: "关闭",
        errorsModal: {
            "invalid api token": {
                message: "无效的 API 令牌。",
            },
            "fraud registration": {
                message:
                    "目前无法处理您的请求，因为所提供的数据已在我们的系统中注册。",
            },
            "invalid flow hash": {
                title: "注册失败",
                message:
                    "所选的 flow hash 无效。\n" +
                    "该 flow 不支持通过 API 进行操作。",
            },
            "invalid ip": {
                message: "IP 字段为必填项。",
            },
            "too many requests": {
                message: "请求过多。",
            },
            "no brokers": {
                message:
                    "注册失败。\n" +
                    "如果错误持续出现，\n" +
                    "请联系管理员。",
            },
            "platform error": {
                message: "服务器错误。请联系管理员。",
            },
            "unexpected error": {
                message: "发生了意外错误（状态：{{status}}）。",
            },
        },
        errorsInput: {
            "invalid firstname": "first_name 字段未填写或填写不正确。",
            "invalid lastname": "last_name 字段未填写或填写不正确。",
            "invalid email": "email 字段未填写或填写不正确。",
            "invalid phone": "phone 字段未填写或填写不正确。",
        },
        later: "对于给您带来的不便，我们深表歉意！",
    },
    lv: {
        close: "Aizvērt",
        errorsModal: {
            "invalid api token": {
                message: "Nederīgs API marķieris.",
            },
            "fraud registration": {
                message:
                    "Pašlaik mēs nevaram apstrādāt jūsu pieprasījumu, jo norādītie dati jau ir mūsu sistēmā.",
            },
            "invalid flow hash": {
                title: "Reģistrācija neizdevās",
                message:
                    "Izvēlētais flow hash ir nederīgs.\n" +
                    "Šis flow nav paredzēts lietošanai, izmantojot API.",
            },
            "invalid ip": {
                message: "Lauks ip ir obligāts.",
            },
            "too many requests": {
                message: "Pārāk daudz pieprasījumu.",
            },
            "no brokers": {
                message:
                    "Reģistrācija neizdevās.\n" +
                    "Ja kļūda atkārtojas,\n" +
                    "lūdzu, sazinieties ar administratoru.",
            },
            "platform error": {
                message: "Servera kļūda. Lūdzu, sazinieties ar administratoru.",
            },
            "unexpected error": {
                message: "Radās neparedzēta kļūda (statuss: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Lauks first_name nav aizpildīts vai ir nederīgs.",
            "invalid lastname": "Lauks last_name nav aizpildīts vai ir nederīgs.",
            "invalid email": "Lauks email nav aizpildīts vai ir nederīgs.",
            "invalid phone": "Lauks phone nav aizpildīts vai ir nederīgs.",
        },
        later: "Atvainojamies par sagādātajām neērtībām!",
    },
    nl: {
        close: "Sluiten",
        errorsModal: {
            "invalid api token": {
                message: "Ongeldige API-token.",
            },
            "fraud registration": {
                message:
                    "We kunnen uw verzoek momenteel niet verwerken, omdat de opgegeven gegevens al in ons systeem aanwezig zijn.",
            },
            "invalid flow hash": {
                title: "Registratie mislukt",
                message:
                    "De geselecteerde flow hash is ongeldig.\n" +
                    "Deze flow is niet bedoeld voor gebruik via de API.",
            },
            "invalid ip": {
                message: "Het IP-veld is verplicht.",
            },
            "too many requests": {
                message: "Te veel verzoeken.",
            },
            "no brokers": {
                message:
                    "Registratie mislukt.\n" +
                    "Als de fout zich blijft voordoen,\n" +
                    "neem dan contact op met de beheerder.",
            },
            "platform error": {
                message: "Serverfout. Neem contact op met de beheerder.",
            },
            "unexpected error": {
                message: "Er is een onverwachte fout opgetreden (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Het veld first_name is niet ingevuld of ongeldig.",
            "invalid lastname": "Het veld last_name is niet ingevuld of ongeldig.",
            "invalid email": "Het veld email is niet ingevuld of ongeldig.",
            "invalid phone": "Het veld phone is niet ingevuld of ongeldig.",
        },
        later: "Onze excuses voor het ongemak!",
    },
    no: {
        close: "Lukk",
        errorsModal: {
            "invalid api token": {
                message: "Ugyldig API-token.",
            },
            "fraud registration": {
                message:
                    "Vi kan ikke behandle forespørselen din for øyeblikket, siden de oppgitte dataene allerede er registrert i systemet vårt.",
            },
            "invalid flow hash": {
                title: "Registreringen mislyktes",
                message:
                    "Den valgte flow hash er ugyldig.\n" +
                    "Denne flow er ikke beregnet for bruk via API.",
            },
            "invalid ip": {
                message: "IP-feltet er obligatorisk.",
            },
            "too many requests": {
                message: "For mange forespørsler.",
            },
            "no brokers": {
                message:
                    "Registreringen mislyktes.\n" +
                    "Hvis feilen vedvarer,\n" +
                    "vennligst kontakt systemadministratoren.",
            },
            "platform error": {
                message: "Serverfeil. Vennligst kontakt systemadministratoren.",
            },
            "unexpected error": {
                message: "En uventet feil oppstod (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Feltet first_name er tomt eller ugyldig.",
            "invalid lastname": "Feltet last_name er tomt eller ugyldig.",
            "invalid email": "Feltet email er tomt eller ugyldig.",
            "invalid phone": "Feltet phone er tomt eller ugyldig.",
        },
        later: "Vi beklager ulempen!",
    },
    pl: {
        close: "Zamknij",
        errorsModal: {
            "invalid api token": {
                message: "Nieprawidłowy token API.",
            },
            "fraud registration": {
                message:
                    "Nie możemy obecnie przetworzyć Twojego żądania, ponieważ podane dane są już zapisane w naszym systemie.",
            },
            "invalid flow hash": {
                title: "Rejestracja nie powiodła się",
                message:
                    "Wybrany flow hash jest nieprawidłowy.\n" +
                    "Ten flow nie jest przeznaczony do użycia za pośrednictwem API.",
            },
            "invalid ip": {
                message: "Pole IP jest wymagane.",
            },
            "too many requests": {
                message: "Zbyt wiele żądań.",
            },
            "no brokers": {
                message:
                    "Rejestracja nie powiodła się.\n" +
                    "Jeśli błąd się powtarza,\n" +
                    "skontaktuj się z administratorem.",
            },
            "platform error": {
                message: "Błąd serwera. Skontaktuj się z administratorem.",
            },
            "unexpected error": {
                message: "Wystąpił nieoczekiwany błąd (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Pole first_name jest puste lub nieprawidłowe.",
            "invalid lastname": "Pole last_name jest puste lub nieprawidłowe.",
            "invalid email": "Pole email jest puste lub nieprawidłowe.",
            "invalid phone": "Pole phone jest puste lub nieprawidłowe.",
        },
        later: "Przepraszamy za niedogodności!",
    },
    pt: {
        close: "Fechar",
        errorsModal: {
            "invalid api token": {
                message: "Token de API inválido.",
            },
            "fraud registration": {
                message:
                    "Não podemos processar sua solicitação no momento, pois os dados fornecidos já estão registrados em nosso sistema.",
            },
            "invalid flow hash": {
                title: "Falha no registro",
                message:
                    "O flow hash selecionado é inválido.\n" +
                    "Este flow não se destina ao uso por meio da API.",
            },
            "invalid ip": {
                message: "O campo IP é obrigatório.",
            },
            "too many requests": {
                message: "Muitas solicitações.",
            },
            "no brokers": {
                message:
                    "Falha no registro.\n" +
                    "Se o erro persistir,\n" +
                    "entre em contato com o administrador.",
            },
            "platform error": {
                message: "Erro no servidor. Entre em contato com o administrador.",
            },
            "unexpected error": {
                message: "Ocorreu um erro inesperado (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "O campo first_name está vazio ou é inválido.",
            "invalid lastname": "O campo last_name está vazio ou é inválido.",
            "invalid email": "O campo email está vazio ou é inválido.",
            "invalid phone": "O campo phone está vazio ou é inválido.",
        },
        later: "Pedimos desculpas pelo inconveniente!",
    },
    ro: {
        close: "Închide",
        errorsModal: {
            "invalid api token": {
                message: "Token API invalid.",
            },
            "fraud registration": {
                message:
                    "Nu putem procesa solicitarea dvs. în acest moment, deoarece datele furnizate sunt deja înregistrate în sistemul nostru.",
            },
            "invalid flow hash": {
                title: "Înregistrarea a eșuat",
                message:
                    "Flow hash-ul selectat este invalid.\n" +
                    "Acest flow nu este destinat utilizării prin API.",
            },
            "invalid ip": {
                message: "Câmpul IP este obligatoriu.",
            },
            "too many requests": {
                message: "Prea multe solicitări.",
            },
            "no brokers": {
                message:
                    "Înregistrarea a eșuat.\n" +
                    "Dacă eroarea persistă,\n" +
                    "vă rugăm să contactați administratorul.",
            },
            "platform error": {
                message: "Eroare de server. Vă rugăm să contactați administratorul.",
            },
            "unexpected error": {
                message: "A apărut o eroare neașteptată (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Câmpul first_name este gol sau invalid.",
            "invalid lastname": "Câmpul last_name este gol sau invalid.",
            "invalid email": "Câmpul email este gol sau invalid.",
            "invalid phone": "Câmpul phone este gol sau invalid.",
        },
        later: "Ne cerem scuze pentru inconvenient!",
    },
    et: {
        close: "Sulge",
        errorsModal: {
            "invalid api token": {
                message: "Kehtetu API-token.",
            },
            "fraud registration": {
                message:
                    "Me ei saa teie taotlust praegu töödelda, kuna esitatud andmed on meie süsteemis juba olemas.",
            },
            "invalid flow hash": {
                title: "Registreerimine ebaõnnestus",
                message:
                    "Valitud flow hash on vigane.\n" +
                    "See flow ei ole mõeldud kasutamiseks API kaudu.",
            },
            "invalid ip": {
                message: "Väli ip on kohustuslik.",
            },
            "too many requests": {
                message: "Liiga palju päringuid.",
            },
            "no brokers": {
                message:
                    "Registreerimine ebaõnnestus.\n" +
                    "Kui viga kordub,\n" +
                    "palun võtke ühendust administraatoriga.",
            },
            "platform error": {
                message: "Serveri viga. Palun võtke ühendust administraatoriga.",
            },
            "unexpected error": {
                message: "Ilmnes ootamatu viga (staatus: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Väli first_name puudub või on vigane.",
            "invalid lastname": "Väli last_name puudub või on vigane.",
            "invalid email": "Väli email puudub või on vigane.",
            "invalid phone": "Väli phone puudub või on vigane.",
        },
        later: "Vabandame ebamugavuste pärast!",
    },
    fr: {
        close: "Fermer",
        errorsModal: {
            "invalid api token": {
                message: "Jeton d'API invalide.",
            },
            "fraud registration": {
                message:
                    "Nous ne pouvons pas traiter votre demande pour le moment, car les données fournies existent déjà dans notre système.",
            },
            "invalid flow hash": {
                title: "Échec de l'inscription",
                message:
                    "Le flow hash sélectionné est invalide.\n" +
                    "Ce flow n'est pas destiné à être utilisé via l'API.",
            },
            "invalid ip": {
                message: "Le champ ip est requis.",
            },
            "too many requests": {
                message: "Trop de requêtes.",
            },
            "no brokers": {
                message:
                    "Échec de l'inscription.\n" +
                    "Si l'erreur persiste,\n" +
                    "veuillez contacter l'administrateur.",
            },
            "platform error": {
                message: "Erreur du serveur. Veuillez contacter l'administrateur.",
            },
            "unexpected error": {
                message: "Une erreur inattendue s'est produite (statut : {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Le champ first_name est manquant ou non valide.",
            "invalid lastname": "Le champ last_name est manquant ou non valide.",
            "invalid email": "Le champ email est manquant ou non valide.",
            "invalid phone": "Le champ phone est manquant ou non valide.",
        },
        later: "Nous vous présentons nos excuses pour la gêne occasionnée !",
    },
    hi: {
        close: "बंद करें",
        errorsModal: {
            "invalid api token": {
                message: "अमान्य API टोकन।",
            },
            "fraud registration": {
                message:
                    "हम इस समय आपके अनुरोध को संसाधित नहीं कर सकते, क्योंकि प्रदान किया गया डेटा पहले से ही हमारे सिस्टम में मौजूद है।",
            },
            "invalid flow hash": {
                title: "पंजीकरण असफल रहा",
                message:
                    "चयनित flow hash अमान्य है।\n" +
                    "यह flow API के माध्यम से उपयोग के लिए अभिप्रेत नहीं है।",
            },
            "invalid ip": {
                message: "ip फ़ील्ड आवश्यक है।",
            },
            "too many requests": {
                message: "बहुत अधिक अनुरोध।",
            },
            "no brokers": {
                message:
                    "पंजीकरण असफल रहा।\n" +
                    "यदि त्रुटि बनी रहती है,\n" +
                    "कृपया व्यवस्थापक से संपर्क करें।",
            },
            "platform error": {
                message: "सर्वर में त्रुटि हुई। कृपया व्यवस्थापक से संपर्क करें।",
            },
            "unexpected error": {
                message: "एक अप्रत्याशित त्रुटि हुई (स्थिति: {{status}})।",
            },
        },
        errorsInput: {
            "invalid firstname": "first_name फ़ील्ड अनुपलब्ध है या अमान्य है।",
            "invalid lastname": "last_name फ़ील्ड अनुपलब्ध है या अमान्य है।",
            "invalid email": "email फ़ील्ड अनुपलब्ध है या अमान्य है।",
            "invalid phone": "phone फ़ील्ड अनुपलब्ध है या अमान्य है।",
        },
        later: "हमें हुई असुविधा के लिए खेद है!",
    },
    hu: {
        close: "Bezárás",
        errorsModal: {
            "invalid api token": {
                message: "Érvénytelen API-token.",
            },
            "fraud registration": {
                message:
                    "Jelenleg nem tudjuk feldolgozni a kérését, mivel a megadott adatok már szerepelnek a rendszerünkben.",
            },
            "invalid flow hash": {
                title: "A regisztráció sikertelen",
                message:
                    "A kiválasztott flow hash érvénytelen.\n" +
                    "Ez a flow nem használható az API-n keresztül.",
            },
            "invalid ip": {
                message: "Az ip mező kitöltése kötelező.",
            },
            "too many requests": {
                message: "Túl sok kérés.",
            },
            "no brokers": {
                message:
                    "A regisztráció sikertelen.\n" +
                    "Ha a hiba továbbra is fennáll,\n" +
                    "kérjük, lépjen kapcsolatba az adminisztrátorral.",
            },
            "platform error": {
                message: "Szerverhiba. Kérjük, lépjen kapcsolatba az adminisztrátorral.",
            },
            "unexpected error": {
                message: "Váratlan hiba történt (állapot: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "A first_name mező hiányzik vagy hibás.",
            "invalid lastname": "A last_name mező hiányzik vagy hibás.",
            "invalid email": "Az email mező hiányzik vagy hibás.",
            "invalid phone": "A phone mező hiányzik vagy hibás.",
        },
        later: "Elnézést kérünk a kellemetlenségért!",
    },
    it: {
        close: "Chiudi",
        errorsModal: {
            "invalid api token": {
                message: "Token API non valido.",
            },
            "fraud registration": {
                message:
                    "Non possiamo elaborare la tua richiesta al momento, poiché i dati forniti sono già presenti nel nostro sistema.",
            },
            "invalid flow hash": {
                title: "Registrazione non riuscita",
                message:
                    "Il flow hash selezionato non è valido.\n" +
                    "Questo flow non è destinato all'utilizzo tramite l'API.",
            },
            "invalid ip": {
                message: "Il campo ip è obbligatorio.",
            },
            "too many requests": {
                message: "Troppe richieste.",
            },
            "no brokers": {
                message:
                    "Registrazione non riuscita.\n" +
                    "Se l'errore persiste,\n" +
                    "contatta l'amministratore.",
            },
            "platform error": {
                message: "Errore del server. Contatta l'amministratore.",
            },
            "unexpected error": {
                message: "Si è verificato un errore imprevisto (stato: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Il campo first_name è mancante o non valido.",
            "invalid lastname": "Il campo last_name è mancante o non valido.",
            "invalid email": "Il campo email è mancante o non valido.",
            "invalid phone": "Il campo phone è mancante o non valido.",
        },
        later: "Ci scusiamo per l'inconveniente!",
    },
    ko: {
        close: "닫기",
        errorsModal: {
            "invalid api token": {
                message: "유효하지 않은 API 토큰입니다.",
            },
            "fraud registration": {
                message:
                    "입력하신 데이터가 이미 당사 시스템에 등록되어 있어 현재 요청을 처리할 수 없습니다.",
            },
            "invalid flow hash": {
                title: "등록에 실패했습니다",
                message:
                    "선택한 flow hash가 유효하지 않습니다.\n" +
                    "이 flow는 API를 통해 사용하도록 설계되지 않았습니다.",
            },
            "invalid ip": {
                message: "ip 필드는 필수 항목입니다.",
            },
            "too many requests": {
                message: "요청이 너무 많습니다.",
            },
            "no brokers": {
                message:
                    "등록에 실패했습니다.\n" +
                    "문제가 지속되면,\n" +
                    "관리자에게 문의해 주세요.",
            },
            "platform error": {
                message: "서버 오류가 발생했습니다. 관리자에게 문의해 주세요.",
            },
            "unexpected error": {
                message: "예기치 않은 오류가 발생했습니다 (상태: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "first_name 필드가 누락되었거나 올바르지 않습니다.",
            "invalid lastname": "last_name 필드가 누락되었거나 올바르지 않습니다.",
            "invalid email": "email 필드가 누락되었거나 올바르지 않습니다.",
            "invalid phone": "phone 필드가 누락되었거나 올바르지 않습니다.",
        },
        later: "불편을 드려 죄송합니다!",
    },
    ar: {
        close: "إغلاق",
        errorsModal: {
            "invalid api token": {
                message: "رمز API غير صالح.",
            },
            "fraud registration": {
                message:
                    "لا يمكننا معالجة طلبك في الوقت الحالي، لأن البيانات المُدخلة موجودة بالفعل في نظامنا.",
            },
            "invalid flow hash": {
                title: "فشل التسجيل",
                message:
                    "قيمة flow hash المحددة غير صالحة.\n" +
                    "هذا الـ flow غير مخصص للعمل عبر API.",
            },
            "invalid ip": {
                message: "حقل ip مطلوب.",
            },
            "too many requests": {
                message: "عدد الطلبات كبير جدًا.",
            },
            "no brokers": {
                message:
                    "فشل التسجيل.\n" +
                    "في حال تكرار الخطأ،\n" +
                    "يرجى التواصل مع المسؤول.",
            },
            "platform error": {
                message: "خطأ في الخادم. يرجى التواصل مع المسؤول.",
            },
            "unexpected error": {
                message: "حدث خطأ غير متوقع (الحالة: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "حقل first_name فارغ أو تم إدخاله بشكل غير صحيح.",
            "invalid lastname": "حقل last_name فارغ أو تم إدخاله بشكل غير صحيح.",
            "invalid email": "حقل email فارغ أو تم إدخاله بشكل غير صحيح.",
            "invalid phone": "حقل phone فارغ أو تم إدخاله بشكل غير صحيح.",
        },
        later: "نعتذر عن أي إزعاج!",
    },
    bg: {
        close: "Затвори",
        errorsModal: {
            "invalid api token": {
                message: "Невалиден API токен.",
            },
            "fraud registration": {
                message:
                    "В момента не можем да обработим вашата заявка, тъй като предоставените данни вече съществуват в нашата система.",
            },
            "invalid flow hash": {
                title: "Регистрацията е неуспешна",
                message:
                    "Избраният flow hash е невалиден.\n" +
                    "Този flow не е предназначен за работа чрез API.",
            },
            "invalid ip": {
                message: "Полето ip е задължително.",
            },
            "too many requests": {
                message: "Твърде много заявки.",
            },
            "no brokers": {
                message:
                    "Регистрацията е неуспешна.\n" +
                    "Ако грешката се повтаря,\n" +
                    "моля, свържете се с администратора.",
            },
            "platform error": {
                message: "Сървърна грешка. Моля, свържете се с администратора.",
            },
            "unexpected error": {
                message: "Възникна неочаквана грешка (статус: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Полето first_name не е попълнено или е попълнено неправилно.",
            "invalid lastname": "Полето last_name не е попълнено или е попълнено неправилно.",
            "invalid email": "Полето email не е попълнено или е попълнено неправилно.",
            "invalid phone": "Полето phone не е попълнено или е попълнено неправилно.",
        },
        later: "Извиняваме се за причиненото неудобство!",
    },
    cs: {
        close: "Zavřít",
        errorsModal: {
            "invalid api token": {
                message: "Neplatný API token.",
            },
            "fraud registration": {
                message:
                    "V tuto chvíli nemůžeme zpracovat váš požadavek, protože zadané údaje již existují v našem systému.",
            },
            "invalid flow hash": {
                title: "Registrace se nezdařila",
                message:
                    "Zvolený flow hash je neplatný.\n" +
                    "Tento flow není určen pro použití prostřednictvím API.",
            },
            "invalid ip": {
                message: "Pole ip je povinné.",
            },
            "too many requests": {
                message: "Příliš mnoho požadavků.",
            },
            "no brokers": {
                message:
                    "Registrace se nezdařila.\n" +
                    "Pokud se chyba opakuje,\n" +
                    "kontaktujte prosím administrátora.",
            },
            "platform error": {
                message: "Chyba serveru. Kontaktujte prosím administrátora.",
            },
            "unexpected error": {
                message: "Došlo k neočekávané chybě (stav: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Pole first_name není vyplněno nebo je vyplněno nesprávně.",
            "invalid lastname": "Pole last_name není vyplněno nebo je vyplněno nesprávně.",
            "invalid email": "Pole email není vyplněno nebo je vyplněno nesprávně.",
            "invalid phone": "Pole phone není vyplněno nebo je vyplněno nesprávně.",
        },
        later: "Omlouváme se za způsobené nepříjemnosti!",
    },
    da: {
        close: "Luk",
        errorsModal: {
            "invalid api token": {
                message: "Ugyldigt API-token.",
            },
            "fraud registration": {
                message:
                    "Vi kan ikke behandle din anmodning i øjeblikket, da de angivne oplysninger allerede findes i vores system.",
            },
            "invalid flow hash": {
                title: "Registreringen mislykkedes",
                message:
                    "Den valgte flow hash er ugyldig.\n" +
                    "Dette flow er ikke beregnet til brug gennem API.",
            },
            "invalid ip": {
                message: "Feltet ip er påkrævet.",
            },
            "too many requests": {
                message: "For mange anmodninger.",
            },
            "no brokers": {
                message:
                    "Registreringen mislykkedes.\n" +
                    "Hvis fejlen gentager sig,\n" +
                    "bedes du kontakte administratoren.",
            },
            "platform error": {
                message: "Serverfejl. Kontakt venligst administratoren.",
            },
            "unexpected error": {
                message: "Der opstod en uventet fejl (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Feltet first_name er ikke udfyldt eller er udfyldt forkert.",
            "invalid lastname": "Feltet last_name er ikke udfyldt eller er udfyldt forkert.",
            "invalid email": "Feltet email er ikke udfyldt eller er udfyldt forkert.",
            "invalid phone": "Feltet phone er ikke udfyldt eller er udfyldt forkert.",
        },
        later: "Vi beklager ulejligheden!",
    },
    de: {
        close: "Schließen",
        errorsModal: {
            "invalid api token": {
                message: "Ungültiger API-Token.",
            },
            "fraud registration": {
                message:
                    "Wir können Ihre Anfrage derzeit nicht verarbeiten, da die angegebenen Daten bereits in unserem System vorhanden sind.",
            },
            "invalid flow hash": {
                title: "Registrierung fehlgeschlagen",
                message:
                    "Der ausgewählte Flow-Hash ist ungültig.\n" +
                    "Dieser Flow ist nicht für die Verwendung über die API vorgesehen.",
            },
            "invalid ip": {
                message: "Das Feld ip ist erforderlich.",
            },
            "too many requests": {
                message: "Zu viele Anfragen.",
            },
            "no brokers": {
                message:
                    "Registrierung fehlgeschlagen.\n" +
                    "Wenn der Fehler weiterhin auftritt,\n" +
                    "wenden Sie sich bitte an den Administrator.",
            },
            "platform error": {
                message: "Serverfehler. Bitte kontaktieren Sie den Administrator.",
            },
            "unexpected error": {
                message: "Ein unerwarteter Fehler ist aufgetreten (Status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Das Feld first_name fehlt oder ist ungültig.",
            "invalid lastname": "Das Feld last_name fehlt oder ist ungültig.",
            "invalid email": "Das Feld email fehlt oder ist ungültig.",
            "invalid phone": "Das Feld phone fehlt oder ist ungültig.",
        },
        later: "Wir entschuldigen uns für die Unannehmlichkeiten!",
    },
    es: {
        close: "Cerrar",
        errorsModal: {
            "invalid api token": {
                message: "Token de API no válido.",
            },
            "fraud registration": {
                message:
                    "No podemos procesar su solicitud en este momento, ya que los datos proporcionados ya existen en nuestro sistema.",
            },
            "invalid flow hash": {
                title: "Error de registro",
                message:
                    "El flow hash seleccionado no es válido.\n" +
                    "Este flow no está destinado a su uso a través de la API.",
            },
            "invalid ip": {
                message: "El campo ip es obligatorio.",
            },
            "too many requests": {
                message: "Demasiadas solicitudes.",
            },
            "no brokers": {
                message:
                    "Error de registro.\n" +
                    "Si el error persiste,\n" +
                    "por favor, póngase en contacto con el administrador.",
            },
            "platform error": {
                message: "Error del servidor. Por favor, póngase en contacto con el administrador.",
            },
            "unexpected error": {
                message: "Se produjo un error inesperado (estado: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "El campo first_name no está completo o es incorrecto.",
            "invalid lastname": "El campo last_name no está completo o es incorrecto.",
            "invalid email": "El campo email no está completo o es incorrecto.",
            "invalid phone": "El campo phone no está completo o es incorrecto.",
        },
        later: "¡Lamentamos las molestias!",
    },

    el: {
        close: "Κλείσιμο",
        errorsModal: {
            "invalid api token": {
                message: "Μη έγκυρο token API.",
            },
            "fraud registration": {
                message:
                    "Δεν μπορούμε να επεξεργαστούμε το αίτημά σας αυτή τη στιγμή, καθώς τα δεδομένα που δώσατε υπάρχουν ήδη στο σύστημά μας.",
            },
            "invalid flow hash": {
                title: "Η εγγραφή απέτυχε",
                message:
                    "Το επιλεγμένο flow hash δεν είναι έγκυρο.\n" +
                    "Αυτό το flow δεν προορίζεται για χρήση μέσω API.",
            },
            "invalid ip": {
                message: "Το πεδίο IP είναι υποχρεωτικό.",
            },
            "too many requests": {
                message: "Πάρα πολλά αιτήματα.",
            },
            "no brokers": {
                message:
                    "Η εγγραφή απέτυχε.\n" +
                    "Αν το πρόβλημα παραμένει,\n" +
                    "παρακαλούμε επικοινωνήστε με τον διαχειριστή.",
            },
            "platform error": {
                message: "Σφάλμα διακομιστή. Παρακαλούμε επικοινωνήστε με τον διαχειριστή.",
            },
            "unexpected error": {
                message: "Παρουσιάστηκε απρόσμενο σφάλμα (κατάσταση: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Το πεδίο first_name λείπει ή δεν είναι έγκυρο.",
            "invalid lastname": "Το πεδίο last_name λείπει ή δεν είναι έγκυρο.",
            "invalid email": "Το πεδίο email λείπει ή δεν είναι έγκυρο.",
            "invalid phone": "Το πεδίο phone λείπει ή δεν είναι έγκυρο.",
        },
        later: "Ζητούμε συγγνώμη για την ταλαιπωρία!",
    },

    fi: {
        close: "Sulje",
        errorsModal: {
            "invalid api token": {
                message: "Virheellinen API-tunnus.",
            },
            "fraud registration": {
                message:
                    "Emme voi käsitellä pyyntöäsi tällä hetkellä, koska annetut tiedot ovat jo järjestelmässämme.",
            },
            "invalid flow hash": {
                title: "Rekisteröinti epäonnistui",
                message:
                    "Valittu flow hash on virheellinen.\n" +
                    "Tätä flow’ta ei ole tarkoitettu käytettäväksi API:n kautta.",
            },
            "invalid ip": {
                message: "IP-kenttä on pakollinen.",
            },
            "too many requests": {
                message: "Liian monta pyyntöä.",
            },
            "no brokers": {
                message:
                    "Rekisteröinti epäonnistui.\n" +
                    "Jos virhe jatkuu,\n" +
                    "ota yhteyttä ylläpitäjään.",
            },
            "platform error": {
                message: "Palvelinvirhe. Ota yhteyttä ylläpitäjään.",
            },
            "unexpected error": {
                message: "Tapahtui odottamaton virhe (tila: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "first_name-kenttä puuttuu tai on virheellinen.",
            "invalid lastname": "last_name-kenttä puuttuu tai on virheellinen.",
            "invalid email": "email-kenttä puuttuu tai on virheellinen.",
            "invalid phone": "phone-kenttä puuttuu tai on virheellinen.",
        },
        later: "Pahoittelemme häiriötä!",
    },

    lt: {
        close: "Uždaryti",
        errorsModal: {
            "invalid api token": {
                message: "Neteisingas API žetonas.",
            },
            "fraud registration": {
                message:
                    "Šiuo metu negalime apdoroti jūsų užklausos, nes pateikti duomenys jau yra mūsų sistemoje.",
            },
            "invalid flow hash": {
                title: "Registracija nepavyko",
                message:
                    "Pasirinktas flow hash yra neteisingas.\n" +
                    "Šis flow neskirtas naudoti per API.",
            },
            "invalid ip": {
                message: "IP laukas yra privalomas.",
            },
            "too many requests": {
                message: "Per daug užklausų.",
            },
            "no brokers": {
                message:
                    "Registracija nepavyko.\n" +
                    "Jei klaida kartojasi,\n" +
                    "susisiekite su administratoriumi.",
            },
            "platform error": {
                message: "Serverio klaida. Susisiekite su administratoriumi.",
            },
            "unexpected error": {
                message: "Įvyko netikėta klaida (būsena: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "first_name laukas neužpildytas arba neteisingas.",
            "invalid lastname": "last_name laukas neužpildytas arba neteisingas.",
            "invalid email": "email laukas neužpildytas arba neteisingas.",
            "invalid phone": "phone laukas neužpildytas arba neteisingas.",
        },
        later: "Atsiprašome už nepatogumus!",
    },

    hr: {
        close: "Zatvori",
        errorsModal: {
            "invalid api token": {
                message: "Nevažeći API token.",
            },
            "fraud registration": {
                message:
                    "Trenutno ne možemo obraditi vaš zahtjev jer su navedeni podaci već registrirani u našem sustavu.",
            },
            "invalid flow hash": {
                title: "Registracija nije uspjela",
                message:
                    "Odabrani flow hash nije važeći.\n" +
                    "Ovaj flow nije namijenjen za korištenje putem API-ja.",
            },
            "invalid ip": {
                message: "Polje IP je obavezno.",
            },
            "too many requests": {
                message: "Previše zahtjeva.",
            },
            "no brokers": {
                message:
                    "Registracija nije uspjela.\n" +
                    "Ako se greška ponavlja,\n" +
                    "kontaktirajte administratora.",
            },
            "platform error": {
                message: "Greška poslužitelja. Kontaktirajte administratora.",
            },
            "unexpected error": {
                message: "Došlo je do neočekivane greške (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Polje first_name nije ispunjeno ili nije važeće.",
            "invalid lastname": "Polje last_name nije ispunjeno ili nije važeće.",
            "invalid email": "Polje email nije ispunjeno ili nije važeće.",
            "invalid phone": "Polje phone nije ispunjeno ili nije važeće.",
        },
        later: "Ispričavamo se zbog neugodnosti!",
    },

    sl: {
        close: "Zapri",
        errorsModal: {
            "invalid api token": {
                message: "Neveljaven API žeton.",
            },
            "fraud registration": {
                message:
                    "Trenutno ne moremo obdelati vaše zahteve, ker so vneseni podatki že v našem sistemu.",
            },
            "invalid flow hash": {
                title: "Registracija ni uspela",
                message:
                    "Izbrani flow hash ni veljaven.\n" +
                    "Ta flow ni namenjen uporabi prek API-ja.",
            },
            "invalid ip": {
                message: "Polje IP je obvezno.",
            },
            "too many requests": {
                message: "Preveč zahtevkov.",
            },
            "no brokers": {
                message:
                    "Registracija ni uspela.\n" +
                    "Če se napaka ponavlja,\n" +
                    "se obrnite na skrbnika.",
            },
            "platform error": {
                message: "Napaka strežnika. Obrnite se na skrbnika.",
            },
            "unexpected error": {
                message: "Prišlo je do nepričakovane napake (status: {{status}}).",
            },
        },
        errorsInput: {
            "invalid firstname": "Polje first_name manjka ali ni veljavno.",
            "invalid lastname": "Polje last_name manjka ali ni veljavno.",
            "invalid email": "Polje email manjka ali ni veljavno.",
            "invalid phone": "Polje phone manjka ali ni veljavno.",
        },
        later: "Opravičujemo se za nevšečnosti!",
    },

};

window.normalizeErrorKey = (v) => {
    const s = String(v || "").trim().toLowerCase();

    return s
        .replace(/\s*\(\s*status\b[^)]*\)\s*$/, "")
        .replace(/[.]+$/, "");
};

window.syncLangFromHtmlToCookie = () => {
    const lang = (document.documentElement.lang || "en").split("-")[0].toLowerCase();

    document.cookie = `lang=${encodeURIComponent(lang)}; path=/; max-age=31536000; SameSite=Lax`;
};

window.syncLangFromHtmlToCookie();

window.getLang = () => {
    const m = document.cookie.match(/(?:^|; )lang=([^;]*)/);
    const raw = m ? decodeURIComponent(m[1]) : "en";
    const l = raw.split("-")[0];

    if (typeof translations === "object" && translations && !translations[l]) return "en";
    return l || "en";
};

window.extractStatus = (raw) => {
    const s = String(raw || "");

    const m = s.match(/\(\s*status\s+([^)]+)\)/i);
    return m ? m[1].trim() : "";
};

window.formatWithStatus = (template, status) => {
    const t = String(template || "");

    if (!t.includes("{{status}}")) return t;

    if (!status || status === "undefined") {
        return t
            .replace(/\s*\(.*?\{\{status}}.*?\)\s*/g, "")
            .replace(/\s*\{\{status}}\s*/g, "")
            .trim();
    }

    return t.replaceAll("{{status}}", status);
};

window.translateInputError = (raw, lang) => {
    const l = lang || window.getLang();
    const key = window.normalizeErrorKey(raw);

    return (
        window.ERROR_I18N[l]?.errorsInput?.[key] ||
        window.ERROR_I18N.en?.errorsInput?.[key] ||
        raw
    );
};

window.translateModalError = (raw, lang) => {
    const l = lang || window.getLang();
    const key = window.normalizeErrorKey(raw);

    const tr =
        window.ERROR_I18N[l]?.errorsModal?.[key] ||
        window.ERROR_I18N.en?.errorsModal?.[key] ||
        null;

    if (!tr) return null;

    const status = window.extractStatus(raw);

    return {
        ...tr,
        title: window.formatWithStatus(tr.title, status),
        message: window.formatWithStatus(tr.message, status),
    };
};

window.translateClose = (lang) => {
    const l = lang || window.getLang();
    return (
        window.ERROR_I18N[l]?.close ||
        window.ERROR_I18N.en?.close ||
        "Close"
    );
};

