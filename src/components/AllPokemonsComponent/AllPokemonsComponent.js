import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Rating from '@mui/material/Rating';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import NoMatch from "../AllPokemonsComponent/NoMatch/NoMatch";
import RarityRating from './RarityRating/RarityRating';
import Swal from "sweetalert2";
import axios from "axios";
import { updatePurchasedEnvelopes, updateTempPurchasedEnvelopes } from "../../redux/actions/index";


function AllPokemonsComponent({allTypes, allPokemons, darkMode, nameFilter}) {
  const userData = useSelector((state) => state.loggedInUser);
  const tempTotalEnvelopes = useSelector((state) => state.purchasedEnvelopes);
  const navigate = useNavigate();
  const { search } = useLocation();
  const [rarity, setRarity] = React.useState("Any Rarity");  
  const [type, setType] = React.useState(allTypes.length ? allTypes[0].name : "");
  const [order, setOrder] = React.useState("No Order");
  const [available, setAvailable] = React.useState("Show All");
  const crossAccessToken = process.env.REACT_APP_CROSS_ACCESS_TOKEN
  const dispatch = useDispatch();

  //STYLES
  const pokemonTypeStyle = { height:'3vh' }

  //PAGING
  const pokemonsPerPage = 16
  const [page, setPage] = React.useState(1);
  const allPokemonsCpy = [...allPokemons]

  const mapRarity = {
    "Any Rarity":0,
    "Common":1,
    "Uncommon":2,
    "Rare":3,
    "Epic":4,
    "Legendary":5
  }

  const filteredByRarity = mapRarity[rarity]!==0 ? (allPokemonsCpy.filter(onePokemon => onePokemon.stars===mapRarity[rarity])) 
  : allPokemonsCpy

  const filteredByType = type!=="Any Type" ? (filteredByRarity.filter(
    OnePokemon => OnePokemon.types.some(obj => obj.name===type.toLocaleLowerCase())))
  : filteredByRarity

  const filteredByAvailability = !available.includes("Show All") ? (available.includes("Available Pokemons") ?
  filteredByType.filter(onePokemon => userData.id && userData.pokemons.includes(onePokemon.id))
  :
  filteredByType.filter(onePokemon => userData.id && !userData.pokemons.includes(onePokemon.id)))
  : filteredByType

  const filteredBySearch = nameFilter ? filteredByAvailability.filter(onePokemon => onePokemon.name.includes(nameFilter))
  : filteredByAvailability

  switch (order){
    case "Name (A-Z)": (filteredBySearch.sort((x, y) => x.name.localeCompare(y.name)))
    break;
    case "Name (Z-A)": (filteredBySearch.sort((x, y) => y.name.localeCompare(x.name)))
    break;
    case "Rarity (Uncommon to Legendary)": (filteredBySearch.sort((x, y) => x.stars - y.stars))
    break;
    case "Rarity (Legendary to Uncommon)": (filteredBySearch.sort((x, y) => y.stars - x.stars))
    break;
    /* default:  */
  }

  const pokemonsTotalPages = Math.ceil(filteredBySearch.length / pokemonsPerPage)
  const pokemonsToShow = filteredBySearch.slice((pokemonsPerPage*page)-pokemonsPerPage,pokemonsPerPage*page)
  
  const pokemonRarities = ["Any Rarity","Common","Uncommon","Rare","Epic","Legendary"]
  const pokemonOrders = ["No Order","Name (A-Z)", "Name (Z-A)", "Rarity (Uncommon to Legendary)","Rarity (Legendary to Uncommon)"]
  
  const pokemonInventory = [
    {
      text:"Show All",
      number: 672
    },
    {
      text:"Available Pokemons",
      number: userData.pokemons.length
    },
    {
      text:"Missing Pokemons",
      number:672-userData.pokemons.length
    }
  ]
  

  //Setting the page as 1 when using the searchBar (intentionally)
  React.useEffect(()=>{
    setPage(1)
  },[nameFilter])

  React.useEffect(()=>{
    if (allTypes.length)
    setType(allTypes[0].name)
    //console.log("el tipo cambio....")
    //const [type, setType] = React.useState(allTypes.length ? allTypes[0].name : "Any Type");
  },[allTypes])
  

  /****************************************************Handlers**************************************************************/

  function handleTypeChange (event){
    setType(event.target.value)
    setPage(1)
  }

  function handleRarityChange (event){
    setRarity(event.target.value);
    setPage(1)
  }

  function handleOrderChange (event){
    setOrder(event.target.value)
    setPage(1)
  }

  function handleInventoryChange (event){
    setAvailable(event.target.value)
    setPage(1)
  }

  function handlePageChange (event, value){
    setPage(value);
  }

  function handleMoreInfoClick (id){
    navigate(`/pokemons/${id}`)
  }

/**************************************************************************************************************************/

React.useEffect(()=>{  
  if (search.includes("approved")){   
    navigate(`/pokemons`)
    const data = {
      "id": userData.id,
	    "unopenedenvelopes":userData.unopenedenvelopes+tempTotalEnvelopes,
	    "token": crossAccessToken      
    }
    const respuesta = axios.put("http://localhost:3001/users",data)
    if (respuesta)  dispatch(updatePurchasedEnvelopes(tempTotalEnvelopes))            
    
    Swal.fire({
      title:"Purchase Success!",
      text:'Please check your available envelopes and have fun!!!',
      icon:'success',
      timer: 4000
    });
  }

  if (search.includes("rejected")){    
    Swal.fire({
      title:"Purchase Error!",
      text:'There was an error with your purchase',
      icon:'error',
      timer: 4000
    });
  }
      
  //TEMP RESET...this is magic, just like Messi
  if (tempTotalEnvelopes>0) dispatch(updateTempPurchasedEnvelopes(0))            

},[tempTotalEnvelopes])


  return (
    
      <div>
      <CssBaseline />
      <AppBar position="relative">

        <Toolbar sx={{ pt: 0, justifyContent:"space-evenly" }}>
          <Box>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="Pokemon-Type-label-id">Pokemon Type</InputLabel>
                <Select /* value={allTypes.length ? allTypes[0].name : ""} */value={type} label="Pokemon Type" onChange={handleTypeChange}>
                    {allTypes.map(oneType => 
                    <MenuItem key={oneType.id} value={oneType.name}>
                      <Box sx={{display: "flex", alignItems:"center", justifyContent: "space-between", width:"100%"}}>
                        {oneType.name}
                        <Box sx={{display: "flex", justifyItems:"center"}}>
                          <CardMedia 
                            style={pokemonTypeStyle}
                            component="img"
                            image={oneType.image}
                            alt="type image"
                          />
                        </Box>
                      </Box>
                    </MenuItem>)}
                </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="Pokemon-Rarity-label-id">Pokemon Rarity</InputLabel>
                <Select value={rarity} label="Pokemon Rarity" onChange={handleRarityChange}>
                    {pokemonRarities.map((oneRarity,indice) => 
                    <MenuItem key={oneRarity} value={oneRarity}>
                    <Box sx={{display: "flex", alignItems:"center", justifyContent: "space-between", width:"100%"}}>
                        {oneRarity}
                        <Box sx={{display: "flex", justifyItems:"center", ml:"10px"}}>
                            <RarityRating index={indice}/>                            
                        </Box>
                      </Box>
                    </MenuItem>)}
                </Select>
            </FormControl>
          </Box>

          <Pagination page={page} onChange={handlePageChange} count={pokemonsTotalPages} variant="outlined" shape="rounded" size="large" color="secondary"/>

          <Box>
            
            <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="Pokemon-Order-label-id">Order By</InputLabel>
                <Select value={order} label="Order By" onChange={handleOrderChange}>
                    {pokemonOrders.map(oneType => <MenuItem key={oneType} value={oneType}>{oneType}</MenuItem>)}
                </Select>
            </FormControl>            
            
            <FormControl sx={{ m: 1, minWidth: 235 }}>
              <InputLabel id="Pokemon-Inventory-label-id">Inventory</InputLabel>
                <Select value={available} label="Inventory" onChange={handleInventoryChange}>
                    {pokemonInventory.map(oneType => 
                    <MenuItem key={oneType.text} value={oneType.text}>
                      <Box sx={{display: "flex", alignItems:"center", justifyContent: "space-between", width:"90%"}}>
                        {oneType.text}
                        <Box sx={{display: "flex", justifyItems:"center"}}>
                          <Badge badgeContent={oneType.number} color="secondary" max={999}/>
                        </Box>
                      </Box>
                    </MenuItem>)}
                </Select>
            </FormControl>

          </Box>
      
        </Toolbar>

      </AppBar>
      
      <main>
              
        {filteredBySearch.length ?
        <Container maxWidth="xl" sx={{ py: 8 }}>
          <Grid container spacing={5}>            
            {pokemonsToShow.map((card) => (              
              <Grid item key={card.id} xs={12} sm={6} md={1.5}>{/* 12/5 porque quiero mostrar 5 por fila */}
                <Card
                
                  sx={{ py:1, px:1, height: '100%', display: 'flex',                                                                                           
                  flexDirection: 'column', border: 5, borderRadius: 10,
                  opacity: userData.pokemons && userData.pokemons.includes(card.id) ? '100%' : '10%',
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
                              'linear-gradient(to right bottom, #262626, #808080)'),
                  boxShadow: card.stars===5 ? '10px 5px 5px #C99700' : 
                              card.stars===4 ? '10px 5px 5px purple' : 
                              card.stars===3 ? '10px 5px 5px blue' : 
                              card.stars===2 ? '10px 5px 5px #007500' : 
                              '10px 5px 5px grey',

                    //Hover animation/transition only on available cards...
                  ':hover': userData.pokemons && userData.pokemons.includes(card.id) ?                  
                  {                                                          
                      background: 
                              (card.stars===5 ? 'orange' : 
                              card.stars===4 ? '#800080':
                              card.stars===3 ? '#0000ff':
                              card.stars===2 ? '#008000':
                              '#808080'),
                      transition: "background 1s linear"
                  }
                  :
                  null,
                              
                    }}
                >
                  <Box m={1} p={1} display="flex" justifyContent="center">
                    <CardMedia
                      component="img"
                      sx={{
                        height: '100px',
                        width: '130px',
                        objectFit: 'contain'
                      }}
                      image={card.image}
                      alt="pokemon"
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography align="center" gutterBottom variant="h6" component="h2">
                      {card.name}  
                    </Typography>
                    <Typography align="center" gutterBottom variant="h6" component="h2">
                      #{card.id}  
                    </Typography>
                    <Typography align='center'>                        
                        <Button onClick={()=>handleMoreInfoClick(card.id)} size="small" disabled={userData.pokemons && userData.pokemons.includes(card.id)?false:true}>More Info</Button>
                    </Typography>
                  </CardContent>
                                    
                  <Typography align="center">
                      <Rating name="read-only" value={card.stars} readOnly />
                  </Typography>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        :
        <NoMatch/>}
      </main>
      
      </div>  
  );
}

export default AllPokemonsComponent; 