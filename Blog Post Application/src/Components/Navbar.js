import React, { useState } from 'react';

const Navbar = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark" style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' }}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img
              src="/images/logo.jpg"
              alt="logo"
              style={{ height: "30px" }}
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ color: "#fff" }}
            onClick={() => setShow(!show)}
          >
            <i className="fas fa-bars"></i>
          </button>
            <div className={`collapse navbar-collapse${show ? ' show' : ''}`} id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/" style={{ color: "#fff" }}>Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/addBlog" style={{ color: "#fff" }}>Add Blog</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/about" style={{ color: "#fff" }}>About</a>
                </li>
              </ul>
            </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
