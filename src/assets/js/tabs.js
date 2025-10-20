export function InitTabs() {
    class Tabs {
        constructor(container) {
            this.container = container;
            this.buttons = container.querySelectorAll('.tab__btn');
            this.panes = container.querySelectorAll('.tab__pane');
            this.init();
        }

        init() {
            this.buttons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.switchTab(e.target);
                });
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
    }

    const tabsContainers = document.querySelectorAll('.tabs');
    tabsContainers.forEach(container => {
        new Tabs(container);
    });
}