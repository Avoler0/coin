import { useLocation } from "react-router-dom";

function NaverOuath(){
  const location = useLocation();

  return <div style={{color:'#fff'}}>잠시만 기다려주세요. 네이버 Oauth 로그인 중 입니다.</div>
}

export default NaverOuath;