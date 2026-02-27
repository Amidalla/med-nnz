export function InitMobileCards() {
    const isHomePage = document.body.classList.contains('page-main');

    if (!isHomePage) return;

    const cardsList = document.querySelector('.cards__list');
    const cardsItems = document.querySelectorAll('.cards__item');

    if (cardsItems.length <= 3) return;

    let isExpanded = false;
    let currentButton = null;

    addAnimationStyles();

    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cards__list {
                position: relative;
            }
            
            .cards__item {
                transition: opacity 0.3s ease, transform 0.3s ease !important;
            }
            
            .cards__item.hidden-mobile,
            .cards__item.hidden-desktop,
            .cards__item.hidden-tablet,
            .cards__item.hidden-small-tablet {
                position: absolute !important;
                opacity: 0 !important;
                transform: translateY(-10px) !important;
                pointer-events: none;
                max-height: 0;
                margin: 0;
                padding: 0;
                border: 0;
                width: 0;
                height: 0;
                overflow: hidden;
                z-index: -1;
            }
            
            @media (max-width: 600px) {
                .cards__item.hidden-mobile {
                    display: block !important;
                }
            }
            
            @media (min-width: 601px) and (max-width: 1000px) {
                .cards__item.hidden-small-tablet {
                    display: block !important;
                }
            }
            
            @media (min-width: 1001px) and (max-width: 1300px) {
                .cards__item.hidden-tablet {
                    display: block !important;
                }
            }
            
            @media (min-width: 1301px) {
                .cards__item.hidden-desktop {
                    display: block !important;
                }
            }
        `;
        document.head.appendChild(style);
    }

    function createButton() {
        const button = document.createElement('button');
        button.className = 'show-more-btn';
        button.textContent = 'Показать еще';
        button.type = 'button';

        button.style.cssText = `
            display: block;
            margin: 0 auto;
            color: #E11A1A;
            margin-top: 30px;
            border: none;
            background: none;
            font-size: 16px;
            font-weight: 400;
            cursor: pointer;
            padding: 5px 10px;
            border-bottom: 1px dotted #E11A1A;
            transition: color 0.3s;
        `;

        return button;
    }

    function getLimit() {
        const width = window.innerWidth;
        if (width <= 600) return 3;
        if (width <= 1000) return 2;
        if (width <= 1300) return 3;
        return 4;
    }

    function getHiddenClass() {
        const width = window.innerWidth;
        if (width <= 600) return 'hidden-mobile';
        if (width <= 1000) return 'hidden-small-tablet';
        if (width <= 1300) return 'hidden-tablet';
        return 'hidden-desktop';
    }

    function toggleItemsVisibility() {
        const limit = getLimit();
        const hiddenClass = getHiddenClass();

        if (isExpanded) {
            cardsItems.forEach(item => {
                item.classList.remove('hidden-mobile', 'hidden-desktop', 'hidden-tablet', 'hidden-small-tablet');
            });
            currentButton.textContent = 'Скрыть';
        } else {
            cardsItems.forEach((item, index) => {
                if (index >= limit) {
                    item.classList.add(hiddenClass);
                } else {
                    item.classList.remove('hidden-mobile', 'hidden-desktop', 'hidden-tablet', 'hidden-small-tablet');
                }
            });
            currentButton.textContent = 'Показать еще';

            setTimeout(() => {
                cardsItems[0].scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }

        setTimeout(() => {
            if (window.checkAnimations) {
                window.checkAnimations();
            }
        }, 350);
    }

    function manageView() {
        const limit = getLimit();
        const hiddenClass = getHiddenClass();

        if (window.innerWidth <= 600 || window.innerWidth >= 601) {
            if (!currentButton) {
                currentButton = createButton();
                cardsList.parentNode.appendChild(currentButton);

                currentButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    isExpanded = !isExpanded;
                    toggleItemsVisibility();
                });
            }

            cardsItems.forEach((item, index) => {
                if (index >= limit) {
                    item.classList.add(hiddenClass);
                } else {
                    item.classList.remove('hidden-mobile', 'hidden-desktop', 'hidden-tablet', 'hidden-small-tablet');
                }
            });

        } else {
            if (currentButton) {
                currentButton.remove();
                currentButton = null;
            }

            isExpanded = false;
            cardsItems.forEach(item => {
                item.classList.remove('hidden-mobile', 'hidden-desktop', 'hidden-tablet', 'hidden-small-tablet');
            });

            if (window.checkAnimations) {
                window.checkAnimations();
            }
        }
    }

    function initialize() {
        const limit = getLimit();
        const hiddenClass = getHiddenClass();

        cardsItems.forEach((item, index) => {
            if (index >= limit) {
                item.classList.add(hiddenClass);
            }
        });

        manageView();

        setTimeout(() => {
            if (window.checkAnimations) {
                window.checkAnimations();
            }
        }, 300);
    }

    initialize();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(manageView, 250);
    });
}