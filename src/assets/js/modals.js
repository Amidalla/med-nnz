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

        // Закрываем все открытые подменю
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