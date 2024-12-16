import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TodoProps {
  id: string;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
  onEdit: (id: string, updatedTodo: TodoData) => void;
  onDelete: (id: string) => void;
}

const Todo: React.FC<TodoProps> = ({
  id,
  title,
  description,
  status,
  dueDate,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStatus, setEditedStatus] = useState(status);
  const [editedDueDate, setEditedDueDate] = useState(dueDate);

  const handleEdit = () => {
    onEdit(id, {
      _id: id,
      title: editedTitle,
      description: editedDescription,
      status: editedStatus,
      dueDate: editedDueDate,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-auto flex flex-col relative">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="text-lg font-semibold mb-2 p-1 border rounded"
            placeholder="Edit title"
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="text-gray-600 p-1 border rounded flex-grow"
            placeholder="Edit description"
          />
          <label className="block mt-2">
            Status:
            <select
              value={editedStatus.toString()}
              onChange={(e) => setEditedStatus(e.target.value === "true")}
              className="ml-2 border p-1 rounded"
            >
              <option value="false">Incomplete</option>
              <option value="true">Completed</option>
            </select>
          </label>
          <label className="block mt-2">
            Due Date:
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className="ml-2 border p-1 rounded"
            />
          </label>
          <div className="mt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-2 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2 flex-shrink-0">{title}</h3>
          <p className="text-gray-600 overflow-auto flex-grow mb-2">
            {description}
          </p>
          <p
            className={`text-sm font-medium mb-2 ${
              status ? "text-green-500" : "text-red-500"
            }`}
          >
            Status: {status ? "Completed" : "Incomplete"}
          </p>
          <p className="text-sm text-gray-500">Due Date: {dueDate}</p>
          <div className="absolute top-2 right-2">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 mr-2"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button onClick={() => onDelete(id)} className="text-red-500">
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

interface TodoData {
  _id: string;
  title: string;
  description: string;
  status: boolean;
  dueDate: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [loading, setLoading] = useState(true);

  // State for sorting and filtering
  const [sortBy, setSortBy] = useState<string>("dueDate");
  const [order, setOrder] = useState<string>("asc");
  const [filterStatus, setFilterStatus] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, [sortBy, order, filterStatus]); // Re-fetch todos when these values change

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://todo-app-d8u6.onrender.com/todos?sortBy=${sortBy}&order=${order}&status=${filterStatus}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setTodos(response.data.todos);
      toast.success("Todos loaded successfully!");
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      toast.error("Failed to load todos!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (id: string, updatedTodo: TodoData) => {
    try {
      await axios.put(
        `https://todo-app-d8u6.onrender.com/todos/${id}`,
        updatedTodo,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === id ? updatedTodo : todo))
      );
      toast.success("Todo updated successfully!");
    } catch (err) {
      console.error("Failed to update todo:", err);
      toast.error("Failed to update todo!");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://todo-app-d8u6.onrender.com/todos/${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      toast.success("Todo deleted successfully!");
    } catch (err) {
      console.error("Failed to delete todo:", err);
      toast.error("Failed to delete todo!");
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <ToastContainer />
        <h2 className="text-4xl flex justify-center font-extrabold mb-8">
          Your Todos
        </h2>

        {/* Sorting and Filtering UI */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="mr-2 font-semibold">Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="dueDate">Due Date</option>
              <option value="title">Title</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div>
            <label className="mr-2 font-semibold">Order:</label>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div>
            <label className="mr-2 font-semibold">Filter by Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border p-1 rounded"
            >
              <option value="">All</option>
              <option value="true">Completed</option>
              <option value="false">Incomplete</option>
            </select>
          </div>
        </div>

        {todos.length === 0 ? (
          <p className="text-gray-500">No todos found. Start adding some!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todos.map((todo) => (
              <Todo
                key={todo._id}
                id={todo._id}
                title={todo.title}
                description={todo.description}
                status={todo.status}
                dueDate={todo.dueDate}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TodoList;
