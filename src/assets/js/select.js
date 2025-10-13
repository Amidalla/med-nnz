
export function InitSelect() {
    const customSelects = document.querySelectorAll('.custom-select');

    customSelects.forEach(customSelect => {
        const selectSelected = customSelect.querySelector('.select-selected');
        const selectItems = customSelect.querySelector('.select-items');
        const options = customSelect.querySelectorAll('.option');
        const originalSelect = customSelect.parentElement.querySelector('select');

        if (!selectSelected || !selectItems) return;

        selectSelected.addEventListener('click', function(e) {
            e.stopPropagation();
            selectItems.classList.toggle('show');
            customSelect.classList.toggle('active');
        });

        options.forEach(option => {
            option.addEventListener('click', function() {

                selectSelected.textContent = this.textContent;
                selectSelected.setAttribute('data-value', this.getAttribute('data-value'));


                options.forEach(opt => opt.classList.remove('active'));

                this.classList.add('active');


                selectItems.classList.remove('show');
                customSelect.classList.remove('active');


                if (originalSelect) {
                    originalSelect.value = this.getAttribute('data-value');

                    originalSelect.dispatchEvent(new Event('change'));
                }
            });
        });


        if (originalSelect) {
            const selectedOption = originalSelect.options[originalSelect.selectedIndex];
            if (selectedOption) {
                selectSelected.textContent = selectedOption.textContent;
                selectSelected.setAttribute('data-value', selectedOption.value);


                options.forEach(option => {
                    if (option.getAttribute('data-value') === selectedOption.value) {
                        option.classList.add('active');
                    }
                });
            }
        }
    });


    document.addEventListener('click', function() {
        document.querySelectorAll('.select-items').forEach(item => {
            item.classList.remove('show');
        });
        document.querySelectorAll('.custom-select').forEach(select => {
            select.classList.remove('active');
        });
    });


    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.select-items').forEach(item => {
                item.classList.remove('show');
            });
            document.querySelectorAll('.custom-select').forEach(select => {
                select.classList.remove('active');
            });
        }
    });
}