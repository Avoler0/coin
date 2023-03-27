import './coinDetail.css'
import React, { useState } from 'react'
import axios from 'axios'
import CoinGraph from './coinGraph';
import upbitApi from '../../hook/upbit-api';
import * as d3 from "d3";
import { isNegative} from '../../hook/const';

function CoinDetail(){
  const [chartData,setChartData] = useState<any>(null);
  const [lastPrice,setLastPrice] = useState(0);
  const chart_width = 900;
  const chart_height = 450;
  React.useEffect(()=>{
    upbitApi.candle.days('KRW-BTC',30)
    .then((_res:any)=>{
      const resData = _res.data.reverse();
      setChartData(resData)
    })
  },[])
  if(!chartData) return <div></div>
  
  const lastData = chartData[chartData.length - 1];
  console.log("프라이스",Math.round(lastData.change_price/lastData.trade_price * 100))
  return(
    <div className='coin-detail'>
      <div className='head'>
        <h2 className='name'>
          {lastData.market.split('-')[1]} / {lastData.market.split('-')[0]}
        </h2>
        <div className='info left'>
          <span>Last Price</span>
          <span className='number'>{lastData.trade_price.toLocaleString('ko-KR')}</span>
        </div>
        <div className={`info left ${isNegative(lastData.change_price) ? 'minus' : 'plus'}`}>
          <span>24H Change</span>
          <span className='number'>{lastData.change_price.toLocaleString('ko-KR')} {(lastData.change_price/lastData.trade_price * 100).toFixed(2)}%</span>
        </div>
        <div className='info right'>
          <span>24H High</span>
          <span className='number'>{lastData.high_price.toLocaleString('ko-KR')}</span>
        </div>
        <div className='info right'>
          <span>24H Low</span>
          <span className='number'>{lastData.low_price.toLocaleString('ko-KR')}</span>
        </div>
      </div>
      <CoinGraph chartData={chartData}/>
    </div>
  )
}


export default CoinDetail;