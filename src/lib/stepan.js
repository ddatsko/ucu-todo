export default class Stepan {
    static validTag(tagName) {
        return document.createElement(tagName).toString() !== "[object HTMLUnknownElement]";
    }

    static createElement(element, parent, attributes = {}) {
        if (!Stepan.validTag(element))
            throw new StepanError("Invalid tag name", 2);
        const newElement = document.createElement(element);

        const {innerHTML, innerText} = attributes;

        for (let attribute in attributes) {
            if (['innerHTML', 'innerText'].includes(attribute)) {
                continue;
            }

            newElement.setAttribute(attribute, attributes[attribute]);
        }

        innerHTML && (newElement.innerHTML = innerHTML);
        innerText && (newElement.innerText = innerText);

        parent.appendChild(newElement);

        return newElement;
    }

    static Component = class {
        constructor(parent) {

            if (!parent || !(parent instanceof Element))
                throw new StepanError("Parent element is invalid", 1);

            this.parent = parent;
        }

        // TODO (Bonus): Ensure that every component returns a top-level root element
    }
}

export class StepanError extends Error {

    constructor(message, code) {
        super(message);
        this.name = `Stepan Error (code ${code})`;
        this.code = code;
    }
}
