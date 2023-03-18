import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
//import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
//import { useNavigate } from 'react-router-dom';
//import RarityRating from "../AllPokemonsComponent/RarityRating/RarityRating";
import NoMatch from "../AllPokemonsComponent/NoMatch/NoMatch";
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { updateUserInformation } from "../../redux/actions/index";
import { ThemeProvider, useTheme } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { getUserInformation } from "../../redux/actions/index";




function InventoryDetails({ allPokemons, darkMode }) {

  const theme = useTheme();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.loggedInUser);
  const [disableOpenEnvelope, setDisableOpenEnvelope] = React.useState(false)
  const crossAccessToken = process.env.REACT_APP_CROSS_ACCESS_TOKEN
  const pokemonsToShow = [1,2,3,4,5]
  const [newPokemons, setNewPokemons] = React.useState([])
  const [turnedCard, setTurnedCard] = React.useState([false,false,false,false,false])
  const [disableCards, setDisableCards] = React.useState(true)
  

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

      /* console.log("uno:",allPokemons[randomNums[0]].name)
      console.log("dos:",allPokemons[randomNums[1]].name)
      console.log("tres:",allPokemons[randomNums[2]].name)
      console.log("cuatro:",allPokemons[randomNums[3]].name)
      console.log("cinco:",allPokemons[randomNums[4]].name) */

      const the5Chosen = []
      for (let i=0;i<5;i++){
        the5Chosen.push(allPokemons[randomNums[i]])
      }
      //console.log("dentro de la funcion randomize:",the5Chosen)
      return the5Chosen

    }

  /****************************************************Handlers**************************************************************/

  async function handleOpenEnvelope(){

    setTurnedCard([false,false,false,false,false])
    setDisableOpenEnvelope(true)
    setDisableCards(false)

    const chosenOnes = randomizePokemonOpening();
    setNewPokemons(chosenOnes)
    //console.log("newPokemons:",newPokemons)
    
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
      console.log("datos usuario:",userData)
    }
    
  }

  function showCardHandler(index) {    
    let turnedCardCpy = [...turnedCard]
    turnedCardCpy[index]=true
    setTurnedCard(turnedCardCpy)
  }


/**************************************************************************************************************************/

React.useEffect(()=>{
  if (userData.unopenedenvelopes===0) setDisableOpenEnvelope(true)  
},[userData])

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
        
        <Container maxWidth="xl" sx={{ py: 8 }}>

          <Grid container spacing={5}    
            alignItems="row"
            justifyContent="center"
          >          
            
            {(newPokemons.length ? newPokemons : pokemonsToShow)
            .map((card,index) => (              
              <Grid item key={card.id ? card.id : card} xs={12} sm={6} md={2} >
                <Card                  
                  onClick={()=>showCardHandler(index)}
                  sx={{ borderRadius: 5, border: 2, bgcolor: disableCards? 'primary.main' : null,
                  opacity: disableCards? 0.5 : 1,pointerEvents: disableCards? "none" : "auto",
                  
                  height: '450px',
                  width: '240px',

                  borderColor:  card.stars===5 ? 'legendary.main' : 
                                card.stars===4 ? 'epic.main' : 
                                card.stars===3 ? 'rare.main' : 
                                card.stars===2 ? 'uncommon.light' : 
                                'common.main',
                  background: darkMode==="light" && 
                              (card.stars===5 ? 'linear-gradient(to right bottom,orange, yellow, white)' : 
                              card.stars===4 ? 'linear-gradient(to right bottom, #800080, #b266b2)' : 
                              card.stars===3 ? 'linear-gradient(to right bottom, #0000ff, #9999ff)' : 
                              card.stars===2 ? 'linear-gradient(to right bottom, #003300, #008000)' :
                              card.stars===1 ? 'linear-gradient(to right bottom, #262626, #808080)' : null),
                  boxShadow: card.stars===5 ? '10px 5px 5px #C99700' : 
                              card.stars===4 ? '10px 5px 5px purple' : 
                              card.stars===3 ? '10px 5px 5px blue' : 
                              card.stars===2 ? '10px 5px 5px #007500' : 
                              '10px 5px 5px grey'
                    }}
                >
                  <Box m={1} p={1} display="flex" justifyContent="center">
                  
                    <CardMedia                      
                      sx={turnedCard[index]===true ?
                        {borderRadius:5,
                        height: '250px',
                        width: '200px',
                        objectFit: 'contain'
                      } :
                      { borderRadius:3 }
                    }
                      component="img"
                      image={turnedCard[index]===true ? newPokemons[index].image
                        : "https://res.cloudinary.com/dqnpgchkn/image/upload/v1679101917/Pokemons%20Album/Pokemon-Card_f9paw9.png"
                         }
                      alt="unopened pokemon card"
                    />
                                        
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    {turnedCard[index]===true ? 
                        <>
                            <Typography align="center" gutterBottom variant="h6" component="h2">
                              {card.name}  
                            </Typography>
                            <Typography align="center" gutterBottom variant="h6" component="h2">
                              {card.id ? `#${card.id}` : null}
                            </Typography>
                            <Typography align="center">
                                <Rating name="read-only" value={card.stars} readOnly />
                            </Typography>
                        </>
                        :
                        <Typography align="center" py={5}/* gutterBottom */ variant="h6" component="h2">
                          ????
                        </Typography>
                    }
                  </CardContent>                                    
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        
      </main>
      
      </div>  
      </ThemeProvider>
  );
}

export default InventoryDetails; 