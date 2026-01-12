export function InitTabs() {
    class Tabs {
        constructor(container) {
            this.container = container;
            this.buttons = container.querySelectorAll('.tab__btn');
            this.panes = container.querySelectorAll('.tab__pane');
            this.init();
        }

        init() {
            if (this.buttons.length > 0 && this.panes.length > 0) {
                this.buttons[0].classList.add('active');
                this.panes[0].classList.add('active');
            }


            this.container.addEventListener('click', (e) => {
                const button = e.target.closest('.tab__btn');
                if (button && this.container.contains(button)) {
                    e.preventDefault();
                    this.switchTab(button);
                }
            });
        }

        switchTab(button) {
            if (button.classList.contains('active')) return;

            const targetTabId = button.dataset.tab;

            this.buttons.forEach(btn => btn.classList.remove('active'));
            this.panes.forEach(pane => pane.classList.remove('active'));

            button.classList.add('active');
            const targetPane = this.container.querySelector(`#${targetTabId}`);

            if (targetPane) {
                targetPane.classList.add('active');
            }
        }

        openCharacteristicsTab() {
            const characteristicsButton = this.container.querySelector('.tab__btn[data-tab="characteristics"]');
            if (characteristicsButton) {
                this.switchTab(characteristicsButton);

                setTimeout(() => {
                    this.container.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    }

    const tabsContainers = document.querySelectorAll('.tabs');
    const tabsInstances = [];

    tabsContainers.forEach(container => {
        tabsInstances.push(new Tabs(container));
    });

    const characteristicsLinks = document.querySelectorAll('.characteristics-link');
    characteristicsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (tabsInstances.length > 0) {
                tabsInstances[0].openCharacteristicsTab();
            }
        });
    });
}

window.InitTabs = InitTabs;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing tabs globally...');
    InitTabs();
});