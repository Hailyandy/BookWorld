
import './App.css';
import { useState } from 'react';
import { Button } from 'antd';
import LoginPage  from './pages/Login/index';
import RegisterPage from "./pages/Register/index"
import UserPage from './pages/User/index'
import HeaderLayout from './components/layout/Header';
import HomePage from 'pages/Home';
import FristHomePage from 'pages/FristHome';
import UserHomePage from 'pages/UserHome';


function App() {
  return (
    <div class="App">
      {/* <FristHomePage/> */}
      {/* <RegisterPage /> */}
      {/* <LoginPage /> */}
      {/* <UserPage /> */}
      {/* <HomePage/> */}
      <UserHomePage/>
    </div>
  );
}

export default App;
