import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Swal from "sweetalert2";

const EMAIL_PUBLIC_KEY = "5NzvqVXw7MboUrYE0";

//I'm just leaving this here as it has no point to use here the main theme already created....since I'm using the MUI default 
//in both places. Otherwise, I would've have to use the one in APP and use a hook here
const theme = createTheme();

export default function ContactUs({ darkMode }) {

  const lightTheme = createTheme({
    palette: {
      mode:darkMode}
    })


  //SENDING EMAIL CONFIGURATION
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_francaballe_poke', 'template_pokemon_album', e.target, EMAIL_PUBLIC_KEY)
      .then((/* result */) => {
        Swal.fire({
          title:"Message Sent!",
          text:'A new message has just been sent!',
          icon:'success',
          timer: 2000
        })
      }, (/* error */) => {
        Swal.fire({
          title:"Error when sending email!",
          text:"Oops, something went wrong!",
          icon:'error',
          timer: 4000
        })
      });
      //e.target.reset()
  };

  const userData = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  //Data States (for controlled form)
  const [data, setData] = React.useState({
    phone: "",
    message: ""
  })
  
  //Error States
  const [error, setError] = React.useState({
    phone: true,
    message: true
  })

  /* React.useEffect(()=>{
    if (userData.id) console.log(userData)    
  },[userData])
 */

  /********************************************************HANDLERS************************************************************/

    async function handleSubmit (event) {
         event.preventDefault();
         sendEmail(event);
        navigate("/pokemons")
    };

 
  function changeMessageHandler (event){
    setData({...data, message:event.target.value})
    if (event.target.value.length<10) setError({ ...error, message: true })
    else  setError({ ...error, message: false })
  }

  function changePhoneHandler (event){
    setData({...data, phone:event.target.value})
    if (!/^[ 0-9+-]+$/.test(event.target.value))  setError({ ...error, phone: true })
    else  setError({ ...error, phone: false })
  }

  function handleGoBack (event){
    navigate("/pokemons")
  }

  
  /****************************************************************************************************************************/
  
  React.useEffect(() => {
    if (!error.message &&
        !error.phone
    ) setDisableSubmit(false);
    else  setDisableSubmit(true);
  }, [error])

  return (
    <ThemeProvider theme={lightTheme}>
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
            <BorderColorOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Us
          </Typography>
          (Us? It's only Me, the developer!)
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstName"
                    fullWidth
                    id="firstName"
                    value={userData.name}
                    sx={{ input: { color: 'primary.main' } }}
                    /* disabled */
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    fullWidth
                    id="lastName"
                    value={userData.lastname}
                    sx={{ input: { color: 'primary.main' } }}
                    /* disabled */
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    name="email"
                    fullWidth
                    id="email"
                    value={userData.id}
                    sx={{ input: { color: 'primary.main' } }}
                    /* disabled */
                  />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent={"space-between"}>
                <Tooltip title="Only numbers, - and + characters are allowed" placement="top-start">
                  <TextField
                    fullWidth
                    name="phone"
                    label="Phone Number"
                    id="phone"
                    autoComplete="tel"
                    onChange={changePhoneHandler}
                    value={data.phone}
                    color={error.phone ? "error" : null}
                    sx={error.phone ? { input: { color: 'red' } } : null}
                  />
                </Tooltip>
              </Grid>

              <Grid item xs={12}>
                <Tooltip title="Write whatever you want, but at least 10 characters" placement="top-start">
                  <TextField
                    fullWidth
                    name="message"
                    label="Write a Message"
                    id="message"
                    multiline
                    rows={4}
                    onChange={changeMessageHandler}
                    value={data.message}
                    color={error.message ? "error" : null}
                    sx={error.message ? {'& .MuiInputBase-root': {color: 'red'},} : null}
                  />
                </Tooltip>
              </Grid>

            </Grid>
            
            <Button type="submit" fullWidth variant="contained" disabled={disableSubmit} sx={{ mt: 3, mb: 2 }}>
              Send Message
            </Button>

            <Grid container justifyContent="center">
              <Grid>
                  <Typography>
                      <Link component="button" variant="body1" onClick={handleGoBack}>
                          Go Back
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