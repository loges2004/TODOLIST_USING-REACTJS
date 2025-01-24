import React from 'react'

const Footer = ({length}) => {
   
  return (


<footer className='display-6 bg-dark text-white py-3 mt-auto fixed-bottom'>

<div className='container text-center'>
  {length} Task List {length === 1 ? "item" :"items"}
</div>

    </footer>

  )
}

export default Footer