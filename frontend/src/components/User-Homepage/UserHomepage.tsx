import "./UserHomepage.css"
import Image from "../Images/Image"
import { Link,} from "react-router-dom"
import Navbar from "../Navbar/navbar"
import { useUser } from '../User-Context/UserContext';


const UserHomepage = () => {
  const { userData } = useUser();
  
  
  

  return (
    <div>
    <Navbar/>
    <body>
    
      <div className="first-content">
        <div className="first-left-content">
        <Image imageUrl={"./src/images/first-cont.png"}/>
          </div>
          
            <div className="first-right-content">
            <h3>Welcome, {userData?.firstname} {userData?.lastname}!</h3>
            <h1> Unlock Your Future: Navigate Your Career Journey with Confidence!</h1>
              <p>Welcome to Career Path Assessment, where we<br/>believe that the key to 
              a fulfilling and successful<br/>future begins with understanding your unique<br/>career path.</p>
              <div className="homepageButton">
              <Link to="/assessments"  ><button type="button" className="btn btn-primary px-4 py-2">Get Started!</button></Link>
              </div>
            </div>
        </div>

      <div className="second-content">
        <div className="second-left-content">
          <h1>Academic Career Path<br/>Assessment</h1>
            </div>
              <div className="second-right-content">
              <p>Embark on a clear path towards academic success comprehensive evaluation helps students<br/> 
            and professionals navigate their educational journey by identifying strengths, and interest.<br/> 
            From choosing the right major to mapping out career trajectories.</p>
              </div>
          </div>

      <div className="third-content">
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
      <div className="footer-container">

      </div>
    </footer>
    </div>
  )
}

export default UserHomepage