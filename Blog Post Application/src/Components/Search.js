import React from 'react'
import "../Components/css/search.css"


const Search = ({ handleSearch, searchValue, onInputChange }) => {
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        handleSearch();
      };
    
 
    return (
    <div className="searchForm">
        <form className="d-flex" onSubmit={handleSubmit}>
            <input 
                type= "search" 
                className="form-control"
                placeholder="Search Blog" 
                value={searchValue} 
                onChange={onInputChange}
                />&nbsp;
            <button type="submit" className="btn btn-primary">Search</button>
        </form>
    </div>
  );
};

export default Search
