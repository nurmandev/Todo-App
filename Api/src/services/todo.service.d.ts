import { TodoEntity } from "../entities/todo.entity";
interface CreateTodoInput {
    userId: string;
    title: string;
    description?: string;
    status?: boolean;
    dueDate?: Date;
}
interface UpdateTodoInput {
    title?: string;
    description?: string;
    status?: boolean;
    dueDate?: Date;
}
export declare const createTodo: (userId: string, data: CreateTodoInput) => Promise<TodoEntity>;
export declare const getAllTodos: () => Promise<TodoEntity[]>;
export declare const getTodosByUserId: (userId: string, filters: Partial<TodoEntity>, sortBy?: string, order?: "ASC" | "DESC") => Promise<TodoEntity[]>;
export declare const getTodoById: (todoid: string) => Promise<TodoEntity | null>;
export declare const updateTodo: (todoid: string, data: UpdateTodoInput) => Promise<TodoEntity | null>;
export declare const deleteTodo: (todoid: string) => Promise<boolean>;
export {};
