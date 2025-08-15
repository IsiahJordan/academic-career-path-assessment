import { Routes, Route } from 'react-router-dom'
import GuestLayout from './layouts/GuestLayout'
import HomePage from './pages/HomePage'
import SignPage from './pages/SignPage'
import TestPage from './pages/TestPage'
import QuestionPage from './pages/QuestionPage'
import PerformancePage from './pages/PerformancePage'
import { useAuthToken } from './hooks/useAuthToken'
import './styles/app.css'


function App() {
  useAuthToken();

  return (
    <>
      <Routes>
        <Route element={<GuestLayout/>}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/sign" element={<SignPage/>}/>
          <Route path="/test" element={<TestPage/>}/>
          <Route path="/result" element={<PerformancePage/>}/>
          <Route path="/test/question/:questId" element={<QuestionPage/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App
