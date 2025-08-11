import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/User-Login/UserLogin";
import UserSignUp from "./components/User-SignUp/UserSignUp";
import UserHomepage from "./components/User-Homepage/UserHomepage";
import ViewAssessments from "./components/View-Assessments/ViewAssessments";
import Homepage from "./components/Homepage/Homepage";
import CreateAssessment from "./components/Create-Assessment/CreateAssessment";
import ForgotPassword from "./components/Forgot-Password/ForgotPass-Rion/Forgot-Password";
import ResetPass from "./components/Forgot-Password/ForgotPass-Rion/Reset-Password";

//-------------------------------------------Jords code--------------------------------------
import Inquiry from './pages/user_inquiry.tsx'
import AdminAccounts from './pages/a-accounts.tsx'
import AdminArchived from './pages/a-archived.tsx'
import AdminLogs from './pages/a-logs.tsx'
import UserProfile from './pages/user_account.tsx'
import AdminInbox from './pages/a-inbox.tsx'
import AdminDashboard from './pages/a-dashboard.tsx'
import AdminReport from './pages/a-report.tsx'
import UserSuggestion from './pages/suggestions.tsx'
import UserSuggCareer from './pages/sugg_car.tsx'
import UserSuggSchool from './pages/sugg_school.tsx'
import UserSuggCourses from './pages/sugg_course.tsx'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<UserLogin />}></Route>
        <Route path="/signup" element={<UserSignUp />}></Route>
        <Route path="/forgot" element={<ForgotPassword />}></Route>
        <Route path="/resetPass" element={<ResetPass />}></Route>
        <Route path="/home" element={<UserHomepage />}></Route>
        <Route path="/assessments" element={<ViewAssessments />}></Route>
        <Route path="/createAssessment" element={<CreateAssessment />}></Route>
        <Route path="/inquiry" element={<Inquiry />}></Route>
        <Route path="/ainbox" element={<AdminInbox />} />

        {/*----------------Jords-----------------*/}
        <Route path="/inquiry" element={<Inquiry/>}/>
        <Route path="/accounts" element={<AdminAccounts/>}/>
        <Route path="/archived" element={<AdminArchived/>}/>
        <Route path="/logs" element={<AdminLogs/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
        <Route path="/ainbox" element={<AdminInbox/>}/>
        <Route path="/areport" element={<AdminReport/>}/>
        <Route path="/adash" element={<AdminDashboard/>}/>
        <Route path="/suggestion" element={<UserSuggestion/>}/>
        <Route path="/suggestion/school" element={<UserSuggSchool/>}/>
        <Route path="/suggestion/career" element={<UserSuggCareer/>}/>
        <Route path="/suggestion/course" element={<UserSuggCourses/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
