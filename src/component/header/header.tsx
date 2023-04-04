import { Box,AppBar, Typography, Button, Menu, MenuItem, Fade } from "@mui/material"
import { Link } from "react-router-dom"
import './header.css'
import { useSelector } from "react-redux"
import React from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../redux/user"


function Header(){
  const dispatch = useDispatch();
  const [loginMenu,setLoginMenu] = React.useState<null | HTMLElement>(null);
  const open = Boolean(loginMenu);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setLoginMenu(event.currentTarget);
  };
  const handleClose = () => {
    setLoginMenu(null);
  };
  const user = useSelector((state:any)=>{
    return state.user
  })

  return(
    <Box>
      <AppBar position="static">
        <div className="content">
          <Typography variant="h6" component="div">
            <Link to="/coin?name=KRW-BTC">
              <h2>Coin</h2>
            </Link>
          </Typography>
            <Box component="div" className="user-info">
              {
                user.loginState ? 
                <>
                  <Button color="inherit"
                    onClick={handleClick}
                  >
                    {user.nickName} 님
                  </Button>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      'aria-labelledby': 'fade-button',
                    }}
                    anchorEl={loginMenu}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={()=>{dispatch(logout())}}>Logout</MenuItem>
                  </Menu>
                </>
                :
                <Button color="inherit">
                  <Link to="/account/login">
                    Login
                  </Link>
                </Button>
              }
            </Box>
        </div>
      </AppBar>
    </Box>
  )
}

export default Header