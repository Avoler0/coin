import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import CoinDetail from './component/coin/coinDetail';



const router = createBrowserRouter([
  {
    path: "/",
    element: <CoinDetail />,
  },
]);


function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
