import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import './login.css'
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, makeStyles, ThemeProvider} from '@mui/material/styles';
import NaverIco from '../../image/login/naver_icon.png'
import KakaoImg from '../../image/login/kakaotalk_icon.png'
import axios from 'axios';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Coin Graph Site
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const naverRef = React.useRef<HTMLDivElement>(null);
  const redirect_url = 'http://localhost:3000/oauth/kakao';
  const kakao_api_id = '37e4e6a736e29a81b00c93698d6549e3'
  const kakao_auth_url = `https://kauth.kakao.com/oauth/authorize?client_id=${kakao_api_id}&redirect_uri=${redirect_url}&response_type=code`

  function initNaverOauth(){
    const {naver_id_login} = window as any
    const naver_login = new naver_id_login('NR61LLLoBLU2vcfbHvDY','http://localhost:3000/oauth/naver')
    const state = naver_login.getUniqState();
    naver_login.setButton('green',3,55)
    naver_login.setDomain('http://localhost:3000')
    naver_login.setState(state);
    naver_login?.init_naver_id_login();
  }
  
  React.useEffect(()=>{
    initNaverOauth();
  },[])

  function naverClick(){
    const naver = naverRef.current && naverRef.current.children[0] as HTMLElement;

    naver?.click();
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width:'350px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 , textAlign: 'center'}}>
            <div id='naver_id_login' ref={naverRef} /> 
            <Button
              variant="contained"
              fullWidth
              className='oauthBtn'
              sx={{ mt: 1, mb: 1 , padding:0 , width: 300, height: 45, backgroundColor: '#03C75A', ":hover": {
                bgcolor: "#03C75A",
              }}}
            >
              <div className='btnContent naver' onClick={naverClick}>
                <img src={NaverIco} alt="naver"/>
                <div className='text'>네이버 로그인</div>
              </div>
            </Button>
            <Link href={kakao_auth_url}>
              <Button
                variant="contained"
                fullWidth
                className='oauthBtn'
                sx={{ mt: 1, mb: 1 , padding:0, width: 300, height: 45, backgroundColor: '#FEE500', ":hover": {
                  bgcolor: "#FEE500",
                }}}
              >
                <div className='btnContent kakao'>
                  <img src={KakaoImg} alt="kakao"/>
                  <div className='text'>카카오 로그인</div>
                </div>
                  
              </Button>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Link>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}