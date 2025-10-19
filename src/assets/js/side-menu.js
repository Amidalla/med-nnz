export function InitSideMenu() {
    const menuItems = document.querySelectorAll('.side-menu__item');


    menuItems.forEach(item => {
        const sublist = item.querySelector('.side-menu__sublist');
        if (sublist) {
            sublist.style.maxHeight = '0';
            sublist.style.overflow = 'hidden';
            sublist.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    });


    menuItems.forEach(item => {
        const arrow = item.querySelector('.side-menu__arrow');
        const sublist = item.querySelector('.side-menu__sublist');
        const link = item.querySelector('.side-menu__link');

        if (arrow && sublist) {
            arrow.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSubmenu(sublist, arrow);
            });

            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSubmenu(sublist, arrow);
            });
        }
    });

    function toggleSubmenu(sublist, arrow) {
        const isOpen = sublist.style.maxHeight !== '0px';


        closeAllSubmenus();

        if (!isOpen) {

            const scrollHeight = sublist.scrollHeight;
            sublist.style.maxHeight = scrollHeight + 'px';
            arrow.style.transform = 'rotate(180deg)';
        }
    }

    function closeAllSubmenus() {
        const allSubmenus = document.querySelectorAll('.side-menu__sublist');
        const allArrows = document.querySelectorAll('.side-menu__arrow');

        allSubmenus.forEach(sublist => {
            sublist.style.maxHeight = '0';
        });

        allArrows.forEach(arrow => {
            arrow.style.transform = 'rotate(0deg)';
        });
    }

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.side-menu')) {
            closeAllSubmenus();
        }
    });


    window.addEventListener('resize', function() {
        const openSubmenus = document.querySelectorAll('.side-menu__sublist[style*="max-height"]');
        openSubmenus.forEach(sublist => {
            if (sublist.style.maxHeight !== '0px') {
                const scrollHeight = sublist.scrollHeight;
                sublist.style.maxHeight = scrollHeight + 'px';
            }
        });
    });
}