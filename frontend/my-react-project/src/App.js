import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './Homepage';
import Matches from './Matches';
import Settings from './Settings';
import Navbar from './Navbar';



function App() {
  return (
    // <div className="App">
    //   <header className="App-header">

    //     <Navbar />
        
    //   </header>
    // </div>
    
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path = '/' exact />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/matches" element={<Matches />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
    </>

  );
}

export default App;

