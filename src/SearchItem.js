import React from 'react'

const SearchItem = ({search,setSearch}) => {



return (
   <form action="" className=' container text-center d-flex align-items-center mt-4' onSubmit={(e) => e.preventDefault()}>
<label className='fw-bolder fs-5 me-2' htmlFor="search">Search:</label>
<input className='form-control w-100' type="text" name="search" id="search" role='searchbox' placeholder='search items' value={search} onChange={(e) => setSearch(e.target.value)} />
   
   
   </form>
  )
}

export default SearchItem