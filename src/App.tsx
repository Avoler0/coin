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
import KakaoOuath from './component/login/kakao';
import NaverOuath from './component/login/naver';


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
          <Route path="/oauth/kakao" element={<KakaoOuath />} />
          <Route path="/oauth/naver" element={<NaverOuath />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
