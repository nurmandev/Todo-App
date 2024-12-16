import { useState } from "react";

type Todo = {
  id: string;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
};

function Todos() {
  const [todos, setTodos] = useState<Todo[]>([
    // Example todos
    {
      id: "1",
      title: "Write Code",
      description: "Complete the React app",
      status: false,
      dueDate: "2024-12-20",
    },
    {
      id: "2",
      title: "Read Book",
      description: "Read 50 pages",
      status: true,
      dueDate: "2024-12-18",
    },
    {
      id: "3",
      title: "Workout",
      description: "30 minutes of exercise",
      status: false,
      dueDate: "2024-12-19",
    },
  ]);

  const [sortOption, setSortOption] = useState<string>("title");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Handle sorting
  const handleSort = (todos: Todo[]) => {
    return [...todos].sort((a, b) => {
      if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      } else if (sortOption === "dueDate") {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortOption === "status") {
        return Number(a.status) - Number(b.status); // Sort incomplete (false) first
      }
      return 0;
    });
  };

  // Handle filtering
  const handleFilter = (todos: Todo[]) => {
    if (filterStatus === "completed") {
      return todos.filter((todo) => todo.status === true);
    } else if (filterStatus === "incomplete") {
      return todos.filter((todo) => todo.status === false);
    }
    return todos; // No filtering if "all"
  };

  // Processed todos after sorting and filtering
  const processedTodos = handleSort(handleFilter(todos));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>

      {/* Sorting Options */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sort By
          </label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="title">Title</option>
            <option value="dueDate">Due Date</option>
            <option value="status">Status</option>
          </select>
        </div>

        {/* Filtering Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Filter By
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>
      </div>

      {/* Todo List */}
      <ul className="space-y-4">
        {processedTodos.map((todo) => (
          <li key={todo.id} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold">{todo.title}</h2>
            <p className="text-gray-600">{todo.description}</p>
            <p className="text-sm text-gray-500">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </p>
            <p
              className={`text-sm font-semibold ${
                todo.status ? "text-green-500" : "text-red-500"
              }`}
            >
              {todo.status ? "Completed" : "Incomplete"}
            </p>
          </li>
        ))}
      </ul>

      {/* Empty State */}
      {processedTodos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          No todos match your criteria.
        </p>
      )}
    </div>
  );
}

export default Todos;
