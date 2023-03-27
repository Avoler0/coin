

export interface upbit_candle_minute{
  candle_acc_trade_price:number
  candle_acc_trade_volume:number
  candle_date_time_kst:string
  candle_date_time_utc:string
  high_price:number
  low_price:number
  market:string
  opening_price:number
  timestamp:number
  trade_price:number
  unit:number
}

export interface upbit_candle_days extends upbit_candle_minute{
  chang_price: number
  change_rate: number
  prev_closing_price: number
}