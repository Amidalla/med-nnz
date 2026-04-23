export function InitModals() {

    const modal = document.querySelector('.modal-catalog');
    const btn = document.querySelector('.catalog-btn');
    const modalNav = document.querySelector('.modal-catalog__nav');

    if (modal && btn && modalNav) {
        let isOpen = false;
        let isHoveringBtn = false;
        let isHoveringNav = false;
        let animationTimeout = null;
        let isClosing = false;
        let isOpening = false;

        function openModal() {
            if (isOpening || isOpen) return;

            isOpening = true;
            isClosing = false;
            modal.classList.add('active');
            btn.classList.add('active');

            setTimeout(() => {
                isOpen = true;
                isOpening = false;
            }, 300);
        }

        function closeModal() {
            if (isClosing || !isOpen || isOpening) return;

            isClosing = true;
            modal.classList.remove('active');
            btn.classList.remove('active');

            setTimeout(() => {
                isOpen = false;
                isClosing = false;
                isHoveringBtn = false;
                isHoveringNav = false;
            }, 300);
        }

        function scheduleCloseCheck() {
            if (animationTimeout) {
                clearTimeout(animationTimeout);
            }

            animationTimeout = setTimeout(() => {
                if (!isHoveringBtn && !isHoveringNav && isOpen && !isOpening) {
                    closeModal();
                }
            }, 100);
        }

        btn.addEventListener('mouseenter', () => {
            isHoveringBtn = true;
            if (!isOpen && !isOpening) {
                openModal();
            }
        });

        btn.addEventListener('mouseleave', () => {
            isHoveringBtn = false;
            scheduleCloseCheck();
        });

        if (modalNav) {
            modalNav.addEventListener('mouseenter', () => {
                isHoveringNav = true;
            });

            modalNav.addEventListener('mouseleave', () => {
                isHoveringNav = false;
                scheduleCloseCheck();
            });
        }

        btn.addEventListener('click', (e) => {
            if (isOpen) {
                closeModal();
            }
        });

        document.addEventListener('click', (e) => {
            if (isOpen && !isOpening && modal && !modal.contains(e.target) && btn && !btn.contains(e.target)) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (isOpen && !isOpening && e.key === 'Escape') {
                closeModal();
            }
        });

        if (modal) {
            modal.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }


    const mobileMenu = document.querySelector('.mobile-menu');
    const burgerBtn = document.querySelector('.burger');
    const overlay = document.querySelector('.overlay');


    let mobileOverlay = document.querySelector('.mobile-overlay');
    if (!mobileOverlay) {
        mobileOverlay = document.createElement('div');
        mobileOverlay.className = 'mobile-overlay';
        document.body.appendChild(mobileOverlay);
    }

    if (!burgerBtn || !mobileMenu) {
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
            return;
        }


        const catalogBox = e.target.closest('.catalog-box');
        const isMainCatalogLink = catalogBox &&
            e.target.closest('.menu-link-wrapper') &&
            e.target.closest('.mobile-menu__link') &&
            !e.target.closest('.dropdown-sub-box');

        if (isMainCatalogLink) {
            e.preventDefault();
            e.stopPropagation();
            catalogBox.classList.toggle('active');
            return;
        }


    }

    function openMobileMenu() {
        document.body.style.overflow = 'hidden';
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        burgerBtn.classList.add('active');
        isMobileMenuOpen = true;
    }

    function closeMobileMenu() {
        document.body.style.overflow = '';
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        burgerBtn.classList.remove('active');
        closeAllDropdowns();
        isMobileMenuOpen = false;
    }

    // Функция для принудительного закрытия мобильного меню при открытии модалок
    function forceCloseMobileMenu() {
        if (isMobileMenuOpen) {
            document.body.style.overflow = '';
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            burgerBtn.classList.remove('active');
            closeAllDropdowns();
            isMobileMenuOpen = false;
        }
    }

    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isMobileMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileOverlay.addEventListener('click', closeMobileMenu);

    document.addEventListener('keydown', (e) => {
        if (isMobileMenuOpen && e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    mobileMenu.addEventListener('click', handleDropdownClick);
    mobileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    closeAllDropdowns();


    const callModal = document.querySelector('.call-modal');
    const callBtns = document.querySelectorAll('.call-btn');

    if (callModal && callBtns.length > 0 && overlay) {
        let isCallModalOpen = false;

        function openCallModal() {
            forceCloseMobileMenu(); // Закрываем мобильное меню

            document.body.style.overflow = 'hidden';
            callModal.classList.add('opened');
            overlay.classList.add('active');
            isCallModalOpen = true;
        }

        function closeCallModal() {
            document.body.style.overflow = '';
            callModal.classList.remove('opened');
            overlay.classList.remove('active');
            isCallModalOpen = false;
        }

        callBtns.forEach(callBtn => {
            callBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openCallModal();
            });
        });

        const callModalClose = callModal.querySelector('.call-modal__close');
        if (callModalClose) {
            callModalClose.addEventListener('click', closeCallModal);
        }

        overlay.addEventListener('click', (e) => {
            if (isCallModalOpen) {
                closeCallModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (isCallModalOpen && e.key === 'Escape') {
                closeCallModal();
            }
        });

        callModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    const offerModal = document.querySelector('.offer-modal');
    const offerBtns = document.querySelectorAll('.offer-btn');

    if (offerModal && offerBtns.length > 0 && overlay) {
        let isOfferModalOpen = false;

        function openOfferModal() {
            forceCloseMobileMenu(); // Закрываем мобильное меню

            document.body.style.overflow = 'hidden';
            offerModal.classList.add('opened');
            overlay.classList.add('active');
            isOfferModalOpen = true;
        }

        function closeOfferModal() {
            document.body.style.overflow = '';
            offerModal.classList.remove('opened');
            overlay.classList.remove('active');
            isOfferModalOpen = false;
        }

        offerBtns.forEach(offerBtn => {
            offerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openOfferModal();
            });
        });

        const requestOfferBtns = document.querySelectorAll('.request-offer');
        if (requestOfferBtns.length > 0) {
            requestOfferBtns.forEach(requestOfferBtn => {
                requestOfferBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openOfferModal();
                });
            });
        }

        const offerModalClose = offerModal.querySelector('.offer-modal__close');
        if (offerModalClose) {
            offerModalClose.addEventListener('click', closeOfferModal);
        }

        overlay.addEventListener('click', (e) => {
            if (isOfferModalOpen) {
                closeOfferModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (isOfferModalOpen && e.key === 'Escape') {
                closeOfferModal();
            }
        });

        offerModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    const reviewModal = document.querySelector('.review-modal');
    const reviewBtns = document.querySelectorAll('.reviews-btn, .reviews-detail-button');

    if (reviewModal && reviewBtns.length > 0 && overlay) {
        let isReviewModalOpen = false;

        function openReviewModal() {
            forceCloseMobileMenu(); // Закрываем мобильное меню

            document.body.style.overflow = 'hidden';
            reviewModal.classList.add('opened');
            overlay.classList.add('active');
            isReviewModalOpen = true;
        }

        function closeReviewModal() {
            document.body.style.overflow = '';
            reviewModal.classList.remove('opened');
            overlay.classList.remove('active');
            isReviewModalOpen = false;
        }

        reviewBtns.forEach(reviewBtn => {
            reviewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openReviewModal();
            });
        });

        const reviewModalClose = reviewModal.querySelector('.review-modal__close');
        if (reviewModalClose) {
            reviewModalClose.addEventListener('click', closeReviewModal);
        }

        overlay.addEventListener('click', (e) => {
            if (isReviewModalOpen) {
                closeReviewModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (isReviewModalOpen && e.key === 'Escape') {
                closeReviewModal();
            }
        });

        reviewModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    const vacancyModal = document.querySelector('.vacancy-modal');
    const vacancyBtns = document.querySelectorAll('.vacancy-btn');

    if (vacancyModal && vacancyBtns.length > 0 && overlay) {
        let isVacancyModalOpen = false;

        function openVacancyModal() {
            forceCloseMobileMenu(); // Закрываем мобильное меню

            document.body.style.overflow = 'hidden';
            vacancyModal.classList.add('opened');
            overlay.classList.add('active');
            isVacancyModalOpen = true;
        }

        function closeVacancyModal() {
            document.body.style.overflow = '';
            vacancyModal.classList.remove('opened');
            overlay.classList.remove('active');
            isVacancyModalOpen = false;
        }

        vacancyBtns.forEach(vacancyBtn => {
            vacancyBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openVacancyModal();
            });
        });

        const vacancyModalClose = vacancyModal.querySelector('.vacancy-modal__close');
        if (vacancyModalClose) {
            vacancyModalClose.addEventListener('click', closeVacancyModal);
        }

        overlay.addEventListener('click', (e) => {
            if (isVacancyModalOpen) {
                closeVacancyModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (isVacancyModalOpen && e.key === 'Escape') {
                closeVacancyModal();
            }
        });

        vacancyModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    const consultationModal = document.querySelector('.consultation-modal');
    const consultationBtns = document.querySelectorAll('.consultation-btn');

    if (consultationModal && consultationBtns.length > 0 && overlay) {
        let isConsultationModalOpen = false;

        function openConsultationModal() {
            forceCloseMobileMenu(); // Закрываем мобильное меню

            document.body.style.overflow = 'hidden';
            consultationModal.classList.add('opened');
            overlay.classList.add('active');
            isConsultationModalOpen = true;
        }

        function closeConsultationModal() {
            document.body.style.overflow = '';
            consultationModal.classList.remove('opened');
            overlay.classList.remove('active');
            isConsultationModalOpen = false;
        }

        consultationBtns.forEach(consultationBtn => {
            consultationBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openConsultationModal();
            });
        });

        const consultationModalClose = consultationModal.querySelector('.consultation-modal__close');
        if (consultationModalClose) {
            consultationModalClose.addEventListener('click', closeConsultationModal);
        }

        overlay.addEventListener('click', (e) => {
            if (isConsultationModalOpen) {
                closeConsultationModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (isConsultationModalOpen && e.key === 'Escape') {
                closeConsultationModal();
            }
        });

        consultationModal.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    const submittedModal = document.querySelector('.form-submitted');
    const submittedModalClose = submittedModal?.querySelector('.modal__close, .form-submitted__close, [data-close]');

    if (submittedModal && submittedModalClose && overlay) {
        submittedModalClose.addEventListener('click', () => {
            if (submittedModal.classList.contains('opened')) {
                document.body.style.overflow = '';

                const anyModalOpen = document.querySelector('.call-modal.opened, .offer-modal.opened, .review-modal.opened, .vacancy-modal.opened, .consultation-modal.opened, .modal-catalog.active');

                if (!anyModalOpen) {
                    overlay.classList.remove('active');
                }
            }
        });

        overlay.addEventListener('click', (e) => {
            if (submittedModal.classList.contains('opened')) {
                document.body.style.overflow = '';

                const anyModalOpen = document.querySelector('.call-modal.opened, .offer-modal.opened, .review-modal.opened, .vacancy-modal.opened, .consultation-modal.opened, .modal-catalog.active');

                if (!anyModalOpen) {
                    overlay.classList.remove('active');
                }
            }
        });

        document.addEventListener('keydown', (e) => {
            if (submittedModal.classList.contains('opened') && e.key === 'Escape') {
                document.body.style.overflow = '';

                const anyModalOpen = document.querySelector('.call-modal.opened, .offer-modal.opened, .review-modal.opened, .vacancy-modal.opened, .consultation-modal.opened, .modal-catalog.active');

                if (!anyModalOpen) {
                    overlay.classList.remove('active');
                }
            }
        });
    }

    const filterBtn = document.querySelector('.filter-btn');
    const mobileFilterCloseBtn = document.querySelector('.mobile-filter-close');
    const catalogSectionLeft = document.querySelector('.catalog-section__left');
    const catalogSectionRight = document.querySelector('.catalog-section__right');

    if (filterBtn && catalogSectionLeft && catalogSectionRight && overlay) {
        let isFilterOpen = false;
        const mediaQuery = window.matchMedia('(max-width: 1359px)');

        function isMobileFilter() {
            return mediaQuery.matches;
        }

        function openFilter() {
            if (isFilterOpen || !isMobileFilter()) return;

            document.body.style.overflow = 'hidden';
            catalogSectionLeft.classList.add('active');
            overlay.classList.add('active');
            isFilterOpen = true;
        }

        function closeFilter() {
            if (!isFilterOpen) return;

            document.body.style.overflow = '';
            catalogSectionLeft.classList.remove('active');
            overlay.classList.remove('active');
            isFilterOpen = false;
        }

        filterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openFilter();
        });

        if (mobileFilterCloseBtn) {
            mobileFilterCloseBtn.addEventListener('click', closeFilter);
        }

        overlay.addEventListener('click', (e) => {
            if (isFilterOpen) {
                closeFilter();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (isFilterOpen && e.key === 'Escape') {
                closeFilter();
            }
        });

        catalogSectionLeft.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        function handleMediaChange(e) {
            if (!e.matches && isFilterOpen) {
                closeFilter();
            }
        }

        mediaQuery.addListener(handleMediaChange);
    }
}