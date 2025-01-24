import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';



function App() {
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

  const [search,setSearch] = useState('')

  return (
   <div>
<Header title="TODOLIST"/>
<Content 
 items={items.filter(item => (item.item.toLowerCase()).includes(search.toLowerCase()))}
  setItems={setItems}
  newTask={newTask}
  setNewTask={setNewTask}
  handleCheck={handleCheck} 
  handleDelete={handleDelete}
  handleNewTask={handleNewTask}
  search={search}
  setSearch={setSearch}
/>

<Footer length={items.length} />


   </div>
  )
}

export default App


