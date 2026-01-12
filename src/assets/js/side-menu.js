export function InitSideMenu() {
    const menuItems = document.querySelectorAll('.side-menu__item');

    // Инициализация подменю
    menuItems.forEach(item => {
        const sublist = item.querySelector('.side-menu__sublist');
        if (sublist) {
            // Стили для всех подменю
            sublist.style.overflow = 'hidden';
            sublist.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            // Проверяем классы с бэкенда
            const hasActive = item.classList.contains('active');
            const hasOpened = item.classList.contains('opened');

            if (hasActive && hasOpened) {
                // Если оба класса есть - открываем подменю
                sublist.style.maxHeight = 'none'; // Автоматическая высота
                const arrow = item.querySelector('.side-menu__arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(180deg)';
                }
            } else {
                // Иначе закрываем
                sublist.style.maxHeight = '0';
                const arrow = item.querySelector('.side-menu__arrow');
                if (arrow) {
                    arrow.style.transform = 'rotate(0deg)';
                }
            }
        }
    });

    // Обработчики событий
    menuItems.forEach(item => {
        const arrow = item.querySelector('.side-menu__arrow');
        const sublist = item.querySelector('.side-menu__sublist');
        const link = item.querySelector('.side-menu__link');

        if (arrow && sublist) {
            // Клик по стрелке
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSubmenu(item, sublist, arrow);
            });

            // Клик по ссылке
            link.addEventListener('click', function(e) {
                // Обычный переход по ссылке
            });
        }
    });

    function toggleSubmenu(item, sublist, arrow) {
        const isOpen = sublist.style.maxHeight !== '0px' &&
            sublist.style.maxHeight !== '0' &&
            sublist.style.maxHeight !== '';

        if (isOpen) {
            // Закрываем текущее подменю
            sublist.style.maxHeight = '0';
            arrow.style.transform = 'rotate(0deg)';
            item.classList.remove('opened');
        } else {
            // Закрываем все подменю и открываем текущее
            closeAllSubmenus();
            sublist.style.maxHeight = 'none'; // Автоматическая высота
            arrow.style.transform = 'rotate(180deg)';
            item.classList.add('opened');
        }
    }

    function closeAllSubmenus() {
        const allSubmenus = document.querySelectorAll('.side-menu__sublist');
        const allArrows = document.querySelectorAll('.side-menu__arrow');
        const allOpenedItems = document.querySelectorAll('.side-menu__item.opened');

        allSubmenus.forEach(sublist => {
            sublist.style.maxHeight = '0';
        });

        allArrows.forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });

        allOpenedItems.forEach(item => {
            item.classList.remove('opened');
        });
    }

    // При ресайзе пересчитываем открытые подменю
    window.addEventListener('resize', function() {
        const openSubmenus = document.querySelectorAll('.side-menu__sublist');
        openSubmenus.forEach(sublist => {
            // Если подменю открыто (max-height не 0 и не пусто)
            if (sublist.style.maxHeight &&
                sublist.style.maxHeight !== '0px' &&
                sublist.style.maxHeight !== '0') {
                // Сбрасываем и снова ставим auto для перерасчета
                const currentMaxHeight = sublist.style.maxHeight;
                sublist.style.maxHeight = 'none';
                // Принудительный рефлоу
                sublist.offsetHeight;
                // Возвращаем auto
                sublist.style.maxHeight = currentMaxHeight;
            }
        });
    });
}