import { observable } from 'mobx';

export class Todo {
    id: string;
    @observable text: string;

    constructor(id: string, text: string) {
        this.id = id;
        this.text = text;
    }
}
