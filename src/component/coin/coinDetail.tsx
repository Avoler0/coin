import './coinDetail.css'
import React from 'react'
import CoinGraph from './coinGraph';
import upbitApi from '../../hook/upbit-api';
import * as d3 from "d3";
import { isNegative, windowType, windowWidthType} from '../../hook/const';
import { Container, createTheme, Grid, styled, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import useMediaQuery from '@mui/material/useMediaQuery';


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
const GridItem = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    xs:12
  },
  [theme.breakpoints.up('sm')]: {
    xs:12
  },
  [theme.breakpoints.up('md')]: {
    xs:12
  }
  
}));
function CoinDetail(){
  const desktop = useMediaQuery("(min-width:1400px)")
  const tablet = useMediaQuery("(min-width:520px) and (max-width: 1400px)");
  const mobile = useMediaQuery("(max-width: 520px)");

  console.log(desktop,tablet,mobile)
  const [chartData,setChartData] = React.useState<any>(null);
  const [overData,setOverData] = React.useState<any>(null);
  const market = useSelector((state:any) => state.market)
  const [searchValue,setSearchValue] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [windowSize,setWindowSize] = React.useState('desktop');
  const gridOption:any = {
    desktop:{
      xs:12,
    },
    tablet:{
      xs:12
    },
    mobile:{
      xs:12
    }
  }
  console.log(windowSize)
  React.useEffect(()=>{
    upbitApi.candleAll(location.search.split('=')[1],5)
    .then((_res:any)=>{
      setChartData(_res)
      setOverData(_res[0].data[0])
    })

    setWindowSize(windowWidthType()!)
  },[location])
  
  if(!chartData) return <div></div>

  const lastData = chartData[chartData.length - 1];

  
  
  function searchSubmit(e:React.FormEvent){
    e.preventDefault();
    const result:any = market.filter((data:any)=> data.korean_name.includes(searchValue))
    
    if(result[0]){
      navigate(`/coin?name=${result[0].market}`)
    }else{
      alert("관련 검색어가 없습니다.")
    }
  }
  
  return(
    <div className='coin-detail'>
      <div className='head'>
        <div>
          <h2 className='name'>
            {location.search.split('=')[1]}
          </h2>
        </div>
        <div className='info left'>
          <span>{overData && overData?.candle_date_time_kst}</span>
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
      <Grid container className='graph-wrap' 
        justifyContent="space-between"
        >
            {chartData.map((data:any,i:number) => {
              return (
                <GridItem item style={{height:600}} key={i}>
                  <CoinGraph chartData={data.data} setOverData={setOverData} />
                  
                </GridItem>
              )
            })}
      </Grid>
      
      
      {/* <CrossHair mouseCoods={mouseCoods} overData={overData} chartOption={chartOption} /> */}
      {/* <div className='chart-option'>
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
            <Button onClick={() => setCoinOption('month')}>
              <span>M</span>
            </Button>
          </ButtonGroup>
        </div> */}
    </div>
    
  )
  
}


export default CoinDetail;