const moment = require('moment');

export abstract class Field {
    label: string;
    abstract value: any;

    constructor(label: string) {
        this.label = label;
    }

    abstract renderValue(): string;

    public render(): {label: string, value: string} {
        return {label: this.label, value: this.renderValue()};
    }
}

export class TextField extends Field {
    value: string;

    constructor(label: string, value: string) {
        super(label);
        this.value = value;
    }

    renderValue(): string {
        return this.value;
    }
}

export class DateTimeField extends Field {
    value: number;

    constructor(label: string, value: number) {
        super(label);
        this.value = value;
    }

    renderValue(): string {
        return moment(this.value).format('YYYY-MM-DDTHH:mm:ssZ');
    }
}

export class DateField extends Field {
    value: number;

    constructor(label: string, value: number) {
        super(label);
        this.value = value;
    }

    renderValue(): string {
        return moment(this.value).format('YYYY-MM-DD');
    }
}

export class ListField extends Field {
    value: any[];

    constructor(label: string, value: any[]) {
        super(label);
        this.value = value;
    }

    renderValue(): string {
        return `[${this.value.join(', ')}]`;
    }
}

export class NumberField extends Field {
    value: number;

    constructor(label: string, value: number) {
        super(label);
        this.value = value;
    }

    renderValue(): string {
        return `${this.value}`;
    }
}

export class LinkField extends Field {
    value: string;

    constructor(label: string, value: string) {
        super(label);
        this.value = value;
    }

    renderValue(): string {
        return `[[${this.value}]]`
    }
}
