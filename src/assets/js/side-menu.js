export function InitSideMenu() {
    const menuItems = document.querySelectorAll('.side-menu__item');

    // Инициализация подменю - все закрыты
    menuItems.forEach(item => {
        const sublist = item.querySelector('.side-menu__sublist');
        if (sublist) {
            sublist.style.maxHeight = '0';
            sublist.style.overflow = 'hidden';
            sublist.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

            const arrow = item.querySelector('.side-menu__arrow');
            if (arrow) {
                arrow.style.transform = 'rotate(0deg)';
            }
        }
    });

    // Обработчики событий
    menuItems.forEach(item => {
        const arrow = item.querySelector('.side-menu__arrow');
        const sublist = item.querySelector('.side-menu__sublist');
        const link = item.querySelector('.side-menu__link');

        if (arrow && sublist) {
            // Клик по стрелке - только открытие/закрытие подменю
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSubmenu(item, sublist, arrow);
            });

            // Клик по ссылке - только переход по ссылке
            link.addEventListener('click', function(e) {
                // Обычный переход по ссылке
                // Подменю не открывается
            });
        }
    });

    function toggleSubmenu(item, sublist, arrow) {
        const isOpen = sublist.style.maxHeight !== '0px' && sublist.style.maxHeight !== '0';

        if (isOpen) {
            // Закрываем текущее подменю
            sublist.style.maxHeight = '0';
            arrow.style.transform = 'rotate(0deg)';
            item.classList.remove('opened');
        } else {
            // Закрываем все подменю и открываем текущее
            closeAllSubmenus();
            sublist.style.maxHeight = sublist.scrollHeight + 'px';
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

    // Закрытие подменю при клике вне меню
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.side-menu')) {
            closeAllSubmenus();
        }
    });

    // Обновление высоты подменю при изменении размера окна
    window.addEventListener('resize', function() {
        const openSubmenus = document.querySelectorAll('.side-menu__sublist[style*="max-height"]');
        openSubmenus.forEach(sublist => {
            if (sublist.style.maxHeight !== '0px' && sublist.style.maxHeight !== '0') {
                sublist.style.maxHeight = sublist.scrollHeight + 'px';
            }
        });
    });
}