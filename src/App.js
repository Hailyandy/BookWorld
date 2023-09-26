// import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

import { Button } from 'antd';
import HeaderLayout from './components/layout/Header';
import { HomePage } from './pages';
function App() {
  return (
    <div class="App">
      <HomePage />
    </div>
  );
}

export default App;
