import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { upbit_market } from "../types/upbit"

export interface MarketState{
  value:Array<upbit_market>
}

const initialState: MarketState = {
  value:[]
}


const marketSlice = createSlice({
  name:'Market',
  initialState,
  reducers: {
    marketPush:(state,action:PayloadAction) => {
      return action.payload;
    }
  }
})

export const {marketPush} = marketSlice.actions;

export default marketSlice.reducer;