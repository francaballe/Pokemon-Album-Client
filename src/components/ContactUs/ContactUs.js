import FaceIcon from '@mui/icons-material/Face';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from "axios";
import * as React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import Swal from "sweetalert2";


//I'm just leaving this here as it has no point to use here the main theme already created....since I'm using the MUI default 
//in both places. Otherwise, I would've have to use the one in APP and use a hook here
const theme = createTheme();

export default function ContactUs() {

  const navigate = useNavigate();
  const [visiblePassword, setVisiblePassword] = React.useState(false)
  const [selectedPicture,setSelectedPicture] = React.useState(undefined)
  const [cloudinaryData, setCloudinaryData] = React.useState(undefined)
  const [disableSubmit, setDisableSubmit] = React.useState(true)
  const [error, setError] = React.useState({
    captcha: true,
    name: true,
    lastname: true,
    email: true,
    password: true
  })


  /********************************************************HANDLERS************************************************************/

    async function handleSubmit (event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        let response = null
        if (cloudinaryData){
          //response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/image/upload`, cloudinaryData)
        }


        const newData = {
          id: data.get('email'),
          name: data.get('firstName'),
          lastname: data.get('lastName'),
          password: data.get('password'),
          picture: response ? response.data.secure_url : ""
        }
        //console.log("soy newData:",newData)

        //const createUser = await axios.post(`http://localhost:3001/users`, newData)
        Swal.fire({
          title:"New User Created!",
          text:'A new user has just been created',
          icon:'success',
          timer: 2000
        })
        navigate("/");
    };

  function handleSignIn (){
    navigate("/")
  }

  function handleVisiblePassword (){
    if (visiblePassword) setVisiblePassword(false)
    else setVisiblePassword(true)
  }

  const handleSelectedImage = async (e) => {
        const files = e.target.files
        const data = new FormData();
        data.append("file", files[0]);
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);//data cloudinary
        setCloudinaryData(data);
        setSelectedPicture(URL.createObjectURL(files[0]))
  }

  function changeCaptchaHandler (value) {
    if (value)  setError({ ...error, captcha: false })
    else  setError({ ...error, captcha: true })
  }

  function changeNameHandler (event){
    if (!/^[A-Z].*$/u.test(event.target.value)) setError({ ...error, name: true })
    else  setError({ ...error, name: false })
  }

  function changeLastNameHandler (event){
    if (!/^[A-Z].*$/u.test(event.target.value)) setError({ ...error, lastname: true })
    else  setError({ ...error, lastname: false })
  }
 
  function changeEmailHandler (event){
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(event.target.value))  setError({ ...error, email: true })
    else  setError({ ...error, email: false })
  }

  function changePasswordHandler (event){
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{6,10}$/u.test(event.target.value))
      setError({ ...error, password: true })
    else  setError({ ...error, password: false })
  }

  
  /****************************************************************************************************************************/

  React.useEffect(() => {
    if (!error.name &&
        !error.lastname &&
        !error.email &&
        !error.password &&
        !error.captcha
    ) setDisableSubmit(false);
    else  setDisableSubmit(true);
  }, [error])

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
                <Tooltip title="It should start with a capital letter" placement="top-start">
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={changeNameHandler}
                    sx={error.name ? { input: { color: 'red' } } : null}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Tooltip title="It should start with a capital letter" placement="top-start">
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    onChange={changeLastNameHandler}
                    sx={error.lastname ? { input: { color: 'red' } } : null}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <Tooltip title="It should be a valid Email" placement="top-start">
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={changeEmailHandler}
                    sx={error.email ? { input: { color: 'red' } } : null}
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent={"space-between"}>
                <Tooltip title="Min 6, max 10 chars. At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" placement="top-start">
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    autoComplete="new-password"
                    type={visiblePassword ? '' : 'password'}
                    onChange={changePasswordHandler}
                    sx={error.password ? { input: { color: 'red' } } : null}
                  />
                </Tooltip>
                <IconButton onClick={handleVisiblePassword} color="primary" aria-label="visible/invisible password" component="label" /* sx={{mr:0}} */>
                      {visiblePassword ? <VisibilityIcon/> : <VisibilityOffIcon/>} 
                  </IconButton>
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" /* spacing={2} */ justifyContent="center">
                    <Button variant="contained" component="label" endIcon={<PhotoCamera/>}>
                        Upload Photo
                        <input hidden accept="image/*" multiple type="file" onChange={handleSelectedImage}/>
                    </Button>

                    {selectedPicture ? 
                    <Avatar src={selectedPicture} sx={{ m: 1, bgcolor: 'primary.main' }}></Avatar>
                    : 
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}><FaceIcon /></Avatar>}                    

                </Stack>
              </Grid>

              <Grid item xs={12}>
                  <Stack direction="row" alignItems="center" /* spacing={2} */ justifyContent="center">
                      <ReCAPTCHA sitekey={CAPTCHAKEY} onChange={changeCaptchaHandler}/>
                  </Stack>
              </Grid>

            </Grid>
            
            <Button type="submit" fullWidth variant="contained" disabled={disableSubmit} sx={{ mt: 3, mb: 2 }}>
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