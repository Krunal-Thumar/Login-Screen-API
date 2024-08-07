import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from './Components/Login/Login';
import Courses from './Components/Courses/Courses';
import './App.css';

/**
const App = () => {
  return (
    <div className="App">
      <Login />
    </div>
  );
};
*/

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/faculty/:username/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
};

export default App;