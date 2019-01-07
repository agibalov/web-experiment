export type TaskStatus = 'todo' | 'in-progress' | 'done';

export class Task {
    constructor(
        public id: string,
        public text: string,
        public status: TaskStatus)
    {}
}
