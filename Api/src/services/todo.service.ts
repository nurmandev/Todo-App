import { FindManyOptions, FindOptionsWhere } from "typeorm";
import { AppDataSouce } from "../db";
import { TodoEntity } from "../entities/todo.entity";

// Define types for the input data
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

export const createTodo = async (
  userId: string,
  data: CreateTodoInput
): Promise<TodoEntity> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  const todo = todoRepository.create({
    userId,
    ...data,
    status: data.status || false, // Default status to false if not provided
  });

  await todoRepository.save(todo);
  return todo;
};

export const getAllTodos = async (): Promise<TodoEntity[]> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);
  return await todoRepository.find();
};

export const getTodosByUserId = async (
  userId: string,
  filters: Partial<TodoEntity>,
  sortField: string = "createdAt",
  sortOrder: "ASC" | "DESC" = "ASC"
) => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  // Build the query options dynamically
  const where: FindOptionsWhere<TodoEntity> = { userId, ...filters };

  if (
    ![
      "todoid",
      "userId",
      "title",
      "description",
      "status",
      "dueDate",
      "createdAt",
    ].includes(sortField)
  ) {
    throw new Error(`Invalid sort field: ${sortField}`);
  }

  const options: FindManyOptions<TodoEntity> = {
    where,
    // order: { [sortField]: sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC" },
  };

  // Execute the query
  const todos = await todoRepository.find(options);
  return todos;
};

export const getTodoById = async (
  todoid: string
): Promise<TodoEntity | null> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);
  return await todoRepository.findOne({ where: { todoid } });
};

export const updateTodo = async (
  todoid: string,
  data: UpdateTodoInput
): Promise<TodoEntity | null> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  const todo = await todoRepository.findOne({ where: { todoid } });
  if (!todo) return null;

  // Merge updated fields into the existing todo
  todoRepository.merge(todo, data);
  await todoRepository.save(todo);
  return todo;
};

export const deleteTodo = async (todoid: string): Promise<boolean> => {
  const todoRepository = AppDataSouce.getRepository(TodoEntity);

  const result = await todoRepository.delete({ todoid });
  return result.affected > 0; // Returns true if a record was deleted
};
