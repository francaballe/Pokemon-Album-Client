import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import ReCAPTCHA from "react-google-recaptcha";
import IconButton from '@mui/material/IconButton';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FaceIcon from '@mui/icons-material/Face';


const CAPTCHAKEY = "6LfWiPMkAAAAAIb85f8A8cHcRikqE2Lrk1z_5c3T";

//I'm just leaving this here as it has no point to use here the main theme already created....since I'm using the MUI default 
//in both places. Otherwise, I would've have to use the one in APP and use a hook here
const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();
  const [visiblePassword, setVisiblePassword] = React.useState(false)

  /********************************************************HANDLERS************************************************************/

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /* console.log({
      email: data.get('email'),
      password: data.get('password'),
    }); */
  };

  function handleCaptcha(value) {
    console.log("Captcha value:", value);
  }

  function handleSignIn (){
    navigate("/")
  }

  function handleVisiblePassword (){
    if (visiblePassword) setVisiblePassword(false)
    else setVisiblePassword(true)
  }

  
  /****************************************************************************************************************************/


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
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent={"space-between"}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  type={visiblePassword ? '' : 'password'}
                />
                <IconButton onClick={handleVisiblePassword} color="primary" aria-label="visible/invisible password" component="label" /* sx={{mr:0}} */>
                      {visiblePassword ? <VisibilityIcon/> : <VisibilityOffIcon/>} 
                  </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" /* spacing={2} */ justifyContent="center">
                    <Button variant="contained" component="label" endIcon={<PhotoCamera/>}>
                        Upload Photo
                        <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <FaceIcon />
                    </Avatar>
                    {/* <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} alt="Fran Caballe" src="https://lh3.googleusercontent.com/a/AEdFTp4ZPkTIpErD9-qFEIOBSUOctOhWjTVlq9wgyJ5lXw=s96-c" /> */}
                </Stack>
              </Grid>

              <Grid item xs={12}>
                  <Stack direction="row" alignItems="center" /* spacing={2} */ justifyContent="center">
                      <ReCAPTCHA sitekey={CAPTCHAKEY} onChange={handleCaptcha}/>
                  </Stack>
              </Grid>

            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid>
                  <Typography> Already have an account? {" "}
                      <Link component="button" variant="body1" onClick={handleSignIn}>
                          Sign In
                      </Link>
                  </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
  );
}