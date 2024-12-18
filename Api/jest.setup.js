jest.mock('../services/todoService', () => ({
    createTodo: jest.fn(),
    getAllTodos: jest.fn(),
    getTodosByUserId: jest.fn(),
    getTodoById: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  }));
  