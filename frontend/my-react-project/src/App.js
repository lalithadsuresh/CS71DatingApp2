import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import Matches from './components/Matches';
import Settings from './components/Settings';
import Profile from './components/Profile';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import AuthenticatePage from './components/AuthenticatePage';
import Form from './components/Form';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';


function App() {
  return (

    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' exact />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/registration" element={<AuthenticatePage />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>

  );
}

export default App;

