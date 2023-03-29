import marketSlice from './market';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer:{
    market:marketSlice
  },
})


export default store;