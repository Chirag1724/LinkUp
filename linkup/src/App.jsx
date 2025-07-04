import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PersonProfile from './pages/PersonHome';
import Signup from './pages/Signup';
import Events from './pages/Events';
import Internship from './pages/Internship';
import Alumini from './pages/Alumini';
import Profile from './pages/Profile';
import Techtalks from './pages/Techtalks';
import AddEvents from './pages/AddEvents';
import CreateJobs from './pages/CreateJobs';
import Login from './pages/Login';
import AlumniProfile from './pages/AluminiProfile';
import Chat from './pages/Chat';
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/person" element={<PersonProfile />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/events" element={<Events />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/alumini" element={<Alumini />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/techtalks" element={<Techtalks/>} />
        <Route path='/addevents' element={<AddEvents/>}/> 
        <Route path='/CreateJobs' element={<CreateJobs/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='aluminiProfile/:id'element={<AlumniProfile/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;