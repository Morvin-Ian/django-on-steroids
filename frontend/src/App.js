import './App.css';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<Login/>}/>
        <Route path='/sign-up' element={<Register/>}/>
        <Route path='/chat/:uuid' element={<Home/>}/>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
