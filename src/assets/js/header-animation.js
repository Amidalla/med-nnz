export function InitHeaderAnimation() {
    function isElementInViewport(el) {
        if (!el) return false;

        var rect = el.getBoundingClientRect();

        return (
            rect.top >= -500 &&
            rect.left >= -500 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function checkForVisibility() {
        var header_hidden_left = document.querySelectorAll(".header_hidden_left");

        header_hidden_left.forEach(function(header_hidden_left) {
            if (isElementInViewport(header_hidden_left)) {
                header_hidden_left.classList.add("header_hidden_leftVisible");
            } else {
                // header_hidden_left.classList.remove("header_hidden_leftVisible");
            }
        });
    }


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            checkForVisibility();
            window.addEventListener("load", checkForVisibility);
            window.addEventListener("scroll", checkForVisibility);
            window.addEventListener("resize", checkForVisibility);
        });
    } else {
        checkForVisibility();
        window.addEventListener("load", checkForVisibility);
        window.addEventListener("scroll", checkForVisibility);
        window.addEventListener("resize", checkForVisibility);
    }
}