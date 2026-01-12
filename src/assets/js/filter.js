export function InitFilter() {
    function initFilterAccordion() {
        const filterContainers = document.querySelectorAll('.filter-variants');

        filterContainers.forEach(container => {
            const filterItems = container.querySelectorAll('.filter-variants__item');

            filterItems.forEach(item => {
                const header = item.querySelector('.filter-variants__header');
                const content = item.querySelector('.filter-variants__content');
                const arrow = item.querySelector('.filter__arrow');

                if (!header || !content) return;


                content.style.cssText = '';


                content.style.transition = 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)';


                item.classList.remove('collapsed');

                item.classList.add('filter-variants__item--open');


                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.overflow = 'visible';

                if (arrow) {
                    arrow.style.transform = 'rotate(180deg)';
                }

                header.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Переключаем класс collapsed
                    item.classList.toggle('collapsed');

                    if (item.classList.contains('collapsed')) {
                        // Закрываем
                        content.style.maxHeight = '0';
                        content.style.overflow = 'hidden';
                        if (arrow) {
                            arrow.style.transform = 'rotate(0deg)';
                        }
                    } else {
                        // Открываем
                        const scrollHeight = content.scrollHeight;
                        content.style.maxHeight = scrollHeight + 'px';
                        setTimeout(() => {
                            content.style.overflow = 'visible';
                        }, 400);
                        if (arrow) {
                            arrow.style.transform = 'rotate(180deg)';
                        }
                    }
                });
            });
        });

        window.addEventListener('resize', function() {
            document.querySelectorAll('.filter-variants__item:not(.collapsed) .filter-variants__content').forEach(content => {
                content.style.maxHeight = content.scrollHeight + 'px';
            });
        });
    }


    document.addEventListener('DOMContentLoaded', function() {
        initFilterAccordion();
    });


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

        const rangeFill = document.createElement('div');
        rangeFill.style.position = 'absolute';
        rangeFill.style.top = '50%';
        rangeFill.style.height = '5px';
        rangeFill.style.background = '#FF0000'; // Сохраняем оригинальный цвет
        rangeFill.style.transform = 'translateY(-50%)';
        rangeFill.style.borderRadius = '100px';
        rangeFill.style.zIndex = '1';
        container.appendChild(rangeFill);

        let minVal = parseInt(minSlider.value);
        let maxVal = parseInt(maxSlider.value);

        const minAvailableValue = minInput.getAttribute('min')
        const maxAvailableValue = minInput.getAttribute('max')

        let isMinInputActive = false;
        let isMaxInputActive = false;

        function updateRangeFill() {
            const min = parseInt(minSlider.value);
            const max = parseInt(maxSlider.value);
            const totalRange = maxAvailableValue - minAvailableValue;
            const minPercent = ((min - minAvailableValue) / totalRange) * 100;
            const maxPercent = ((max - minAvailableValue) / totalRange) * 100;

            rangeFill.style.left = minPercent + '%';
            rangeFill.style.width = (maxPercent - minPercent) + '%';
        }

        const updateFromSliders = () => {
            minVal = parseInt(minSlider.value);
            maxVal = parseInt(maxSlider.value);

            if (minVal > maxVal) {
                minVal = maxVal;
                minSlider.value = minVal;
            }

            if (!isMinInputActive) minInput.value = minVal;
            if (!isMaxInputActive) maxInput.value = maxVal;

            updateRangeFill();
        };

        const updateSingleInput = (input, value, type) => {
            const numValue = parseInt(value);
            if (isNaN(numValue)) return false;

            const minLimit = minAvailableValue;
            const maxLimit = maxAvailableValue;

            let finalValue = numValue;
            if (finalValue < minLimit) finalValue = minLimit;
            if (finalValue > maxLimit) finalValue = maxLimit;

            input.value = finalValue;

            if (type === 'min') {
                minVal = finalValue;
                minSlider.value = finalValue;
            } else {
                maxVal = finalValue;
                maxSlider.value = finalValue;
            }

            updateRangeFill();
            return true;
        };

        const finalizeInput = (type) => {
            if (type === 'min') {
                isMinInputActive = false;
                if (minVal > maxVal) {
                    maxVal = minVal;
                    maxSlider.value = minVal;
                    maxInput.value = minVal;
                }
            } else {
                isMaxInputActive = false;
                if (maxVal < minVal) {
                    minVal = maxVal;
                    minSlider.value = maxVal;
                    minInput.value = maxVal;
                }
            }
            updateRangeFill();
        };

        // Устанавливаем границы значений
        minInput.min = minAvailableValue;
        minInput.max = maxAvailableValue;
        maxInput.min = minAvailableValue;
        maxInput.max = maxAvailableValue;

        // Обработчики фокуса
        minInput.addEventListener('focus', function() {
            isMinInputActive = true;
        });

        maxInput.addEventListener('focus', function() {
            isMaxInputActive = true;
        });

        // Обработчики ввода
        minInput.addEventListener('input', function() {
            updateSingleInput(this, this.value, 'min');
        });

        maxInput.addEventListener('input', function() {
            updateSingleInput(this, this.value, 'max');
        });

        // Обработчики потери фокуса
        minInput.addEventListener('blur', function() {
            let value = parseInt(this.value);
            if (isNaN(value)) {
                value = minAvailableValue;
                this.value = value;
                minVal = value;
                minSlider.value = value;
            }
            finalizeInput('min');
        });

        maxInput.addEventListener('blur', function() {
            let value = parseInt(this.value);
            if (isNaN(value)) {
                value = minAvailableValue;
                this.value = value;
                maxVal = value;
                maxSlider.value = value;
            }
            finalizeInput('max');
        });

        // Обработчики для слайдеров
        minSlider.addEventListener('input', function() {
            if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
                minSlider.value = maxSlider.value;
            }
            updateFromSliders();
        });

        maxSlider.addEventListener('input', function() {
            if (parseInt(maxSlider.value) < parseInt(minSlider.value)) {
                maxSlider.value = minSlider.value;
            }
            updateFromSliders();
        });

        updateRangeFill();
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