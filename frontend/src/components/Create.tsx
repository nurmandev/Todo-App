import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle } from "lucide-react";

function Create() {
  const [todoData, setTodoData] = useState({
    title: "",
    description: "",
    status: false,
    dueDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const createTodo = async () => {
    if (
      !todoData.title.trim() ||
      !todoData.description.trim() ||
      !todoData.dueDate
    ) {
      setError("All fields (title, description, and due date) are required.");
      return;
    }

    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    console.log("token", token);
    try {
      await axios.post("https://test-todo-wdtk.onrender.com/api/v1/todos/create", todoData, {
        headers: {
          Authorization: token,
        },
      });
      navigate("/todos");
    } catch (err) {
      console.error("Failed to create todo:", err);
      setError("Failed to create todo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goBack = () => {
    navigate("/todos");
  };

  return (
    <div className="min-h-screen p-4 relative">
      <button
        className="absolute left-4 top-4 p-2 px-4 bg-red-500 text-white rounded text-lg font-bold"
        onClick={goBack}
      >
        Back
      </button>
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-2xl w-full rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <h2 className="text-4xl font-extrabold text-center text-red-500 mb-6">
              Create New Todo
            </h2>
            {error && (
              <div className="mb-4 p-2 text-red-700 bg-red-100 rounded border border-red-400">
                {error}
              </div>
            )}
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={todoData.title}
                  placeholder="Enter todo title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) =>
                    setTodoData({ ...todoData, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={todoData.description}
                  placeholder="Enter todo description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 h-32"
                  onChange={(e) =>
                    setTodoData({ ...todoData, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Status
                </label>
                <select
                  id="status"
                  value={todoData.status.toString()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) =>
                    setTodoData({
                      ...todoData,
                      status: e.target.value === "true",
                    })
                  }
                >
                  <option value="false">Incomplete</option>
                  <option value="true">Completed</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={todoData.dueDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  onChange={(e) =>
                    setTodoData({ ...todoData, dueDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="mt-6">
              <button
                className={`w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-lg font-bold text-white ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                onClick={createTodo}
                disabled={loading}
              >
                {loading ? (
                  <span>Creating...</span>
                ) : (
                  <>
                    <PlusCircle className="mr-2" size={20} />
                    Create Todo
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
