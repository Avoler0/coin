/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { naverLoginSetting } from "../../redux/user";

function NaverOuath(){
  const dispath = useDispatch();
  

  async function naverOauthHandler(){
    const {naver_id_login} = window as any
    const naver_login = new naver_id_login('MVyJw6uFVpXMPD8jKqy6','http://localhost:3000/oauth/naver')

    await axios.get('/v1/nid/me',{
      headers:{
        'Content-Type': 'application/xml',
        'Authorization': `Bearer ${naver_login.oauthParams.access_token}`,
        'X-Naver-Client-Id': 'MVyJw6uFVpXMPD8jKqy6',
        'X-Naver-Client-Secret': 'CpjP5KVBMT'
      }
    })
    .then((_res)=>{
      dispath(naverLoginSetting({..._res.data.response,token:naver_login.oauthParams.access_token}))

      window.location.href = "/"
    })

  }

  useEffect(()=>{
    naverOauthHandler()
  },[])

  return <div style={{color:'#fff'}}>잠시만 기다려주세요. 네이버 Oauth 로그인 중 입니다.</div>
}

export default NaverOuath;