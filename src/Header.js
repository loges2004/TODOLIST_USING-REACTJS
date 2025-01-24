import React from 'react'

const Header = (props) => {
  return (
   
<header className='display-6 bg-primary text-white py-3 fixed-top'>
<div className='container text-center'>
  {props.title}
</div>
</header>
  )
}

export default Header