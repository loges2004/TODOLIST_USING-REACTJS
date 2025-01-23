import React from 'react'
import { useState } from 'react';
import { FaTrashAlt } from "react-icons/fa";


const Content = () => {
  

const [items,setItems] =useState(
  [{
id:1,
checked:true,
item:"leetcode"
  },{
  id:2,
checked:true,
item:"coding challenge"},
{
id:3,
checked:false,
item:"ai course"
}
]);


const handleCheck = (id) =>{
  const listitem = items.map((item) => item.id === id ? {...item,checked:!item.checked}: item)
setItems(listitem)
}

const handleDelete = (id) => {
  const updatedItems = items.filter((item) => item.id !== id);
  setItems(updatedItems);
};

  return (
    <main className='flex-grow-1 mt-5 pt-5'>
      <p className='display-5 text-capitalize text-center mb-4'>lets add the task</p>
      <div className='container text-center d-flex  align-items-center'>
        <label className='me-2 mb-3 fw-bolder fs-5' htmlFor="">TASK:</label>
        <input className='form-control mb-2 ' type="text" />
        <button className='btn btn-secondary btn-sm text-light text-uppercase mx-4 mb-2 fs-6 fw-bolder'>Addtask</button>
      </div>
      <div className='container text-center'>
        <ul className='list-group mt-4'>
            {items.map((item)=>{
              return(
              <li className='d-flex list-group-item list-group-item-action justify-content-between align-items-center' key={item.id}>
                <div className='d-flex align-items-center'>
                <input className='me-1' type="checkbox" id={`check-${item.id}`} checked={item.checked}
                onChange={()=> handleCheck(item.id)}
                />
                <label htmlFor={`check-${item.id}`}>{item.item}</label>                </div>
                <button className="btn btn-danger text-black" onClick={() => handleDelete(item.id) }><FaTrashAlt 
                role='button'
                tabIndex="0"
                /></button>

              </li>
            );
            })}
    
        </ul>

      
      </div>
      
    </main>
  ) 
}
 
export default Content