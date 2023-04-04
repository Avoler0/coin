import storage from 'reduxjs-toolkit-persist/lib/storage'
import { createSlice } from "@reduxjs/toolkit"

export interface LoginState{
  loginState:boolean
  type:string
  nickName:string
  token:string
}

export interface KakaoLoginPayload{
  type:string
  payload:{
    nickname:string,
    token:string
  }
}

export interface NaverLoginPayload{
  type:string
  payload:{
    nickname:string,
    token:string
    id:string
    name:string
  }
}
const initialState: LoginState = {
  loginState:false,
  type:'',
  nickName:'',
  token:''
}


const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    naverLoginSetting:(state:LoginState,action:NaverLoginPayload) => {
      console.log(action.payload)
      state.loginState = true;
      state.type = 'naver'
      state.nickName = action.payload.name;
      state.token = action.payload.token;
    },
    kakaoLoginSetting:(state:LoginState,action:KakaoLoginPayload) => {
      console.log(action.payload)
      state.loginState = true;
      state.type = 'kakao'
      state.nickName = action.payload.nickname;
      state.token = action.payload.token;
    },
    logout:() => {
      storage.removeItem('persist:root')
      return initialState;
    }
  }
})

export const {naverLoginSetting,kakaoLoginSetting,logout} = userSlice.actions;

export default userSlice.reducer;