import { persistReducer, persistStore } from 'reduxjs-toolkit-persist';
import userSlice from './user';
import marketSlice from './market';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from 'reduxjs-toolkit-persist/lib/storage'

const persistConfig = {
  key:'root',
  storage,
  whitelist:['user']
}

const rootReducers = combineReducers({
  market:marketSlice,
  user:userSlice
})


const store = configureStore({
  reducer:persistReducer(persistConfig,rootReducers)
})

export const persistore = persistStore(store)
export default store;