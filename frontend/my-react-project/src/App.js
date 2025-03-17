import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import Matches from './components/Matches';
import Settings from './components/Settings';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import AuthenticatePage from './components/AuthenticatePage';


function App() {
  return (

    <main className='column'>
      <AuthenticatePage />

    </main>
  );
}

export default App;

