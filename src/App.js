import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sigin from './components/Sigin';
import Home from './components/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes exact>
        <Route path='/' element={<Sigin />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
