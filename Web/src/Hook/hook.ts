import axios from "axios";
import { useEffect, useState } from "react";

export const getReq = () => {
  const [title, setTitle] = useState();
  const [description, setdescription] = useState();
  const [status, setStatus] = useState();
  const [dueDate, setDueDate] = useState();

  useEffect(() => {
    axios
      .get("https://todo-app-d8u6.onrender.com/todos", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setTitle(response.data.todos.title);
        setdescription(response.data.todos.description);
        setStatus(response.data.todos.status);
        setDueDate(response.data.todos.dueDate);
      });
  }, []);

  return {
    title,
    description,
    status,
    dueDate
  };
};
