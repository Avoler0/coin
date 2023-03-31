import { Box,AppBar, Typography, Button  } from "@mui/material"
import { Link } from "react-router-dom"
import './header.css'


function Header(){

  return(
    <Box>
      <AppBar position="static">
        <div className="content">
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/coin?name=KRW-BTC">
              <h2>Coin</h2>
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to="/account/login">
              Login
            </Link>
          </Button>
        </div>
      </AppBar>
    </Box>
  )
}

export default Header