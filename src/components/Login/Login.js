import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Button, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getUserInformation } from "../../redux/actions/index"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Login() {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.loggedInUser);
  
  const image = "https://wallpaperaccess.com/full/697708.jpg"
  //const image = "https://wallpaperaccess.com/full/697715.jpg"
  
  const paperStyle = {padding: 20, height:'70vh', width:280}
  const avatarStyle = {backgroundColor:theme.palette.primary.main}
  const mainContainerStyle = { backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"contain", 
  height:'100vh',width:'100vw' }
  const btnStyle = {margin:'8px 0'}
  const textFieldStyle = {margin:'8px 0'}

  const [checked, setChecked] = React.useState(true);
  const [visiblePassword, setVisiblePassword] = React.useState(false)
  const [user, setUser] = React.useState("")
  const [password,setPassword] = React.useState("")
  const [loginError, setLoginError] = React.useState(undefined)
  const [firtClick, setFirstClick] = React.useState(false)

  useEffect(()=>{
    if (userData.id) {
      setLoginError(false)
      //console.log("logueo OK")
      navigate(`/pokemons`);
    }
    if (userData==="login failed") {
      setLoginError(true)
      //console.log("logueo MAL")
    }      
  },[userData])

  useEffect(()=>{
    if (checked && user)  localStorage.setItem("User", user);
    if (!checked)  localStorage.setItem("User", "");
  },[checked,user])

  useEffect(()=>{
    if (checked){
      let savedUser = localStorage.getItem("User");
      setUser(savedUser)
      //console.log("savedUser:",savedUser)
    }
  },[])


/********************************************************HANDLERS************************************************************/

  const handleChangeCheckBox = (event) => {
    setChecked(event.target.checked);
  };

  function handleVisiblePassword (){
    if (visiblePassword) setVisiblePassword(false)
    else setVisiblePassword(true)
  }

  const changePasswordHandler=(event)=>{
    setPassword(event.target.value)
  }

  const changeUserHandler=(event)=>{
    setUser(event.target.value)
  }

  function handleSignIn (){
    if (user==='' || password==='') setLoginError(true)
    else dispatch(getUserInformation(user, password));
    setFirstClick(true)
  }
  

  return (
    <Box style={mainContainerStyle}>
      <Grid align="right" py={15} px={20}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
              <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
              <h2>Sign in</h2>
          </Grid>
          <Grid align="center">
              <TextField value={user} onChange={changeUserHandler} style={textFieldStyle} label='Username' placeholder='Enter username' fullWidth required/>
              <Grid display="flex" justifyContent={"space-between"}>
                  <TextField onChange={changePasswordHandler} style={textFieldStyle} label='Password' placeholder='Enter password' type={visiblePassword ? '' : 'password'} required/>
                  <IconButton onClick={handleVisiblePassword} color="primary" aria-label="visible/invisible password" component="label" sx={{mr:1.5}}>
                      {visiblePassword ? <VisibilityIcon/> : <VisibilityOffIcon/>} 
                  </IconButton>
              </Grid>
              <FormControlLabel
                  label="Remember Me"
                  control={<Checkbox checked={checked} onChange={handleChangeCheckBox} />}
              />
              <Button /* type='submit' */ color='primary' variant="contained" style={btnStyle} fullWidth onClick={handleSignIn}>Sign In</Button>
              <Typography style={textFieldStyle}>
                <Link href="#">
                  Forgot Password ?
                </Link>
              </Typography>
              <Typography style={textFieldStyle}> Don't have an account yet ?
                <Link href="#">
                  {" "}Sign Up
                </Link>
              </Typography>
              {(firtClick && loginError) ? 
                  <Typography color="red">
                    Login Error! Try Again
                  </Typography>
                  :
                  (firtClick && loginError===false) ?
                  <Typography color="green">
                    Login Success!
                  </Typography>
                  :
                  null
              }
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
}

export default Login;
