import React from 'react';
import { useDispatch } from 'react-redux'
import {
  createBrowserRouter,
  Navigate,
  Route,
  Router,
  RouterProvider,
  Routes,
} from "react-router-dom";
import './App.css';
import CoinDetail from './component/coin/coinDetail';
import Header from './component/header/header';
import Login from './component/login/login';
import upbitApi from './hook/upbit-api';
import { marketPush } from './redux/market';


function App() {
  const dispatch = useDispatch();
  React.useEffect(()=>{
    upbitApi.market()
    .then((_res:any)=>{
      dispatch(marketPush(_res.data))
    })
  },[])
  React.useEffect(()=>{
    console.log(window.innerWidth)
  },[window])
  
  return (
    <>
      <Header/>
      <div className="App">
        <Routes>
          <Route path='/account/login' element={<Login/>} />
          <Route path='/coin' element={<CoinDetail/>} />
          <Route path="/" element={<Navigate replace to="/coin?name=KRW-BTC"/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
