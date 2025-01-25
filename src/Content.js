import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import SearchItem from "./SearchItem";

const highlighText = (text,search) =>{
if(!search) 
  return text
const regex = new RegExp(`(${search})`,"gi");
const parts = text.split(regex);

return parts.map((part,index) => 
  regex.test(part) ? (
    <span key={index} style={{backgroundColor:"yellow"}}>{part}</span>
  ) : (part)
);

};
const Content = ({ items, setItems, newTask, setNewTask, handleCheck, handleDelete, handleNewTask,search,setSearch })=> {
 
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
          placeholder="Enter the new task to add to the list"
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="btn btn-secondary btn-sm text-light text-uppercase mx-4 mb-2 fw-bolder w-50 h-25"
          onClick={handleNewTask}
        >
          Add Task
        </button>
      </div>

      <SearchItem search={search} setSearch={setSearch}/>
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
                  {highlighText(item.item  ,search)}
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
