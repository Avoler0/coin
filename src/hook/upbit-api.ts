import axios from "axios"


const upbitApi = {
  market:function(){
    return new Promise((resolve,reject)=>{
      axios.get(`https://api.upbit.com/v1/market/all`)
      .then((_res)=> resolve(_res))
      .catch((_error)=> reject(_error))
    })
  },
  candle:function(type:string,market:string,count:number){
    const baseUrl = switchResult(type,market,count);

    return new Promise((resolve,reject)=>{
        axios.get(`${baseUrl}`)
        .then((_res)=> resolve(_res))
        .catch((_error)=> reject(_error))
      })
  },
}

function switchResult(type:string,market:string,count:number){
  switch(type){
    case 'minute':
      return `https://api.upbit.com/v1/candles/minutes/5?market=${market}&count=${count}`
    case 'days':
      return `https://api.upbit.com/v1/candles/days?market=${market}&count=${count}`
    case 'weeks':
      return `https://api.upbit.com/v1/candles/weeks?market=${market}&count=${count}`
    case 'month':
      return `https://api.upbit.com/v1/candles/months?market=${market}&count=${count}`
  }
}
// const candleRead = {
//     minute:function(market:string, count: number = 30){
//       return new Promise((resolve,reject)=>{
//         axios.get(`https://api.upbit.com/v1/candles/minutes/5?market=${market}&count=${count}`)
//         .then((_res)=> resolve(_res))
//         .catch((_error)=> reject(_error))
//       })
//     },
//     days:function(market: string, count:number = 30){
//       return new Promise((resolve,reject)=>{
//         axios.get(`https://api.upbit.com/v1/candles/days?market=${market}&count=${count}`)
//         .then((_res)=> resolve(_res))
//         .catch((_error)=> reject(_error))
//       })
//     },
//     week:function(market: string, count:number = 30){
//       return new Promise((resolve,reject)=>{
//         axios.get(`https://api.upbit.com/v1/candles/weeks?market=${market}&count=${count}`)
//         .then((_res)=> resolve(_res))
//         .catch((_error)=> reject(_error))
//       })
//     },
//     month:function(market: string, count:number = 30){
//       return new Promise((resolve,reject)=>{
//         axios.get(`https://api.upbit.com/v1/candles/months?market=${market}&count=${count}`)
//         .then((_res)=> resolve(_res))
//         .catch((_error)=> reject(_error))
//       })
//     },
// }


export default upbitApi;