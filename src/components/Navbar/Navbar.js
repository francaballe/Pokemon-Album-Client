import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import DarkMode from '@mui/icons-material/DarkMode';
import Inventory from "@mui/icons-material/Inventory";
import LightMode from '@mui/icons-material/LightMode';
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchAppBar from '../Navbar/SearchAppBar/SearchAppBar';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { resetUserInformation } from "../../redux/actions/index";



const settings = [/* 'Profile', 'Account', 'Dashboard',  */'Logout'];

function Navbar({setDarkLight, onSearch}) {

  const userData = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [darkMode,setDarkMode] = React.useState("light")


  //funcion que viene de props
  React.useEffect(()=>{
    setDarkLight(darkMode)
  },[darkMode])  


/********************************************************HANDLERS************************************************************/

  function lightDarkClickHandler (){
    if (darkMode==="light") setDarkMode("dark")
    else setDarkMode("light")
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleSelectedUserMenuOption (setting){
    //console.log("hice click aca, ahora si:",setting)
    if (setting==="Logout") {
      dispatch(resetUserInformation());
    }
    setAnchorElUser(null);
  }

  function handleBackToMain (){
    navigate(`/pokemons`);
  }

  function contactUsHandler (){
    navigate(`/contactus`);
  }

  function inventoryDetailsHandler(){
    navigate(`/inventorydetails`);
  }

  /****************************************************************************************************************************/


  return (
    <div>
    <AppBar position="relative">
  
        <Toolbar sx={{ pt: 0, justifyContent:"space-between" }}>

        <Box>
          <Tooltip title="Home" sx={{mr:2}}>
              <IconButton size="medium" color="secondary" onClick={handleBackToMain}
              sx={{
              mr:2,
              border: "2px solid",
              borderColor: "secondary.main"
              }}
              >
                <CatchingPokemonTwoToneIcon/>
              </IconButton>
          </Tooltip>

          <Tooltip title="Report any issues or leave a nice comment" sx={{mr:30}}>
              <Button variant="contained" startIcon={<ContactMailIcon/>} onClick={contactUsHandler} color='secondary'>
                  Contact Us
              </Button>
          </Tooltip>    
        </Box>

        <SearchAppBar onSearch={onSearch}/>
      
        <Box /* sx={{mr:5}} */>
          <Tooltip title="Dark/Ligth Mode" sx={{mr:2}}>
              <Button variant="contained" onClick={lightDarkClickHandler} startIcon={darkMode==="dark" ? <DarkMode/> : <LightMode/>}
                color='secondary'>{darkMode==="dark" ? "DARK" : "LIGTH"}
              </Button>
          </Tooltip>    
          <Tooltip title="Envelopes you haven't opened yet" sx={{mr:2}}>
          <Badge badgeContent={userData.unopenedenvelopes===0 ? "0" : userData.unopenedenvelopes} color="error">
            <Button variant="contained" startIcon={<Inventory/>} onClick={inventoryDetailsHandler} color='secondary'>
                Inventory
            </Button>
          </Badge>    
          </Tooltip>
          <Tooltip title="Buy new figurine envelopes" sx={{mr:2}}>
              <Button variant="contained" startIcon={<ShoppingCart/>} color='secondary'>
                Shopping
              </Button>
          </Tooltip>

          <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 1 }}>
                <Avatar alt={userData.name} src={userData.picture? userData.picture : " "} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={()=>handleSelectedUserMenuOption(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>

        </Box>

        </Toolbar>

    </AppBar>
    
    <Outlet/>
    </div>
  );
}
export default Navbar;
