import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import Matches from './components/Matches';
import Profile from './components/Profile';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import AuthenticatePage from './components/AuthenticatePage';
import Registration from './components/Registration';
import DecidingPage from './components/DecidingPage';
import Form from './components/Form';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path = "/" element={<DecidingPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<AuthenticatePage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>

  );
}

export default App;

