import './coinDetail.css'
import React from 'react'
import CoinGraph from './coinGraph';
import upbitApi from '../../hook/upbit-api';
import * as d3 from "d3";
import { isNegative} from '../../hook/const';
import CrossHair from './mouseCrossHair';
import { Autocomplete, Box, Container, Grid, styled, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { upbit_market } from '../../types/upbit';
import { AxiosResponse } from 'axios';
import { Router, useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';


type Mouse = {
  x:number
  y:number
}

const InputTextField = styled(TextField)({
  '& label': {
    // placeholder text color
    color: '#fff'
  },
  '& label.Mui-focused': {
    // 해당 input focus 되었을 때 placeholder text color
    // floatng label을 사용할 때 처리 필요하다
    color: 'var(--primary)',
  },
  '& label.Mui-error': {
    color: '#d32f2f',
  },
  '& .MuiOutlinedInput-root': { 
    color: '#fff',
    '& fieldset': {
      borderColor: '#fff',
    },
  'input': {
    color:'#fff',
  }
  },
});

function CoinDetail(){
  const svgRef = React.useRef(null);
  const [chartData,setChartData] = React.useState<any>(null);
  const [overData,setOverData] = React.useState<any>(null);
  const [mouseCoods,setMouseCoords] = React.useState<Mouse>({x:0,y:0});
  const market = useSelector((state:any) => state.market)
  const [searchValue,setSearchValue] = React.useState('');
  const [coinOption,setCoinOption] = React.useState('minute');
  const navigate = useNavigate();
  const location = useLocation();

  const chartOption:any = {
    width:990,
    height:500,
    margin:{
      top:20,
      right:55,
      bottom:30,
      left:60
    }
  }
  React.useEffect(()=>{
    upbitApi.candle(coinOption,location.pathname.split('/')[1],10)
    .then((_res:any)=>{
      const resData = _res.data.reverse();
      setChartData(resData)
      setOverData(resData[resData.length-1])
    })
  },[location,coinOption])

  if(!chartData) return <div></div>
  // console.log(overData)
  const lastData = chartData[chartData.length - 1];

  function mosueMoveInside(e:React.MouseEvent){
    setMouseCoords({
      x:
        e.nativeEvent.offsetX,
      y:
        e.nativeEvent.y -
        Math.round(e.currentTarget.getBoundingClientRect().top)
    })
  }

  function mouseLeave(){
    setMouseCoords({
      x: 0,
      y: 0
    });
  };
  
  function searchSubmit(e:React.FormEvent){
    e.preventDefault();
    console.log(searchValue)
    const result:any = market.filter((data:any)=> data.korean_name.includes(searchValue))
    console.log(result)
    if(result[0]){
      navigate(`/${result[0].market}`)
    }
  }
  return(
    <div className='coin-detail'>
      
      <div className='head'>
        <div>
          <h2 className='name'>
            {lastData.market.split('-')[1]} / {lastData.market.split('-')[0]}
          </h2>
        </div>
        <div className='info left'>
          <span>시가</span>
          <span className='number'>{overData ? overData?.opening_price.toLocaleString('ko-KR') : ''}</span>
        </div>
        <div className={`info left ${isNegative(overData.change_price) ? 'minus' : 'plus'}`}>
          <span>고가</span>
          <span className='number'>{overData ?  overData?.high_price.toLocaleString('ko-KR') : ''}</span>
        </div>
        <div className='info right'>
          <span>저가</span>
          <span className='number'>{overData ? overData.low_price.toLocaleString('ko-KR') : ''}</span>
        </div>
        <div className='info right'>
          <span>종가</span>
          <span className='number'>{overData ? overData.trade_price.toLocaleString('ko-KR') : ''}</span>
        </div>
        
      </div>
      <form className='search-form'
        onSubmit={searchSubmit}
      >
            <InputTextField
              label="코인 검색"
              variant="standard"
              size="small"
              margin='normal'
              sx={{
                ' .MuiOutlinedInput-root': {
                    color: 'white',
                      border: '1px solid red',
                  },
              }}
              onChange={(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchValue(event.target.value)}
            />
      </form>

      <Container maxWidth="lg" className='graph-wrap'>
        <div className='chart-option'>
          <ButtonGroup size='small' color="secondary">
            <Button onClick={() => setCoinOption('minute')}>
              <span>M</span>
            </Button>
            <Button onClick={() => setCoinOption('days')}>
              <span>D</span>
            </Button>
            <Button onClick={() => setCoinOption('weeks')}>
              <span>W</span>
            </Button>
          </ButtonGroup>
        </div>
        <svg ref={svgRef} onMouseMove={mosueMoveInside} onMouseLeave={mouseLeave}
          viewBox="0,0,990,500"
        >
          <CoinGraph chartData={chartData} setOverData={setOverData} svgRef={svgRef} chartOption={chartOption}/>
          <CrossHair mouseCoods={mouseCoods} overData={overData} chartOption={chartOption}/>
        </svg>
      </Container>
      
    </div>
  )
}


export default CoinDetail;