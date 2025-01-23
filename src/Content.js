import React, { useState, useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const Content = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("todo_list");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    localStorage.setItem("todo_list", JSON.stringify(items));
  }, [items]);

  const handleCheck = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
  };

  const handleDelete = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    if (updatedItems.length === 0) {
      Swal.fire({
        icon: "info",
        title: "List is Empty",
        text: "You have no tasks left!",
        confirmButtonText: "OK",
      });
    }
  };

  const handleNewTask = () => {
    if (!newTask.trim()) {
      Swal.fire({
        title: "Empty Task",
        icon: "warning",
        text: "Please enter a valid task!",
        confirmButtonText: "OK",
      });
      return;
    }

    const newItem = {
      id: Date.now(),
      checked: false,
      item: newTask.trim(),
    };

    setItems([...items, newItem]);
    setNewTask("");
  };

  return (
    <main className="flex-grow-1 mt-5 pt-5">
      <p className="display-5 text-capitalize text-center mb-4">Let's add the task</p>
      <div className="container text-center d-flex align-items-center">
        <label className="me-2 mb-3 fw-bolder fs-5" htmlFor="newTask">
          TASK:
        </label>
        <input
          className="form-control mb-2"
          type="text"
          id="newTask"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="btn btn-secondary btn-sm text-light text-uppercase mx-4 mb-2 fs-6 fw-bolder"
          onClick={handleNewTask}
        >
          Add Task
        </button>
      </div>
      <div className="container text-center">
        {items.length > 0 ? (
          <ul className="list-group mt-4">
            {items.map((item) => (
              <li
                className="d-flex list-group-item list-group-item-action justify-content-between align-items-center"
                key={item.id}
              >
                <div className="d-flex align-items-center">
                  <input
                    className="me-1"
                    type="checkbox"
                    id={`check-${item.id}`}
                    checked={item.checked}
                    onChange={() => handleCheck(item.id)}
                  />
                  <label
                    className={item.checked ? "text-decoration-line-through" : ""}
                    htmlFor={`check-${item.id}`}
                  >
                    {item.item}
                  </label>
                </div>
                <button
                  className="btn btn-danger text-black"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrashAlt role="button" tabIndex="0" />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Your list is empty</p>
        )}
      </div>
    </main>
  );
};

export default Content;
