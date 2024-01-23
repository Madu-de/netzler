export class NetzlerPopup {
    private name: string;
    private body: string;

    constructor(name: string, body: string) {
        this.name = name;
        this.body = body;
    }

    getName(): string { return this.name; }
    getBody(): string { return this.body; }
}