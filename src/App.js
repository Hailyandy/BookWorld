
import './App.css';
import { useState } from 'react';
// import { Button } from 'antd';
import Login from './pages/Login/Login';
import User from './pages/User/User';
import Register from "./pages/Register/Register"

import HeaderLayout from './components/layout/Header';
import { HomePage } from './pages';
function App() {
  return (
    <div class="App">
      {/* <Register /> */}
      <Login />
      {/* <User /> */}
      {/* <HomePage /> */}
    </div>
  );
}

export default App;
