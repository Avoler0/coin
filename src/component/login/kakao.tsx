import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";





function KakaoOuath(){
  const location = useLocation();
  const redirect_url = 'http://localhost:3000/oauth/kakao';
  const kakao_api_id = '37e4e6a736e29a81b00c93698d6549e3'
  async function kakao(){
    const code = location.search.split('=')[1];
    console.log(code)
    const result = await axios.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakao_api_id}&redirect_uri=${redirect_url}&code=${code}`,{
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      }
    )
    .then((_res)=>{
      const ACCESS_TOKEN = _res.data.access_token;

      return axios.get('https://kapi.kakao.com/v2/user/me',
      {
        headers:{
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
    })
    console.log(result)
  }
  useEffect(()=>{
    kakao()
  },[])
  return <div style={{color:'#fff'}}>잠시만 기다려주세요. 카카오 Oauth 로그인 중 입니다.</div>
}

export default KakaoOuath;