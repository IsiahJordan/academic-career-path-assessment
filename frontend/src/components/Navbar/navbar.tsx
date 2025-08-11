import { Link } from 'react-router-dom';
import { useUser } from '../User-Context/UserContext';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [showAdminNav, setShowAdminNav] = useState(false);
  const { userData } = useUser();

  
  useEffect(() => {
    if (userData?.role == "admin") {
      setShowAdminNav(true);
    } else {
      setShowAdminNav(false);
    }
  }, [userData]);

  

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-between">
          <Link to="/home">
            <img src="./src/images/btn-logo@2x.png" style={{ width: 80, paddingRight: 10 }} />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link to="/home" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/assessments" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Assessments
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/suggestion" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Suggestions
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/profile" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Account
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link to="/inquiry" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Inquiry
                </Link>
              </li>
              {showAdminNav && ( // Conditionally render admin link
                <li className="nav-item px-2">
                  <Link to="/adash" style={{ textDecoration: 'none' }} className="nav-link text-light">
                    Admin
                  </Link>
                </li>
              )}
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
    </div>
  );
};

export default Navbar;
