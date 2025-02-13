import React from 'react'

const Navbar = ({ onOpen, onSearch }) => {
  
  const handleSearchChange = (event) => {
    onSearch(event.target.value);
  }
  return (
    <div>
      <div className="navbar bg-base-100 flex bg-gray-700">
  <div >
    <a className="btn btn-ghost text-xl">FULL-STACK DEMO</a>
  </div>
  <div >
    <div className="form-control ml-5">
      <input type="text" placeholder="Search" onChange={handleSearchChange} className="input input-bordered w-24 md:w-auto" />
    </div>
    
              </div>
              <div className='ml-6'>
                  <button className="btn btn-info" onClick={onOpen}>Add Client</button>
  </div>
</div>
    </div>
  )
}

export default Navbar
