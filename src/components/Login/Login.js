import { ThemeProvider } from '@emotion/react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Avatar, Button, colors, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from '@mui/system';
import * as React from 'react';
import { useHistory } from "react-router-dom";
import { useTheme } from '@mui/material/styles';


function Login() {

  const theme = useTheme();
  
  const image = "https://wallpaperaccess.com/full/697708.jpg"
  //const image = "https://wallpaperaccess.com/full/697715.jpg"
  
  const paperStyle = {padding: 20, height:'70vh', width:280, /* opacity: '85%' */}
  const avatarStyle = {backgroundColor:theme.palette.primary.main}
  const mainContainerStyle = { backgroundImage:`url(${image})`,backgroundRepeat:"no-repeat",backgroundSize:"contain", 
  height:'100vh',width:'100vw' }
  const btnStyle = {margin:'8px 0'}
  const textFieldStyle = {margin:'8px 0'}

  const [checked, setChecked] = React.useState([true, false]);
  const history = useHistory();
  
  const handleChangeCheckBox = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  function handleSignIn (){
    history.push(`/pokemons`);
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
              <TextField style={textFieldStyle} label='Username' placeholder='Enter username' fullWidth required/>
              <TextField style={textFieldStyle} label='Password' placeholder='Enter password' type='password' fullWidth required/>
              <FormControlLabel
                  label="Remember Me"
                  control={<Checkbox checked={checked[0]} onChange={handleChangeCheckBox} />}
              />
              <Button type='submit' color='primary' variant="contained" style={btnStyle} fullWidth onClick={handleSignIn}>Sign In</Button>
              <Typography style={textFieldStyle}>
                <Link href="#">
                  Forgot Password ?
                </Link>
              </Typography>
              <Typography> Do you have an account ?
                <Link href="#">
                  {" "}Sign Up ?
                </Link>
              </Typography>
          </Grid>
        </Paper>
      </Grid>
    </Box>
  );
}

export default Login;
