export function InitAccordion() {
    document.addEventListener('DOMContentLoaded', function() {
        const accordionItems = document.querySelectorAll('.accordion-item');


        if (accordionItems.length > 0) {
            const firstItem = accordionItems[0];
            const firstContent = firstItem.querySelector('.accordion-content');
            const firstBody = firstItem.querySelector('.accordion-body');

            firstItem.classList.add('active');

            firstContent.style.maxHeight = firstBody.scrollHeight + 35 + 'px';
        }

        accordionItems.forEach(item => {
            const header = item.querySelector('.accordion-header');
            const content = item.querySelector('.accordion-content');
            const body = item.querySelector('.accordion-body');

            header.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                if (isActive) {

                    content.style.maxHeight = '0';
                    setTimeout(() => {
                        item.classList.remove('active');
                    }, 300);
                } else {

                    item.classList.add('active');


                    const contentHeight = body.scrollHeight + 35 + 'px';
                    content.style.maxHeight = contentHeight;
                }
            });
        });
    });
}

InitAccordion();