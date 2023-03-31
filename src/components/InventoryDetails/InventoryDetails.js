import FiberNewIcon from '@mui/icons-material/FiberNew';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import { ButtonBase, createSvgIcon } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Rating from '@mui/material/Rating';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import axios from "axios";
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUserInformation } from "../../redux/actions/index";



function InventoryDetails({ allPokemons, darkMode }) {

  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.loggedInUser);
  const [disableOpenEnvelope, setDisableOpenEnvelope] = React.useState(false)
  const crossAccessToken = process.env.REACT_APP_CROSS_ACCESS_TOKEN
  const pokemonsToShow = [1,2,3,4,5]
  const [newPokemons, setNewPokemons] = React.useState([])
  const [turnedCard, setTurnedCard] = React.useState([false,false,false,false,false])
  const [disableCards, setDisableCards] = React.useState(true)

  const EmptyIcon = createSvgIcon(
    <path d="" />,
    'EmptyIcon',
  );
  

  function randomizePokemonOpening (){
    
      const totalPokemonNumber = [...Array(672).keys()]
      const randomNums = []
      let i = totalPokemonNumber.length
      let j = 0;
      
      while (i--) {
          j = Math.floor(Math.random() * (i+1));
          randomNums.push(totalPokemonNumber[j]);
          totalPokemonNumber.splice(j,1);
      }

      const the5Chosen = []
      for (let i=0;i<5;i++){
        the5Chosen.push(allPokemons[randomNums[i]])
      }
      
      for (let i=0;i<5;i++){
        if (!userData.pokemons.includes(the5Chosen[i].id))  the5Chosen[i].new=true        
      }      

      return the5Chosen

    }

  /****************************************************Handlers**************************************************************/

  async function handleOpenEnvelope(){
  
    setTurnedCard([false,false,false,false,false])
    setDisableOpenEnvelope(true)
    setDisableCards(false)

    const chosenOnes = randomizePokemonOpening();
    setNewPokemons(chosenOnes)
    
    let newEnvelopesValue = --userData.unopenedenvelopes    

    const data = {
      "id": userData.id,
	    "unopenedenvelopes":newEnvelopesValue,
	    "token": crossAccessToken,
      "pokemons": chosenOnes.map(onePokemon => onePokemon.id)
    }
    const respuesta = await axios.put("http://localhost:3001/users",data)

    if (respuesta)  {
      dispatch(updateUserInformation(newEnvelopesValue,chosenOnes.map(onePokemon => onePokemon.id)));
      //console.log("datos usuario:",userData)
    }
    
  }

  function showCardHandler(index) { 
    let turnedCardCpy = [...turnedCard]
    turnedCardCpy[index]=true
    setTurnedCard(turnedCardCpy)    
  }

  function handleGoBack (event){
    navigate("/pokemons")
  }

/**************************************************************************************************************************/

React.useEffect(()=>{
  if (userData.unopenedenvelopes===0) setDisableOpenEnvelope(true)  
},/* [userData] */)

React.useEffect(()=>{
  if (!turnedCard.includes(false))  setDisableOpenEnvelope(false)
},[turnedCard])



  return (
    <ThemeProvider theme={theme}>
    
      <div>
      <CssBaseline />
      <AppBar position="relative">

      <Toolbar sx={{ pt: 0, justifyContent:"space-evenly" }}>
        <Button disabled={disableOpenEnvelope} variant="contained" startIcon={<MailTwoToneIcon/>} color='secondary' 
        size="large" onClick={handleOpenEnvelope}>
            Open ( {userData.unopenedenvelopes} Left )
        </Button>
      </Toolbar>
      </AppBar>
      
      <main>
        
        <Container maxWidth="xl" sx={{ py: 10 }}>
          
              <Grid container spacing={40}    
                alignItems="row"
                justifyContent="center"                               
              >                    

            {(newPokemons.length ? newPokemons : pokemonsToShow)
            .map((card,index) => (              
              <Grid item key={card.id ? card.id : card} xs={12} sm={6} md={2} >
                
                <Grid container justifyContent="center" pt={5}>
                  
                  {(card && card.new) ?
                      <FiberNewIcon sx={{fontSize:"50px", color: 'secondary.main'}}/>
                      :
                      <EmptyIcon sx={{fontSize:"50px", color: 'primary.main'} }/>
                  }

                <ButtonBase disabled={disableCards} onClick={()=>showCardHandler(index)}>

                    <Card sx={{                      
                    borderRadius: 5, border: 2, bgcolor: disableCards? 'primary.main' : null,
                    opacity: disableCards? 0.5 : 1,                  
                    height: '450px',
                    width: '240px',
                    borderColor:  turnedCard[index]===true ? (card.stars===5 ? 'legendary.main' : 
                                card.stars===4 ? 'epic.main' : 
                                card.stars===3 ? 'rare.main' : 
                                card.stars===2 ? 'uncommon.light' : 
                                'common.main') : null,
                  background: darkMode==="light" && turnedCard[index]===true ?
                              (card.stars===5 ? 'linear-gradient(to right bottom,orange, yellow, white)' : 
                              card.stars===4 ? 'linear-gradient(to right bottom, #800080, #b266b2)' : 
                              card.stars===3 ? 'linear-gradient(to right bottom, #0000ff, #9999ff)' : 
                              card.stars===2 ? 'linear-gradient(to right bottom, #003300, #008000)' :
                              card.stars===1 ? 'linear-gradient(to right bottom, #262626, #808080)' : null) : null,
                  boxShadow: turnedCard[index]===true ? (card.stars===5 ? '10px 5px 5px #C99700' : 
                              card.stars===4 ? '10px 5px 5px purple' : 
                              card.stars===3 ? '10px 5px 5px blue' : 
                              card.stars===2 ? '10px 5px 5px #007500' : 
                              '10px 5px 5px grey') : '10px 5px 5px'            
                    }}>

                      <Box 
                      display="flex" flexDirection={'column'} alignItems='center' 
                      //py={turnedCard[index]===true ? 5 : 0}
                      sx={{                                                
                        transition: 'all 0.5s linear',
                        transformStyle: 'preserve-3d',
                        transform: turnedCard[index]===true ? "rotateY(180deg)" : null                      
                      }}>

                        {/* CARD FRONT */}
                        <CardMedia
                        component="img"
                        image="https://res.cloudinary.com/dqnpgchkn/image/upload/v1679101917/Pokemons%20Album/Pokemon-Card_f9paw9.png"
                        alt="unopened pokemon card"                                                
                          sx={{                            
                            position: 'absolute',                            
                            objectFit: 'contain',
                            backfaceVisibility: 'hidden',
                            height:450,
                            width:310
                          }}>                              
                        </CardMedia>                          

                        {/* Little trick to generate padding Y without the side effect when turning the card */}
                        <CardContent sx={{
                            backfaceVisibility: 'hidden',
                            transform: "rotateY(-180deg)",                                                 
                            }}>                          
                        </CardContent>     

                        {/* CARD BACK */}
                        <CardMedia  
                        component="img"
                        image={turnedCard[index] ? newPokemons[index].image : ""}
                        alt="opened pokemon card"                        
                        
                          sx={{                          
                            height: '250px',
                            width: '200px',
                            objectFit: 'contain',
                            backfaceVisibility: 'hidden',
                            transform: "rotateY(-180deg)",                        
                          }}>                              
                        </CardMedia>
                      
                      <CardContent sx={{
                            backfaceVisibility: 'hidden',
                            transform: "rotateY(-180deg)",                                                 
                            }}>
                          
                            <Typography align="center" gutterBottom variant="h6" component="h2">
                                  {card.name}  
                                </Typography>
                                <Typography align="center" gutterBottom variant="h6" component="h2">
                                  {card.id ? `#${card.id}` : null}
                                </Typography>
                                <Typography align="center">
                                    <Rating name="read-only" value={card.stars} readOnly />
                            </Typography>
                      
                      </CardContent>                

                </Box> 
                </Card> 

                </ButtonBase>
              </Grid>
              </Grid>
            ))}
          </Grid>

          <Grid container justifyContent="center" pt={5}>
            <Typography>
                  <Link component="button" variant="body1" onClick={handleGoBack}>
                      Go Back
                  </Link>
            </Typography>            
          </Grid>

        </Container>                

      </main>
      
      </div>  
      </ThemeProvider>
  );
}

export default InventoryDetails; 