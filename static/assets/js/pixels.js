const PIXEL_ENDPOINTS = {
    fbp: "https://connect.facebook.net/en_US/fbevents.js",
    gp: "https://www.googletagmanager.com/gtag/js",
    bgp: "https://api.imotech.video/ad/events.js",
};

const STORAGE_KEY = "PENDING_PIXEL_EVENT";
let ACTIVE_PIXEL_KEY = null;
let ACTIVE_PIXEL_ID = null;
let PIXEL_READY = false;
let EVENT_SENT = false;
let ACTIVE_RETRY_CONTROLLER = null;

function getCookie(name) {
    const m = document.cookie.match(
        new RegExp(
            "(^|; )" +
            name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") +
            "=([^;]*)"
        )
    );
    return m ? decodeURIComponent(m[2]) : null;
}

function getPixelIdFromCookie() {
    return getCookie('pixel_id') || '1457471099415350';
}

function savePendingEvent(eventName) {
    const payload = {
        key: ACTIVE_PIXEL_KEY,
        id: ACTIVE_PIXEL_ID,
        event: eventName,
        ts: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function restorePendingEvent() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw);
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

window.clearPendingPixelEvent = function () {
    localStorage.removeItem(STORAGE_KEY);
};

window.initPixel = function (key) {
    const pixelId = getPixelIdFromCookie();
    if (!pixelId || !key) return;

    ACTIVE_PIXEL_KEY = key;
    ACTIVE_PIXEL_ID = pixelId;

    switch (ACTIVE_PIXEL_KEY) {
        case "fbp": {
            if (window.fbq) {
                PIXEL_READY = true;
                break;
            }

            !(function (f, b, e, v, n, t, s) {
                if (f.fbq) return;

                n = f.fbq = function () {
                    if (n.callMethod) {
                        n.callMethod.apply(n, arguments);
                    } else {
                        n.queue.push(arguments);
                    }
                };

                if (!f._fbq) f._fbq = n;
                n.push = n;
                n.loaded = true;
                n.version = "2.0";
                n.queue = [];

                t = b.createElement(e);
                t.async = true;
                t.onload = () => (PIXEL_READY = true);
                t.src = v;

                s = b.getElementsByTagName(e)[0];
                if (s && s.parentNode) {
                    s.parentNode.insertBefore(t, s);
                } else if (b.head) {
                    b.head.appendChild(t);
                } else {
                    b.documentElement.appendChild(t);
                }
            })(window, document, "script", PIXEL_ENDPOINTS.fbp);

            if (window.fbq) window.fbq("init", ACTIVE_PIXEL_ID);
            break;
        }

        case "gp": {
            if (window.gtag) {
                PIXEL_READY = true;
                break;
            }

            const g = document.createElement("script");
            g.async = true;
            g.onload = () => (PIXEL_READY = true);
            g.src = `${PIXEL_ENDPOINTS.gp}?id=${ACTIVE_PIXEL_ID}`;
            document.head.appendChild(g);

            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };

            window.gtag("js", new Date());
            window.gtag("config", ACTIVE_PIXEL_ID);
            break;
        }

        case "bgp": {
            if (window.bge) {
                PIXEL_READY = true;
                break;
            }

            const b = document.createElement("script");
            b.async = true;
            b.onload = () => (PIXEL_READY = true);
            b.src = `${PIXEL_ENDPOINTS.bgp}?pixel_id=${ACTIVE_PIXEL_ID}`;
            document.head.appendChild(b);

            window.bgdataLayer = window.bgdataLayer || [];
            window.bge = function () {
                window.bgdataLayer.push(arguments);
            };

            window.bge("init", ACTIVE_PIXEL_ID);
            break;
        }

        default:
            return;
    }
};

window.firePixelEvent = function (eventName = "Lead", { save = true } = {}) {
    if (save) savePendingEvent(eventName);

    if (ACTIVE_RETRY_CONTROLLER) {
        ACTIVE_RETRY_CONTROLLER.cancel();
        ACTIVE_RETRY_CONTROLLER = null;
    }

    const MAX_ATTEMPTS = 75;
    const INTERVAL_MS = 200;
    const MAX_WAIT_MS = 15000;
    const startedAt = Date.now();

    let attempts = 0;
    let timerId = null;
    let cancelled = false;

    const cancel = () => {
        cancelled = true;
        if (timerId) clearTimeout(timerId);
        timerId = null;
    };

    ACTIVE_RETRY_CONTROLLER = { cancel };

    const schedule = () => {
        if (cancelled) return;
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(trySend, INTERVAL_MS);
    };

    const trySend = () => {
        if (cancelled || EVENT_SENT) return cancel();

        attempts += 1;

        if (attempts > MAX_ATTEMPTS || Date.now() - startedAt > MAX_WAIT_MS) {
            console.warn("Pixel event not fired: retry limit/timeout reached", {
                key: ACTIVE_PIXEL_KEY,
                event: eventName,
            });
            return cancel();
        }

        if (!ACTIVE_PIXEL_KEY || !ACTIVE_PIXEL_ID) {
            return schedule();
        }

        if (!PIXEL_READY) {
            return schedule();
        }

        switch (ACTIVE_PIXEL_KEY) {
            case "fbp":
                if (window.fbq) window.fbq("track", eventName);
                break;
            case "gp":
                if (window.gtag) window.gtag("event", eventName, { send_to: ACTIVE_PIXEL_ID });
                break;
            case "bgp":
                if (window.bge) window.bge("event", eventName);
                break;
        }

        EVENT_SENT = true;
        console.log("Pixel event fired:", ACTIVE_PIXEL_KEY, eventName);

        localStorage.removeItem(STORAGE_KEY);

        cancel();
        ACTIVE_RETRY_CONTROLLER = null;
    };

    trySend();
};

window.firePendingOrPixelEvent = function (fallbackEventName = "Lead") {
    const pending = restorePendingEvent();

    if (pending && pending.event) {
        if (pending.key) ACTIVE_PIXEL_KEY = pending.key;
        if (pending.id) ACTIVE_PIXEL_ID = pending.id;
        
        window.firePixelEvent(pending.event, { save: false });
        return;
    }

    window.firePixelEvent(fallbackEventName, { save: true });
};
