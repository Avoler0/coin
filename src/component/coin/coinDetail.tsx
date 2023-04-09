/* eslint-disable react-hooks/exhaustive-deps */
import './coinDetail.css'
import React, { useCallback } from 'react'
import CoinGraph from './coinGraph';
import upbitApi from '../../hook/upbit-api';
import * as d3 from "d3";
import { isNegative } from '../../hook/const';
import { Box, Grid, styled, TextField, Typography, Modal } from '@mui/material';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const tablet = useMediaQuery("(min-width:521px) and (max-width: 1025px)");
  const mobile = useMediaQuery("(max-width:520px)");
  const user = useSelector((state:any)=> state.user )
  const [scroll,setScroll] = React.useState(false);
  const [chartData,setChartData] = React.useState<any>(null);
  const [overData,setOverData] = React.useState<any>(null);
  const market = useSelector((state:any) => state.market)
  const [searchValue,setSearchValue] = React.useState('');
  const navigate = useNavigate();
  const location = useLocation();


  const handleScroll = useCallback((e:any) => {
    const scrollY = window.scrollY;
    
    if(scrollY <= 100){
      setScroll(false)
    }else{
      setScroll(true)
    }
  }, [])
  React.useEffect(()=>{
    if(!user.loginState){
      alert('로그인 후 이용해주세요.')
      window.location.href = "/account/login"
    }

    upbitApi.candleAll(location.search.split('=')[1],5)
    .then((_res:any)=>{
      setChartData(_res)
      setOverData(_res[0].data[0])
    })

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[location])
  
  if(!chartData) return <div></div>

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
      <div className='head-wrap'>
        <div className={`head ${scroll ? 'scroll' : null}`}>
          <div>
            <h2 className='name'>
              {location.search.split('=')[1]}
            </h2>
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
          </div>
          <div className='info'>
            <div className='left'>
              <span>시가</span>
              <span className='number'>{overData ? overData?.opening_price.toLocaleString('ko-KR') : ''}</span>
            </div>
            <div className={`left ${overData && isNegative(overData.change_price) ? 'minus' : 'plus'}`}>
              <span>고가</span>
              <span className='number'>{overData ?  overData?.high_price.toLocaleString('ko-KR') : ''}</span>
            </div>
            <div className={`right ${overData && isNegative(overData.change_price) ? 'minus' : 'plus'}`}>
              <span>저가</span>
              <span className='number'>{overData ? overData.low_price.toLocaleString('ko-KR') : ''}</span>
            </div>
            <div className={`right ${overData && isNegative(overData.change_price) ? 'minus' : 'plus'}`}>
              <span>종가</span>
              <span className='number'>{overData ? overData.trade_price.toLocaleString('ko-KR') : ''}</span>
            </div>
          </div>
        </div>
        
      </div>
      <Grid container className='graph-wrap' 
        justifyContent="space-between"
        >
            {chartData && chartData.map((data:any,i:number) => {
              return (
                <GridItem item style={{height:500}} key={i} xs={tablet ? 6 : mobile ? 12 : 3}>
                  <CoinGraph chartData={data.data} setOverData={setOverData} />
                  
                </GridItem>
              )
            })}
      </Grid>
    </div>
    
  )
  
}


export default CoinDetail;