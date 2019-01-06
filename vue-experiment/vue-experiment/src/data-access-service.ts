export interface TaskDto {
    id: string;
    text: string;
}

export class DataAccessService {

    private static withDelay<T>(f: () => T): Promise<T> {
        return new Promise<T>((resolve) => {
            setTimeout(() => {
                const result = f();
                resolve(result);
            }, 500);
        });
    }

    private static clone<T>(something: T): T {
        return JSON.parse(JSON.stringify(something));
    }
    private tasks: TaskDto[] = [
        {id: 't1', text: 'task one'},
        {id: 't2', text: 'task two'},
        {id: 't3', text: 'task three'},
    ];

    public async getTasks(): Promise<TaskDto[]> {
        return DataAccessService.withDelay(() => {
            return DataAccessService.clone(this.tasks);
        });
    }

    public async putTask(taskDto: TaskDto): Promise<void> {
        return DataAccessService.withDelay(() => {
            this.tasks.push(DataAccessService.clone(taskDto));
        });
    }

    public async deleteTask(taskId: string): Promise<void> {
        return DataAccessService.withDelay(() => {
            this.tasks = this.tasks.filter((t) => t.id !== taskId);
        });
    }
}
