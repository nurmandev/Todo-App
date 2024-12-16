import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [token, setToken] = useState(""); // Token for auth
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
  });

  useEffect(() => {
    fetchTodos();
  }, [sortBy, order, statusFilter]);

  const fetchTodos = async () => {
    try {
      const params = {};
      if (sortBy) params.sortBy = sortBy;
      if (order) params.order = order;
      if (statusFilter) params.status = statusFilter;

      const response = await axios.get("http://localhost:3002/todos", {
        headers: { Authorization: token },
        params,
      });
      setTodos(response.data.todos);
    } catch (error) {
      toast.error("Error fetching todos.");
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3002/create",
        newTodo,
        { headers: { Authorization: token } }
      );
      toast.success(response.data.notification);
      fetchTodos();
    } catch (error) {
      toast.error("Error adding todo.");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3002/todos/${id}`, {
        headers: { Authorization: token },
      });
      toast.info(response.data.notification);
      fetchTodos();
    } catch (error) {
      toast.error("Error deleting todo.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Todo List</h1>

      {/* Toast Notifications */}
      <ToastContainer />

      {/* Token Input */}
      <div>
        <input
          type="text"
          placeholder="Enter Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>

      {/* Sorting and Filtering */}
      <div>
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">None</option>
          <option value="title">Title</option>
          <option value="dueDate">Due Date</option>
          <option value="status">Status</option>
        </select>

        <label>Order:</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <label>Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Add New Todo */}
      <div>
        <h3>Add Todo</h3>
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={(e) =>
            setNewTodo({ ...newTodo, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <input
          type="date"
          value={newTodo.dueDate}
          onChange={(e) =>
            setNewTodo({ ...newTodo, dueDate: e.target.value })
          }
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      {/* Todo List */}
      <div>
        <h2>Todos</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              <strong>{todo.title}</strong> - {todo.description} -{" "}
              {new Date(todo.dueDate).toLocaleDateString()} - {todo.status}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleDeleteTodo(todo._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
