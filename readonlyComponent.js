class ReadOnlyComponent extends HTMLInputElement {
    constructor() {
        super();

        this.addEventListener("keydown", (event) => {
            if (!isNaN(Number(event.key)) || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 37 || event.keyCode == 39) {
                return true;
            }
            else {
                event.preventDefault();
                return false;
            }
        });
    }
}

customElements.define('read-only-component', ReadOnlyComponent, { extends: 'input' });