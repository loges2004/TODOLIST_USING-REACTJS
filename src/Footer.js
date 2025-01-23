import React from 'react'

const Footer = () => {
    const year= new Date();
  return (


<footer className='display-6 bg-dark text-white py-3 mt-auto fixed-bottom'>
<div className='container text-center'> 
copyright &copy;{year.getFullYear()}
</div>


    </footer>

  )
}

export default Footer