import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import apiRequest from "./apiRequest";
function App() {
  const API_URL = "http://localhost:3500/items";

  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("todo_list");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Data not received from Server");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => {
      fetchItems();
    }, 100);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo_list", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (items.length === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [items]);

  const handleCheck = async  (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);

    const myItem = updatedItems.filter((item ) => item.id === id )
    const reqUrl = `http://localhost:3500/items/${id}`;      const updateOption ={
      method:"PATCH",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify({checked:myItem[0].checked})
    } 
    console.log("Sending DELETE request to:", reqUrl);
    const result = await apiRequest(reqUrl,updateOption);
    

  if (result) {
    console.error("Delete request failed:", result);
    setFetchError(result);
  } else {
    console.log("Delete successful");
  }

  };

  const handleDelete = async (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  
    if (updatedItems.length === 0) {
      Swal.fire({
        icon: "info",
        title: "List is Empty",
        text: "You have no tasks left!",
        confirmButtonText: "OK",
      }).then(() => {
        setTimeout(() => {
          inputRef.current.focus();
        }, 100);
      });
    }
  
    const reqUrl = `http://localhost:3500/items/${id}`;      console.log("Sending DELETE request to:", reqUrl);
    const deleteOption = {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    const result = await apiRequest(reqUrl, deleteOption);
  
    if (result) {
      setFetchError(result);
    } else {
      console.log("Delete successful");
    }
  };
  

  const handleNewTask = async () => {
    if (!newTask.trim()) {
      Swal.fire({
        title: "Empty Task",
        icon: "warning",
        text: "Please enter a valid task!",
        confirmButtonText: "OK",
      });
      return;
    }
const randId=items.length ? items[items.length - 1].id +1 : 1;
    const newItem = {
      id:randId,  
      checked: false,
      item: newTask.trim(),
    };

    setItems([...items, newItem]);
    const postOption ={
      method:"POST",
      headers:{
        'content-type':'application/json'
      },
      body: JSON.stringify(newItem)
    } 
    const result = await apiRequest(API_URL,postOption);
    if(result){
   setFetchError(result)
    }
    setNewTask("");
  };

  function handleReload(){
    window.location.reload();
  }

  return (
    <div>
      <Header title="TODOLIST" />
      <main>
        {fetchError && (
          <div
            className="alert alert-danger alert-dismissible fade show text-center"
            role="alert"
          >
            {fetchError}
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={handleReload}
            ></button>
          </div>
        )}
        
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            setItems={setItems}
            newTask={newTask}
            setNewTask={setNewTask}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleNewTask={handleNewTask}
            search={search}
            setSearch={setSearch}
            inputRef={inputRef}
            isLoading={isLoading}
            fetchError={fetchError}
          />
        
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;
