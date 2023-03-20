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
import { ThemeProvider, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import axios from "axios";
import * as React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";



export default function ForgotPassword() {

  const theme = useTheme();
  const CAPTCHAKEY = "6LfWiPMkAAAAAIb85f8A8cHcRikqE2Lrk1z_5c3T";
  const navigate = useNavigate();

  /* 
  const CLOUDINARY_CLOUDNAME = "dqnpgchkn"
  const CLOUDINARY_UPLOAD_PRESET = "xnxpphbf"
  const [visiblePassword, setVisiblePassword] = React.useState(false)
  const [selectedPicture,setSelectedPicture] = React.useState(undefined)
  const [cloudinaryData, setCloudinaryData] = React.useState(undefined)
  const [disableSubmit, setDisableSubmit] = React.useState(true) */
  
  //Data States (for controlled form)
  /* const [data, setData] = React.useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  }) */
  
  //Error States
  /* const [error, setError] = React.useState({
    captcha: true,
    name: true,
    lastname: true,
    email: true,
    password: true
  }) */


  /********************************************************HANDLERS************************************************************/

  function changeCaptchaHandler (value) {
    if (value)  setError({ ...error, captcha: false })
    else  setError({ ...error, captcha: true })
  }

  function handleGoBack (){
    navigate("/")
  }

    /* async function handleSubmit (event) {
        event.preventDefault();
        //const data = new FormData(event.currentTarget);
        
        let response = null
        if (cloudinaryData){
          response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/image/upload`, cloudinaryData)
        }

        const newData = {
          id: data.email,           //data.get('email'),
          name: data.name,          //data.get('firstName'),
          lastname: data.lastname,  //data.get('lastName'),
          password: data.password,  //data.get('password'),
          picture: response ? response.data.secure_url : ""
        }
        //console.log("soy newData:",newData)

        try{
          const createUser = await axios.post(`http://localhost:3001/users`, newData)
          if (createUser.data && createUser.data==="User Created OK"){
            Swal.fire({
              title:"New User Created!",
              text:'A new user has just been created',
              icon:'success',
              timer: 2000
            })
            navigate("/");
          }
          if (createUser.data && createUser.data==="User already exists"){
            Swal.fire({
              title:"Error when creating this new user!",
              text:"It seems the user Email you have chosen is within our DataBase already. Try a different one!",
              icon:'error',
              timer: 4000
            })
          }
        }catch(e){
          Swal.fire({
            title:"Error when creating this new user!",
            text:"An error occurred while creating your User. Try Again!",
            icon:'error',
            timer: 4000
          })
        }
    };

  
  function handleVisiblePassword (){
    if (visiblePassword) setVisiblePassword(false)
    else setVisiblePassword(true)
  }

  const handleSelectedImage = async (e) => {
        const files = e.target.files
        if (files.length){
            //console.log("y ahoraa:",files[0])
            const data = new FormData();
            data.append("file", files[0]);
            data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);//data cloudinary
            setCloudinaryData(data);
            setSelectedPicture(URL.createObjectURL(files[0]))
        }
  }

  function changeCaptchaHandler (value) {
    if (value)  setError({ ...error, captcha: false })
    else  setError({ ...error, captcha: true })
  }

  function changeNameHandler (event){
    setData({...data, name:event.target.value})
    if (!/^[A-Z].*$/u.test(event.target.value)) setError({ ...error, name: true })
    else  setError({ ...error, name: false })
  }

  function changeLastNameHandler (event){
    setData({...data, lastname:event.target.value})
    if (!/^[A-Z].*$/u.test(event.target.value)) setError({ ...error, lastname: true })
    else  setError({ ...error, lastname: false })
  }
 
  function changeEmailHandler (event){
    setData({...data, email:event.target.value})
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(event.target.value))  setError({ ...error, email: true })
    else  setError({ ...error, email: false })
  }

  function changePasswordHandler (event){
    setData({...data, password:event.target.value})
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{6,10}$/u.test(event.target.value))
      setError({ ...error, password: true })
    else  setError({ ...error, password: false })
  }
 */
  
  /****************************************************************************************************************************/

  /* React.useEffect(() => {
    if (!error.name &&
        !error.lastname &&
        !error.email &&
        !error.password &&
        !error.captcha
    ) setDisableSubmit(false);
    else  setDisableSubmit(true);
  }, [error]) */

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
              Password Recovery
          </Typography>
          <Box component="form" noValidate /* onSubmit={handleSubmit} */ sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              
              
              <Grid item xs={12}>
                <Tooltip title="Your own email to which the verification code will be sent." placement="top-start">
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    /* onChange={changeEmailHandler}
                    value={data.email}
                    color={error.email ? "error" : null}
                    sx={error.email ? { input: { color: 'red' } } : null} */
                  />
                </Tooltip>
              </Grid>

              <Grid item xs={12} mt={3}>
                  <Stack direction="row" alignItems="center" /* spacing={2} */ justifyContent="center">
                      <ReCAPTCHA sitekey={CAPTCHAKEY} onChange={changeCaptchaHandler}/>
                  </Stack>
              </Grid>

              <Grid item xs={12}>
                  <Button /* type="submit" */ fullWidth variant="contained" /* disabled={disableSubmit} */ sx={{ mt: 3, mb: 2 }}>
                      Send Verification Code to my Email
                  </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent={"space-between"}>
                {/* <Tooltip title="Min 6, max 10 chars. At least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character" placement="top-start"> */}
                  <TextField
                    required
                    fullWidth
                    name="verification-code"
                    label="Enter Verification Code"
                    id="verification-code"
                    /* autoComplete="new-password" */
                    /* type={visiblePassword ? '' : 'password'} */
                    /* onChange={changePasswordHandler}
                    value={data.password}
                    color={error.password ? "error" : null}
                    sx={error.password ? { input: { color: 'red' } } : null} */
                  />
                {/* </Tooltip>                 */}
              </Grid>          
              <Grid item xs={12}>
                  <Button /* type="submit" */ fullWidth variant="contained" /* disabled={disableSubmit} */ sx={{ mt: 3, mb: 2 }}>
                      Verify Code & Reset Password
                  </Button>
              </Grid>
            </Grid>            

            <Grid container justifyContent="center">
              <Grid>
                  <Link component="button" variant="body1" onClick={handleGoBack}>
                      Go Back
                  </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>        
      </Container>
    </ThemeProvider>
  );
}