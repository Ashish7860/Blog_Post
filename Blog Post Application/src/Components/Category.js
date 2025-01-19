import React from 'react';

const Category = ({ handleCategory, options }) => {
  const categoryStyle = {
    position: 'fixed',
    top: '80px',
    right: '20px',
    zIndex: '999',
    width: '200px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    padding: '15px',
  };

  const titleStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  };

  return (
    <div style={categoryStyle}>
      <div>
        <h4 style={titleStyle}>Categories</h4>
        <ul className="list-group list-group-flush">
          {options.map((item, index) => (
            <li
              key={index}
              className="list-group-item"
              style={{ cursor: 'pointer', fontSize: '18px' }}
              onClick={() => handleCategory(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
