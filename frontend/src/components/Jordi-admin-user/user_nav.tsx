import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.jpg';
import './user_nav.css';

function UserNavBar() {
  const buttons = [
    { label: 'Home', path: '/home' },
    { label: 'Assessments', path: '/assessments' },
    { label: 'Suggestions', path: '/suggestion' },
    { label: 'Account', path: '/profile' },
    { label: 'Admin', path: '/adash' },
  ];

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#107F86', height: '73px' }}>
      <div className="container-fluid d-flex justify-content-between">
        <Link to="/home">
          <img src={Logo} alt="logo" style={{ width: 80, paddingRight: 10 }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {buttons.map((button, index) => (
              <li className="nav-item px-2" key={index}>
                <Link to={button.path} style={{ textDecoration: 'none' }}>
                  <a className="nav-link text-light">{button.label}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item px-2">
            <a className="nav-link text-light" href="/login">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default UserNavBar;
