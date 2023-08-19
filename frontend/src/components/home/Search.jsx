import React from 'react'

const input = {
    width: "90%",
    padding: "10px",
    marginBottom: "15px",
    border: "none",
    borderBottom: "1px solid #ccc",
    borderRadius: 0, /* No border-radius to avoid issues with bottom border */
    outline: "none", /* Remove default focus outline */
}

const Search = () => {
  return (
    <div className='search'>
        <div className="search-form">
            <input style={input} type="text" placeholder='Search'/>
        </div>

    </div>
  )
}

export default Search