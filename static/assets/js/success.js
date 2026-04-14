document.addEventListener("DOMContentLoaded", function () {

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

    const config = window.SUCCESS_PAGE_CONFIG || {};
    const lang = getCookie("lang") || config.lang || "en";
    const homeUrl = config.homeUrl || "/";

    document.documentElement.lang = lang;

    const titleEl = document.getElementById("cardTitle");
    const loaderText = document.getElementById("loaderText");
    const errorText = document.getElementById("errorText");
    const homeBtn = document.getElementById("homeBtn");

    const app = document.getElementById("app");
    applyStaticTranslations();

    let STATUS_API = null;
    const POLL_INTERVAL = 4000;
    const MAX_WAIT_TIME = 60000;
    const startTime = Date.now();

    homeBtn.addEventListener("click", function () {
        window.location.href = homeUrl;
    });

    function applyStaticTranslations() {
        document.title = t("card.title", lang);

        document.getElementById("stepRegistration").textContent = t("steps.registration", lang);
        document.getElementById("stepProcessing").textContent = t("steps.processing", lang);
        document.getElementById("stepRedirect").textContent = t("steps.redirect", lang);

        homeBtn.textContent = t("error.btn", lang);
        titleEl.textContent = t("card.title", lang);
        document.getElementById("cardLoading1").textContent = t("card.loading1", lang);
        document.getElementById("cardLoading2").textContent = t("card.loading2", lang);
        document.getElementById("cardSuccess").textContent = t("card.success", lang);

        document.getElementById("noticeTitle").textContent = t("notice.title", lang);
        document.getElementById("noticeText").textContent = t("notice.text", lang);
    }
    
    function setState(state) {
        app.classList.remove("is-loading", "is-success", "is-error");
        app.classList.add(`is-${state}`);
    }

    function showProcessing() {
        if (!app.classList.contains("is-loading")) {
            loaderText.textContent = `${t("steps.processing", lang)}...`;
            setState('loading');
        }
    }

    function successFlow(redirectUrl) {
        setState('success')

        titleEl.textContent = t("card.successTitle", lang);

        if (window.firePendingOrPixelEvent) {
            window.firePendingOrPixelEvent("Lead");
        } else {
            window.firePixelEvent("Lead");
        }

        setTimeout(() => {
            if (redirectUrl) window.location.href = redirectUrl;
        }, 5000);
    }

    function rejectFlow() {
         setState("error");
    
         if (window.clearPendingPixelEvent) {
            window.clearPendingPixelEvent();
        }

        if (errorText) errorText.textContent = t("error.text", lang);
        titleEl.textContent = t("error.title", lang);
    }

    async function checkStatus() {
        try {
            const url = new URL(STATUS_API, window.location.origin);
            url.searchParams.set("t", Date.now());

            const res = await fetch(url.toString(), {
                credentials: "same-origin",
                cache: "no-store",
            });

            if (!res.ok) {
                console.error("HTTP error", res.status);
                return { done: false, error: true };
            }

            const data = await res.json();
            const status = (data.status || "").toLowerCase();
            const redirectUrl = data.redirect_url || null;

            showProcessing();

            if (status === "sent") {
                successFlow(redirectUrl);
                return { done: true };
            }

            if (status === "rejected" || status === "fraud" || status === "frod") {
                rejectFlow();
                return { done: true };
            }

            if (Date.now() - startTime > MAX_WAIT_TIME) {
                console.warn("Max wait time reached, forcing reject");
                rejectFlow();
                return { done: true };
            }

            return { done: false, error: false };
        } catch (e) {
            console.error("Network/JSON error:", e);
            return { done: false, error: true };
        }
    }

    let inFlight = false;
    let stopped = false;

    window.startPolling = function (endpoint) {
        if (!endpoint) {
            console.error("Polling endpoint not provided");
            return;
        }

        STATUS_API = endpoint;
        const poll = () => {
            if (stopped || inFlight) return;

            inFlight = true;
            const start = Date.now();

            checkStatus()
                .then(({ done, error }) => {
                    inFlight = false;

                    if (done) {
                        stopped = true;
                        return;
                    }

                    const elapsed = Date.now() - start;
                    const baseDelay = error ? 1000 : POLL_INTERVAL;
                    const delay = Math.max(1000, baseDelay - elapsed);

                    setTimeout(poll, delay);
                })
                .catch(() => {
                    inFlight = false;
                    setTimeout(poll, 1000);
                });
        };

        poll();
        showProcessing();
    }
});
