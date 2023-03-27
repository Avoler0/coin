import axios from "axios"


const upbitApi = {
  candle:{
    minute:function(market:string, minute: number = 5, count: number = 13){
      return new Promise((resolve,reject)=>{
        axios.get(`https://api.upbit.com/v1/candles/minutes/${minute}?market=${market}&count=${count}`)
        .then((_res)=> resolve(_res))
        .catch((_error)=> reject(_error))
      })
    },
    days:function(market: string, count:number = 30){
      return new Promise((resolve,reject)=>{
        axios.get(`https://api.upbit.com/v1/candles/days?market=${market}&count=${count}`)
        .then((_res)=> resolve(_res))
        .catch((_error)=> reject(_error))
      })
    },
  }
}



export default upbitApi;