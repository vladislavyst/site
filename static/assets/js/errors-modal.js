const errorQueryParams = new URLSearchParams(window.location.search);
const forms = document.querySelectorAll("form");

function init() {
    forms.forEach((form) => form.addEventListener("submit", saveInputs));

    const navType = getNavigationType();
    const hasErrorsInUrl = hasErrorsInCurrentUrl();

    if (hasErrorsInUrl) {
        saveErrorsFromUrlToSession();
        loadInputs();
        renderModal(parseErrorsFromUrl());
        return;
    }

    if (navType === "reload" || navType === "back_forward") {
        loadInputs();
        renderModal(loadErrorsFromSession());
        return;
    }

    clearStoredErrors();
    loadInputs();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
} else {
    init();
}

function getNavigationType() {
    try {
        const navEntries = performance.getEntriesByType("navigation");
        if (navEntries && navEntries.length > 0 && navEntries[0].type) return navEntries[0].type;
    } catch (_) {}

    if (performance && performance.navigation) {
        switch (performance.navigation.type) {
            case 1:
                return "reload";
            case 2:
                return "back_forward";
            default:
                return "navigate";
        }
    }

    return "unknown";
}


function hasErrorsInCurrentUrl() {
    if (errorQueryParams.get("result") === "error") return true;
    if (errorQueryParams.has("error") || errorQueryParams.has("message")) return true;

    for (const key of errorQueryParams.keys()) {
        if (key.startsWith("error") || key.startsWith("message")) return true;
    }
    return false;
}

function saveInputs(e) {
    for (const input of e.target.elements) {
        switch (input.name) {
            case "first_name":
            case "last_name":
            case "email":
            case "phone_raw":
                sessionStorage.setItem(input.name, input.value);
                break;
            default:
                break;
        }
    }
}

function loadInputs() {
    for (const input of ["first_name", "last_name", "email"]) {
        document.querySelectorAll(`input[name="${input}"]`).forEach((field) => {
            const v = sessionStorage.getItem(input);
            if (v != null) field.value = v;
            field.parentElement?.classList.add("focus");
        });
    }
}

function clearStoredErrors() {
    for (const [key] of Object.entries(sessionStorage)) {
        if (key.startsWith("error") || key.startsWith("message")) {
            sessionStorage.removeItem(key);
        }
    }
    sessionStorage.removeItem("__has_errors__");
}

function saveErrorsFromUrlToSession() {
    clearStoredErrors();

    for (const [key, value] of errorQueryParams.entries()) {
        if (key.startsWith("error") || key.startsWith("message")) {
            sessionStorage.setItem(key, value);
        }
    }

    sessionStorage.setItem("__has_errors__", "1");
}

function loadErrorsFromSession() {
    if (sessionStorage.getItem("__has_errors__") !== "1") return {};

    const storage = {};
    for (const [key, value] of Object.entries(sessionStorage)) {
        if (key.startsWith("error") || key.startsWith("message")) {
            storage[key] = value;
        }
    }
    return expand(storage);
}

function parseErrorsFromUrl() {
    const query = {};
    for (const [key, value] of errorQueryParams.entries()) {
        if (key.startsWith("error") || key.startsWith("message")) {
            query[key] = value;
        }
    }
    return expand(query);
}

function expand(obj) {
    return Object.entries(obj).reduce((a, [propString, value]) => {
        const propArr = propString.replace(/\[/g, ".").replace(/]/g, "").split(".");
        if (propArr.length > 1) {
            const innerProp = propArr.pop();
            const innerObj = propArr.reduce((acc, prop) => {
                if (acc[prop] == null) acc[prop] = {};
                return acc[prop];
            }, a);
            innerObj[innerProp] = value;
        } else {
            a[propString] = value;
        }
        return a;
    }, {});
}

function normalizeKeyFallback(v) {
    // важно: приводим flow_hash -> flow hash
    return String(v || "")
        .trim()
        .toLowerCase()
        .replace(/[_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}

function translateErrorKey(rawKey, lang) {
    const normalize = window.normalizeErrorKey || normalizeKeyFallback;
    const key = normalize(rawKey);

    const fieldKeys = window.FIELD_ERROR_KEYS instanceof Set ? window.FIELD_ERROR_KEYS : new Set();

    if (fieldKeys.has(key)) {
        return { type: "field", raw: rawKey, key };
    }

    const modal = window.translateModalError ? window.translateModalError(rawKey, lang) : null;
    if (modal) {
        return { type: "modal", title: modal.title, text: modal.message, raw: rawKey, key };
    }

    return { type: "modal_fallback", title: null, text: rawKey, raw: rawKey, key };
}


function renderModal(errors) {
    if (!errors || Object.keys(errors).length === 0) return;
    if (!window.ERROR_I18N) return;

    const lang = window.getLang ? window.getLang() : "en";
    const listObj = errors.error;
    const list =
        listObj && typeof listObj === "object"
            ? Object.keys(listObj)
                .sort((a, b) => Number(a) - Number(b))
                .map((k) => listObj[k])
            : [];

    if (!list.length) return;

    const globalErrors = [];

    for (const raw of list) {
        const tr = translateErrorKey(raw, lang);
        if (tr.type === "modal" || tr.type === "modal_fallback") {
            globalErrors.push(tr);
        }
    }

    if (!globalErrors.length) return;

    if (document.querySelector(".errors_modal")) return;

    const overlay = document.createElement("div");
    overlay.className = "errors_overlay";

    const modalEl = document.createElement("div");
    modalEl.className = "errors_modal";

    const first = globalErrors[0];


    if (first.text) {
        modalEl.appendChild(Object.assign(document.createElement("p"), { innerText: first.text }));
    }

    for (let i = 1; i < globalErrors.length; i++) {
        modalEl.appendChild(
            Object.assign(document.createElement("p"), {
                innerText: globalErrors[i].text || globalErrors[i].raw,
            })
        );
    }

    const later = window.ERROR_I18N?.[lang]?.later || window.ERROR_I18N?.en?.later || "";
    if (later) {
        const laterEl = document.createElement("p");
        laterEl.textContent = later;
        laterEl.style.marginTop = "16px";
        modalEl.appendChild(laterEl);
    }

    const btn = Object.assign(document.createElement("button"), {
        innerText: window.translateClose ? window.translateClose(lang) : "Close",
    });
    modalEl.appendChild(btn);

    document.body.appendChild(overlay);
    document.body.appendChild(modalEl);

    btn.addEventListener("click", () => {
        modalEl.classList.add("errors_modal_hidden");
        overlay.classList.add("errors_overlay_hidden");
    });
}
