import "./Homepage.css";
import Image from "../Images/Image";
import { Link } from "react-router-dom";

const UserHomepage = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
  <div className="container-fluid">
  <img src="./src/images/btn-logo@2x.png" style={{width:80, paddingRight:10}}/>
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
      <ul className="navbar-nav ms-auto" >
        <div className="collapse2 navbar-collapse" id="navbarNav">
          <li className="nav-item px-2">
            <Link to="/login" style={{ textDecoration: "none" }}>
              <a
                className="nav-link text-light"
                aria-current="page"
                href="#"
              >
                Log in
              </a>
            </Link>
          </li>
          <li className="nav-item px-2">
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <a
                className="nav-link text-light"
                aria-current="page"
                href="#"
              >
                Sign Up
              </a>
            </Link>
          </li>
        </div>
      </ul>
    </div>
  </div>
</nav>

      <body>
        <div className="first-content-home">
          <div className="first-left-content-home">
            <Image imageUrl={"./src/images/first-cont.png"} />
          </div>
          <div className="first-right-content-home">
            <h1>
              Unlock Your Future: Navigate Your Career Journey with Confidence!
            </h1>
            <p>
              Welcome to Career Path Assessment, where we
              <br />
              believe that the key to a fulfilling and successful
              <br />
              future begins with understanding your unique
              <br />
              career path.
            </p>
            <div className="homepageButton">
              <Link to="/login">
                <button type="button" className="btn btn-primary px-4 py-2">
                  Get Started!
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="second-content-home">
          <div className="second-left-content-home">
            <h1>
              Academic Career Path
              <br />
              Assessment
            </h1>
          </div>
          <div className="second-right-content-home">
            <p>
            Embark on a clear path towards academic success comprehensive evaluation helps students<br/> 
            and professionals navigate their educational journey by identifying strengths, and interest.<br/> 
            From choosing the right major to mapping out career trajectories.
            </p>
          </div>
        </div>

        <div className="third-content-home">
        <div className="step-1">
        <div className="card">
          <div className="card-header">
            <h5>Mathematics</h5>
          </div>
          <div className="card-body">
            <h6 className="card-title">Unravel</h6>
            <p className="card-text">Explore the beauty of numbers, shapes, and equations that unveil the secrets of our world.</p>
            
          </div>
        </div>
        </div>
        <div className="step-2">
        <div className="card">
          <div className="card-header">
            <h5>Science</h5>
          </div>
          <div className="card-body">
            <h6 className="card-title">Unveil</h6>
            <p className="card-text">Delve into the wonders of the natural world,<br/> from the microscopic to the cosmic, fuel up our understanding of the universe</p>
            
          </div>
        </div>
        </div>
        <div className="step-3">
        <div className="card">
          <div className="card-header">
            <h5>English</h5>
          </div>
          <div className="card-body">
            <h6 className="card-title">Dive in</h6>
            <p className="card-text"> Crafting Ideas, Expressing Perspectives, and <br/> Connecting Humanity. where words become bridges between minds and cultures</p>
          </div>
        </div>
        </div>
      </div>
      </body>
      <footer>
        <div className="footer-container"></div>
      </footer>
    </div>
  );
};

export default UserHomepage;
