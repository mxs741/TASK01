import { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import MenuAppBar from './components/MenuAppBar'
import Auth from './components/Auth';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  const [state, setState] = useState<string | null>('false');

  useEffect(() => {
    const authValue = localStorage.getItem('auth');
    if (authValue) {
      setState(authValue as string);
    } else {
      localStorage.setItem('auth', 'false');
      setState('false');
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <MenuAppBar />
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/' element={<Table/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;