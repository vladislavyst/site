const FIELD_MAP = {
    "invalid firstname": {
        input: "first_name",
        spanClass: "first_name--info-input",
    },
    "invalid lastname": {
        input: "last_name",
        spanClass: "last_name--info-input",
    },
    "invalid email": {
        input: "email",
        spanClass: "email--info-input",
    },
    "invalid phone": {
        input: "phone_raw",
        spanClass: "phone--info-input",
    },
};

function renderFieldErrors() {
    const params = new URLSearchParams(window.location.search);
    const lang = window.getLang ? window.getLang() : "en";
    for (const [, rawValue] of params.entries()) {
        const key = window.normalizeErrorKey(rawValue);

        if (!window.FIELD_ERROR_KEYS?.has(key)) continue;

        const cfg = FIELD_MAP[key];
        if (!cfg) continue;

        const input = document.querySelector(`[name="${cfg.input}"]`);
        if (!input) continue;

        input.classList.add("input-error");

        let span =
            input
                .closest(".form-group, .pg-input-all, .phone-group")
                ?.querySelector(`.error.${cfg.spanClass}`) ||
            input.parentElement?.querySelector(`.error.${cfg.spanClass}`);

        if (!span) {
            span = document.createElement("span");
            span.className = `error ${cfg.spanClass}`;
            span.style.display = "block";
            span.style.marginTop = "6px";

            input.insertAdjacentElement("afterend", span);
        }

        span.textContent = window.translateInputError
            ? window.translateInputError(key, lang)
            : rawValue;
    }
}

document.addEventListener("DOMContentLoaded", renderFieldErrors);
