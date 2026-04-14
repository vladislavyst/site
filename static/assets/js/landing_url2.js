window.addEventListener('DOMContentLoaded', function () {
    const address = window.location.origin + window.location.pathname;
    const lUrl = document.getElementsByName('landing_url');

    for(let i of lUrl) {
        i.value = `${address}`;
    }
})
