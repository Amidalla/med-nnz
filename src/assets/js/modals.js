export function InitModals() {
    const modal = document.querySelector('.modal-catalog');
    const btn = document.querySelector('.catalog-btn');

    if (!modal || !btn) return;

    let isOpen = false;
    let scrollbarWidth = 0;

    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    function toggleModal() {
        if (isOpen) {
            closeModal();
        } else {
            openModal();
        }
    }

    function openModal() {
        scrollbarWidth = getScrollbarWidth();

        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = scrollbarWidth + 'px';

        modal.classList.add('active');
        btn.classList.add('active');
        isOpen = true;
    }

    function closeModal() {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';

        modal.classList.remove('active');
        btn.classList.remove('active');
        isOpen = false;

        const activeItems = modal.querySelectorAll('.modal-catalog__item.active');
        activeItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleModal();
    });

    modal.addEventListener('click', (e) => {
        const link = e.target.closest('.modal-catalog__link');
        const subLink = e.target.closest('.modal-catalog__sub-link');

        if (link && !subLink) {
            e.preventDefault();
            const item = link.parentElement;
            item.classList.toggle('active');
        }
    });

    document.addEventListener('click', (e) => {
        if (isOpen && !modal.contains(e.target) && !btn.contains(e.target)) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (isOpen && e.key === 'Escape') {
            closeModal();
        }
    });

    modal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const burgerBtn = document.querySelector('.burger'); // Исправил на .burger
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.mobile-menu__close');

    // Проверяем наличие всех необходимых элементов
    if (!burgerBtn || !mobileMenu || !overlay) {
        console.log('Не найдены необходимые элементы для мобильного меню');
        return;
    }

    let isMobileMenuOpen = false;

    function closeAllDropdowns() {
        const allActiveItems = document.querySelectorAll('.dropdown-box.active, .dropdown-sub-box.active');
        allActiveItems.forEach(item => {
            item.classList.remove('active');
        });
    }

    function handleDropdownClick(e) {
        if (e.target.classList.contains('dropdown-arrow')) {
            e.preventDefault();
            e.stopPropagation();

            const dropdownItem = e.target.closest('.dropdown-box, .dropdown-sub-box');

            if (dropdownItem) {
                dropdownItem.classList.toggle('active');
            }
        }
    }

    function openMobileMenu() {
        document.body.style.overflow = 'hidden';
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        isMobileMenuOpen = true;
    }

    function closeMobileMenu() {
        document.body.style.overflow = '';
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        closeAllDropdowns();
        isMobileMenuOpen = false;
    }

    // Обработчики для мобильного меню
    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMobileMenu();
    });

    closeBtn.addEventListener('click', closeMobileMenu);

    overlay.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', (e) => {
        if (isMobileMenuOpen && e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    mobileMenu.addEventListener('click', handleDropdownClick);
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Изначально скрываем все подменю
    closeAllDropdowns();
});