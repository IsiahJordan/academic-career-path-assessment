import { Link } from 'react-router-dom';

const AdminNav = () => {
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
              <li className="nav-item">
                <Link to="/adash" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/areport" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Reports
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/createAssessment" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Assessment
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/accounts" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Accounts
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/logs" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Logs
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/ainbox" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Inbox
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/archived" style={{ textDecoration: 'none' }} className="nav-link text-light">
                  Archive
                </Link>
              </li>
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

export default AdminNav;
