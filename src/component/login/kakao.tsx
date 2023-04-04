import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { kakaoLoginSetting } from "../../redux/user";





function KakaoOuath(){
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect_url = 'http://localhost:3000/oauth/kakao';
  const kakao_api_id = '37e4e6a736e29a81b00c93698d6549e3'
  async function kakaoOauthHandler(){
    const code = location.search.split('=')[1];
    console.log(code)
    await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakao_api_id}&redirect_uri=${redirect_url}&code=${code}`,{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }
    )
    .then(async (_res)=>{
      const ACCESS_TOKEN = _res.data.access_token;

      
      const response = await axios.get('https://kapi.kakao.com/v2/user/me',
      {
        headers:{
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      dispatch(kakaoLoginSetting({...response.data.kakao_account.profile,token:ACCESS_TOKEN}))
      
      window.location.href = "/"
    })
    
  }
  useEffect(()=>{
    kakaoOauthHandler()
  },[])
  return <div style={{color:'#fff'}}>잠시만 기다려주세요. 카카오 Oauth 로그인 중 입니다.</div>
}

export default KakaoOuath;