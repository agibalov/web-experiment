import {inject, injectable} from "inversify";
import {Connection} from "typeorm";
import {Todo} from "./todo";

export type ConnectionProvider = () => Promise<Connection>;

@injectable()
export class DatabaseService {
    constructor(
        @inject('ConnectionProvider') private connectionProvider: ConnectionProvider)
    {}

    async getData() {
        const connection = await this.connectionProvider();

        const todo = new Todo();
        todo.text = 'hello world ' + new Date();

        const todoRepository = connection.getRepository(Todo);
        const savedTodo = await todoRepository.save(todo);
        console.log(`savedTodo id = ${savedTodo.id}`);

        const todoCount = await todoRepository.count();
        console.log(`total: ${todoCount}`);

        return await new Promise((resolve) => {
            setTimeout(() => {
                resolve(`I have ${todoCount} todos and it's ${new Date()}`);
            }, 300);
        });
    }
}
