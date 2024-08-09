import React from 'react';
import './App.css';
import User from './Components/Testing/User';

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
    // <Router>
    //   <Routes>
    //     <Route path="/" exact element={<Login />} />
    //     <Route path="/faculty/:username/courses" element={<Courses />} />
    //   </Routes>
    // </Router>
    <div className='App'>
      <User />
    </div>
  );
};

export default App;