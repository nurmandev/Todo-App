import axios from "axios";
import { useEffect, useState } from "react";

export const getReq = () => {
  const [title, setTitle] = useState();
  const [description, setdescription] = useState();
  const [status, setStatus] = useState();
  const [dueDate, setDueDate] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/todos", {
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
    dueDate,
  };
};
