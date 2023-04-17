import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  // const responseFunc = async () =>{
  //   const response = await fetch("http://127.0.0.1:8000/api/messages", {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json",
  //       // 'Content-Type': 'application/x-www-form-urlencoded',
  //     },
  //     body: JSON.stringify(data), // body data type must match "Content-Type" header
  //   });

  //   const products = await response.json();

  //   products.map((product)=>{
  //     console.log(product.text_message)
  //   })
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<Login/>}/>
        <Route path='/sign-up' element={<Register/>}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
