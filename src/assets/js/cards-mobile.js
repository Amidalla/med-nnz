export function InitMobileCards() {
    const cardsList = document.querySelector('.cards__list');
    const cardsItems = document.querySelectorAll('.cards__item');

    if (cardsItems.length <= 3) return;


    let isExpanded = false;
    let currentButton = null;

    addAnimationStyles();


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


    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .cards__item {
                transition: all 0.4s ease-in-out;
                overflow: hidden;
            }
            
            @media (max-width: 600px) {
                .cards__item.hidden {
                    opacity: 0;
                    max-height: 0;
                    margin: 0;
                    padding: 0;
                    transform: translateY(-10px);
                }
                
                .cards__item.visible {
                    opacity: 1;
                    max-height: 1000px;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }


    function hideItem(item) {
        item.classList.remove('visible');
        item.classList.add('hidden');
        setTimeout(() => {
            item.style.display = 'none';
        }, 400);
    }

    function showItem(item) {
        item.style.display = 'grid';
        setTimeout(() => {
            item.classList.remove('hidden');
            item.classList.add('visible');
        }, 10);
    }


    function toggleItemsVisibility() {
        if (isExpanded) {

            cardsItems.forEach((item, index) => {
                if (index >= 3) {
                    showItem(item);
                }
            });
            if (currentButton) {
                currentButton.textContent = 'Скрыть';
            }
        } else {

            cardsItems.forEach((item, index) => {
                if (index >= 3) {
                    hideItem(item);
                }
            });
            if (currentButton) {
                currentButton.textContent = 'Показать еще';
            }
        }
    }


    function manageMobileView() {
        if (window.innerWidth <= 600) {
            // На мобильных
            if (!currentButton) {
                currentButton = createButton();
                cardsList.parentNode.appendChild(currentButton);


                currentButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    isExpanded = !isExpanded;
                    toggleItemsVisibility();


                    setTimeout(() => {
                        if (isExpanded) {
                            currentButton.scrollIntoView({
                                behavior: 'smooth',
                                block: 'nearest'
                            });
                        } else {
                            cardsItems[0].scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }
                    }, isExpanded ? 100 : 400);
                });
            }


            toggleItemsVisibility();

        } else {

            if (currentButton) {
                currentButton.remove();
                currentButton = null;
            }


            isExpanded = false;
            cardsItems.forEach(item => {
                item.style.display = 'grid';
                item.classList.remove('hidden', 'visible');
            });
        }
    }


    function initialize() {

        isExpanded = false;


        cardsItems.forEach((item, index) => {
            if (index < 3) {
                item.classList.add('visible');
                item.style.display = 'grid';
            } else {
                item.style.display = 'none';
                item.classList.remove('hidden', 'visible');
            }
        });

        manageMobileView();
    }


    initialize();


    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(manageMobileView, 250);
    });
}