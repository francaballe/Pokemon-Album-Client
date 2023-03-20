import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import emailjs from '@emailjs/browser';



export default function ForgotPassword() {

  const theme = useTheme();
  const EMAIL_PUBLIC_KEY = "5NzvqVXw7MboUrYE0";
  const CAPTCHAKEY = "6LfWiPMkAAAAAIb85f8A8cHcRikqE2Lrk1z_5c3T";
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = React.useState(true)
  const [disableVerifyCode,setDisableVerifyCode] = React.useState(true)
  const [disableVerificationCodeField,setDisableVerificationCodeField] = React.useState(true)
  const [currentVerificationCode,setCurrentVerificationCode] = React.useState("")
   
  //Data States (for controlled form)
  const [data, setData] = React.useState({
    email: "",
    verificationCode: "",
    captcha: ""
  }) 

  //Error States
  const [error, setError] = React.useState({
    captcha: true,
    email: true,
    verificationCode: true
  })


  /********************************************************HANDLERS************************************************************/

  function changeCaptchaHandler (value) {
    if (value)  setError({ ...error, captcha: false })
    else  setError({ ...error, captcha: true })
  }

  function handleGoBack (){
    navigate("/")
  }

  function changeEmailHandler (event){
    setData({...data, email:event.target.value})
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(event.target.value))  setError({ ...error, email: true })
    else  setError({ ...error, email: false })
  }

  function changeVerificationCodeHandler (event){
    setData({...data, verificationCode:event.target.value})
    if (event.target.value.length!=6) setError({ ...error, verificationCode: true })
    else  setError({ ...error, verificationCode: false })    
  }

  function handleSendEmail (){
    setCurrentVerificationCode(generateVerificationCode())
    setError({ ...error, captcha: true })    
    resetCaptcha();
  }

  function handleVerifyCode (){  
    if (currentVerificationCode===data.verificationCode){
      console.log("son igualesss y habilito el reset")
    }else{      
      setDisableVerificationCodeField(true)
      setDisableVerifyCode(true)
      setData({...data, verificationCode:""})
      setError({ ...error, verificationCode: true })
      Swal.fire({
        title:"Code Verification Failed",
        text:"Code verification didn't match. Try again!",
        icon:'error',
        timer: 4000
      })
    }
  }

   
  /*****************************************************SOME USE EFFECTS******************************************************/

  React.useEffect(() => {
    if (!error.email &&        
        !error.captcha
    ) setDisableSubmit(false);
    else  setDisableSubmit(true);
  },[error])

  React.useEffect(() => {
    if (!error.verificationCode) setDisableVerifyCode(false);/////XXXXXXXXXX
    else  setDisableVerifyCode(true);
  },[error])

  React.useEffect(()=>{    
    if (currentVerificationCode.length) {      
      sendEmail(currentVerificationCode)
      setDisableVerificationCodeField(false)      
    }
    else setDisableVerificationCodeField(true)
  },[currentVerificationCode])


/*******************************************************CAPTCHA RESET*********************************************************/

let captcha;
 const setCaptchaRef = (ref) => {
    if (ref) {
      return captcha = ref;
    }
 };

 const resetCaptcha = () => {   
   captcha.reset();
 }


/*******************************************************CODE GENERATOR*********************************************************/

function generateVerificationCode(){
  
    const totalLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X",
    "Y","Z",0,1,2,3,4,5,6,7,8,9] 
      const randomNums = []
      let i = totalLetters.length
      let j = 0;
      
      while (i--) {
          j = Math.floor(Math.random() * (i+1));
          randomNums.push(totalLetters[j]);
          totalLetters.splice(j,1);
      }

      const result6Digits = randomNums.slice(0,6).toString().replaceAll(',','')

      return result6Digits
}

/**************************************************SENDING EMAIL CONFIGURATION**************************************************/

const sendEmail = () => {

  const verificationKeyObj = {
    code: currentVerificationCode,
    toemail: data.email//"francaballe@gmail.com"//"gaby_selan@hotmail.com"
  }

  emailjs.send('service_francaballe_poke', 'PasswordResetTemplate', verificationKeyObj, EMAIL_PUBLIC_KEY)
    .then((/* result */) => {
      Swal.fire({
        title:"Verification Code Sent!",
        text:'A verification code for password reset has been sent. Check your email!',
        icon:'success',
        timer: 4000
      })      
    }, (/* error */) => {
      Swal.fire({
        title:"Error when sending email!",
        text:"Oops, something went wrong!",
        icon:'error',
        timer: 4000
      })
    });
};

/******************************************************************************************************************************/


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
          <Box /* component="form" noValidate */ /* onSubmit={handleSubmit} */ sx={{ mt: 3 }}>
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
                    value={data.email}
                    onChange={changeEmailHandler}
                    color={error.email ? "error" : null}
                    sx={error.email ? { input: { color: 'red' } } : null}
                  />
                </Tooltip>
              </Grid>

              <Grid item xs={12} mt={3}>
                  <Stack direction="row" alignItems="center" /* spacing={2} */ justifyContent="center">
                      <ReCAPTCHA sitekey={CAPTCHAKEY} onChange={changeCaptchaHandler} ref={(r) => setCaptchaRef(r)}/>
                  </Stack>
              </Grid>

              <Grid item xs={12}>
                  <Button /* type="submit" */ fullWidth variant="contained" disabled={disableSubmit} sx={{ mt: 3, mb: 2 }}
                  onClick={handleSendEmail}>
                      Send Verification Code to my Email
                  </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent={"space-between"}>
                <Tooltip title="Enter the 6 character code you received in your email" placement="top-start">
                  <TextField
                    required
                    fullWidth
                    name="verification-code"
                    label="Enter Verification Code"
                    id="verification-code"                                  
                    onChange={changeVerificationCodeHandler}
                    value={data.verificationCode}
                    color={error.verificationCode ? "error" : null}
                    sx={error.verificationCode ? { input: { color: 'red' } } : null}
                    disabled={disableVerificationCodeField}
                  />
                </Tooltip>                
              </Grid>          
              <Grid item xs={12}>
                  <Button /* type="submit" */ fullWidth variant="contained" disabled={disableVerifyCode} onClick={handleVerifyCode} sx={{ mt: 3, mb: 2 }}>
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