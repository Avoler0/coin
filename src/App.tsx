import React from 'react';
import { useDispatch } from 'react-redux'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import CoinDetail from './component/coin/coinDetail';
import upbitApi from './hook/upbit-api';
import { marketPush } from './redux/market';


const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: ":coin",
        element: <CoinDetail />,
      },
    ]
  },
]);


function App() {
  const dispatch = useDispatch();
  React.useEffect(()=>{
    upbitApi.market()
    .then((_res:any)=>{
      console.log(_res)
      dispatch(marketPush(_res.data))
    })
  },[])
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
