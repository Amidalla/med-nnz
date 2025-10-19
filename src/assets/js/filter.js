export function InitFilter() {
    function initFilterAccordion() {
        const filterItems = document.querySelectorAll('.filter-variants__item');


        filterItems.forEach(item => {
            const content = item.querySelector('.filter-variants__content');
            if (content) {
                content.style.maxHeight = '0';
                content.style.overflow = 'hidden';
                content.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });


        filterItems.forEach(item => {
            const header = item.querySelector('.filter-variants__header');
            const content = item.querySelector('.filter-variants__content');
            const arrow = item.querySelector('.filter__arrow');

            if (header && content && arrow) {
                header.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFilterItem(content, arrow);
                });
            }
        });

        function toggleFilterItem(content, arrow) {
            const isOpen = content.style.maxHeight !== '0px';


            closeAllFilterItems();

            if (!isOpen) {

                const scrollHeight = content.scrollHeight;
                content.style.maxHeight = scrollHeight + 'px';
                arrow.style.transform = 'rotate(180deg)';
            }
        }

        function closeAllFilterItems() {
            const allContents = document.querySelectorAll('.filter-variants__content');
            const allArrows = document.querySelectorAll('.filter__arrow');

            allContents.forEach(content => {
                content.style.maxHeight = '0';
            });

            allArrows.forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
            });
        }


        document.addEventListener('click', function(e) {
            if (!e.target.closest('.filter-variants')) {
                closeAllFilterItems();
            }
        });


        window.addEventListener('resize', function() {
            const openContents = document.querySelectorAll('.filter-variants__content[style*="max-height"]');
            openContents.forEach(content => {
                if (content.style.maxHeight !== '0px') {
                    const scrollHeight = content.scrollHeight;
                    content.style.maxHeight = scrollHeight + 'px';
                }
            });
        });
    }

    function initLoadSlider() {
        const container = document.querySelector('.load-sliders');
        if (!container) {
            console.log('Slider container not found');
            return;
        }

        const minSlider = container.querySelector('.min-slider');
        const maxSlider = container.querySelector('.max-slider');
        const minInput = document.querySelector('.min-load');
        const maxInput = document.querySelector('.max-load');

        if (!minSlider || !maxSlider || !minInput || !maxInput) {
            console.log('Slider elements not found:', { minSlider, maxSlider, minInput, maxInput });
            return;
        }

        console.log('Initializing load slider...');


        const rangeFill = document.createElement('div');
        rangeFill.style.position = 'absolute';
        rangeFill.style.top = '50%';
        rangeFill.style.height = '5px';
        rangeFill.style.background = '#FF0000';
        rangeFill.style.transform = 'translateY(-50%)';
        rangeFill.style.borderRadius = '100px';
        rangeFill.style.zIndex = '1';
        container.appendChild(rangeFill);

        function updateRangeFill() {
            const min = parseInt(minSlider.value);
            const max = parseInt(maxSlider.value);
            const totalRange = 999 - 10;
            const minPercent = ((min - 10) / totalRange) * 100;
            const maxPercent = ((max - 10) / totalRange) * 100;

            rangeFill.style.left = minPercent + '%';
            rangeFill.style.width = (maxPercent - minPercent) + '%';
        }

        function updateInputs() {
            minInput.value = minSlider.value;
            maxInput.value = maxSlider.value;
            updateRangeFill();
        }

        function updateSliders() {
            let minVal = parseInt(minInput.value) || 10;
            let maxVal = parseInt(maxInput.value) || 999;


            minVal = Math.max(10, Math.min(999, minVal));
            maxVal = Math.max(10, Math.min(999, maxVal));


            if (minVal > maxVal) {
                if (minInput === document.activeElement) {
                    maxVal = minVal;
                    maxInput.value = maxVal;
                } else {
                    minVal = maxVal;
                    minInput.value = minVal;
                }
            }

            minSlider.value = minVal;
            maxSlider.value = maxVal;
            updateRangeFill();
        }


        minSlider.addEventListener('input', function() {
            if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
                minSlider.value = maxSlider.value;
            }
            updateInputs();
        });

        maxSlider.addEventListener('input', function() {
            if (parseInt(maxSlider.value) < parseInt(minSlider.value)) {
                maxSlider.value = minSlider.value;
            }
            updateInputs();
        });


        minInput.addEventListener('input', updateSliders);
        maxInput.addEventListener('input', updateSliders);


        updateRangeFill();
        console.log('Load slider initialized successfully');
    }


    function init() {
        console.log('Initializing filter...');
        initFilterAccordion();
        initLoadSlider();
    }


    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
}