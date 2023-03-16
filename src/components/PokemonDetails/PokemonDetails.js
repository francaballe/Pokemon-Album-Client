import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HighlightOffSharpIcon from '@mui/icons-material/HighlightOffSharp';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Loader from "../Loader/Loader";


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function PokemonDetails({ darkMode }) {

  const [selectedPokemon, setSelectedPokemon] = useState(undefined)
  const navigate = useNavigate();
  const { pokemonId } = useParams(); //I'm destructuring the received data

  async function fetchData (){
    const respuesta = await axios.get(`http://localhost:3001/pokemons/${pokemonId}`)
    if (respuesta) setSelectedPokemon(respuesta.data)
  }

  useEffect(()=>{
    fetchData();
  },[])


  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function handleBackToMain (){
    navigate(`/pokemons`);
  }

  return (
    
    <div>
    <CssBaseline />
    
    <Grid
    container
    spacing={0}
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
      {selectedPokemon ? 
        <Card 
        sx={{ py:1, px:1, height: '100%', display: 'flex', maxWidth: 345, minWidth:300, 
        flexDirection: 'column', border: 5, borderRadius: 10,
        borderColor:selectedPokemon && selectedPokemon.stars===5 ? 'legendary.main' :
        selectedPokemon && selectedPokemon.stars===4 ? 'epic.main' : 
        selectedPokemon && selectedPokemon.stars===3 ? 'rare.main' : 
        selectedPokemon && selectedPokemon.stars===2 ? 'uncommon.light' : 
        'common.main',
        background: darkMode==="light" && 
        (selectedPokemon && selectedPokemon.stars===5 ? 'linear-gradient(to right bottom,orange, yellow, white)' : 
        selectedPokemon && selectedPokemon.stars===4 ? 'linear-gradient(to right bottom, #800080, #b266b2)' : 
        selectedPokemon && selectedPokemon.stars===3 ? 'linear-gradient(to right bottom, #0000ff, #9999ff)' : 
        selectedPokemon && selectedPokemon.stars===2 ? 'linear-gradient(to right bottom, #003300, #008000)' : 
        'linear-gradient(to right bottom, #262626, #808080)'),
        boxShadow: selectedPokemon && selectedPokemon.stars===5 ? '10px 5px 5px #C99700' : 
        selectedPokemon && selectedPokemon.stars===4 ? '10px 5px 5px purple' : 
        selectedPokemon && selectedPokemon.stars===3 ? '10px 5px 5px blue' : 
        selectedPokemon && selectedPokemon.stars===2 ? '10px 5px 5px #007500' : 
        '10px 5px 5px grey' }}
        >

      <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" color="text.secondary" ml={2}>
                #{selectedPokemon?selectedPokemon.id:""}
          </Typography>
          <CardActions onClick={handleBackToMain} disableSpacing sx={{ml:"auto"}}>
              <IconButton aria-label="Close">
                  <HighlightOffSharpIcon />
              </IconButton>
          </CardActions>      
      </Box>

      <Box m={1} p={1} display="flex" justifyContent="center">
          <CardMedia  
          component="img"
          image={selectedPokemon?selectedPokemon.image:""}
          alt="One Pokemon"
          sx={{
            height: '200px',
            width: '350px',
            objectFit: 'contain'
          }}
          />
      </Box>

          <CardContent>
            <Typography variant="h4" color="text.secondary" textAlign={"center"}>
                {selectedPokemon?selectedPokemon.name:""}
            </Typography>
          </CardContent>
                  <Typography align="center">
                      <Rating name="read-only" value={selectedPokemon? parseInt(selectedPokemon.stars):0} readOnly />
                  </Typography>
          <CardActions disableSpacing>
          
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
      
        <Box borderRadius={4} sx={{backgroundColor:"grey"}}>
            <Typography variant="h5" textAlign={"center"}>
                  Pokemon Stats
            </Typography>
        </Box>

        <Box m={1} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
                  Attack:{selectedPokemon && selectedPokemon.attack}
            </Typography>
            <Typography variant="h6">
            Defense:{selectedPokemon && selectedPokemon.defense}
          </Typography>
        </Box>
        <Box m={1} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
                Height:{selectedPokemon && selectedPokemon.height}
            </Typography>
            <Typography variant="h6">
                Weight:{selectedPokemon && selectedPokemon.weight}
          </Typography>
        </Box>
        <Box m={1} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
                Life:{selectedPokemon && selectedPokemon.life}
            </Typography>
            <Typography variant="h6">
                Speed:{selectedPokemon && selectedPokemon.speed}
          </Typography>
        </Box>

        <Box borderRadius={4} sx={{backgroundColor:"grey"}}>
            <Typography variant="h5" textAlign={"center"}>
                  Pokemon Types
            </Typography>
        </Box>
        <Box display="flex" justifyContent="space-evenly" alignItems="center" py={1}>
        {selectedPokemon && selectedPokemon.types.map(oneType => 
          <CardMedia
          key={oneType.id}  
          component="img"
          image={oneType?oneType.image:""}
          alt="One Pokemon type"
          sx={{ width: '20%', alignContent:"center", py:1 }}
          />
          )}
        </Box>

        </CardContent>
      </Collapse>
    </Card>
    : 

    <Box display="flex" justifyContent="space-evenly" alignItems="center" py={1}>
        <Loader sx={{margin: 0, display: "flex",
        justifyContent: "center", alignItems: "center", height:"100%"}}/>
    </Box>
    } 

    </Grid>   
    
  </Grid>  
    </div>
  );
  
}
        

export default PokemonDetails; 