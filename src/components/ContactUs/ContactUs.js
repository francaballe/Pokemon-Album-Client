import FaceIcon from '@mui/icons-material/Face';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from "axios";
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';


//I'm just leaving this here as it has no point to use here the main theme already created....since I'm using the MUI default 
//in both places. Otherwise, I would've have to use the one in APP and use a hook here
const theme = createTheme();

export default function ContactUs() {

  const userData = useSelector((state) => state.loggedInUser);
  const navigate = useNavigate();
  const [disableSubmit, setDisableSubmit] = React.useState(true)

  const [error, setError] = React.useState({
    phone: true,
    message: true
  })

  const [data, setData] = React.useState({
    phone: "",
    message: ""
  })

  /* React.useEffect(()=>{
    if (userData.id) console.log(userData)    
  },[userData])
 */

  /********************************************************HANDLERS************************************************************/

    async function handleSubmit (event) {
      console.log("le di al submit")
         event.preventDefault();
        /*const data = new FormData(event.currentTarget);
        
        let response = null
        if (cloudinaryData){
          response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/image/upload`, cloudinaryData)
        }


        const newData = {
          id: data.get('email'),
          name: data.get('firstName'),
          lastname: data.get('lastName'),
          password: data.get('password'),
          picture: response ? response.data.secure_url : ""
        }
        

        const createUser = await axios.post(`http://localhost:3001/users`, newData)
        Swal.fire({
          title:"New User Created!",
          text:'A new user has just been created',
          icon:'success',
          timer: 2000
        })
        navigate("/"); */
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
                    disabled
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastName"
                    fullWidth
                    id="lastName"
                    value={userData.lastname}
                    disabled
                  />
              </Grid>
              <Grid item xs={12}>
                  <TextField
                    name="email"
                    fullWidth
                    id="email"
                    value={userData.id}
                    disabled
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
                    /* textareaStyle={styles.textInputInput} */                    
                    /* sx={{ textareaStyle: { color: 'red' } }} */
                    /* {error.message ? { input: { color: 'red' } } : null} */
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