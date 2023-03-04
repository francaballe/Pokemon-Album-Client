import { blue } from "@mui/material/colors";
import blueGrey from "@mui/material/colors/blueGrey.js";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Route } from "react-router-dom";
import AllPokemonsComponent from "../src/components/AllPokemonsComponent/AllPokemonsComponent.js";
import Login from "../src/components/Login/Login.js";
import Navbar from "../src/components/Navbar/Navbar.js";
import PokemonDetails from "../src/components/PokemonDetails/PokemonDetails"


function App() {

  const [darkMode,setDarkMode] = useState("light")

  const lightTheme = createTheme({
    palette: {
      mode:darkMode,
      /* primary: blue, */
      /* secondary: blueGrey, */
      legendary: {
        main: 'yellow',
        contrastText: '#fff',
      },
      epic: {
        main: '#BF40BF',
        contrastText: '#fff',
      },
      rare: {
        main: '#355BF5',
        contrastText: '#fff',
      },
      uncommon: {
        main: '#00A300',
        dark:'#007500',
        light:'#5CFF5C',
        contrastText: '#fff',
      },
      common: {
        main: '#A1AEB1',
        contrastText: '#fff',
      },
    }
  });


  const [nameFilter, setNameFilter] = React.useState("")
  function onSearch(pokemonName) {
    setNameFilter(pokemonName)
  };

  function setDarkLight (mode){
    setDarkMode(mode)
  }

  const [allPokemons, setAllPokemons] = useState([]);

  async function fetchData (){
    const respuesta = await axios.get("http://localhost:3001/pokemons")
    if (respuesta) setAllPokemons(respuesta.data)
  }

  useEffect(()=>{
    fetchData();
  },[])
  
  return (
    <div className="App">

    <ThemeProvider theme={lightTheme}>

      <Route exact path="/" component={Login}/>

      <Route path="/pokemons" render={() =>
        <Navbar setDarkLight={setDarkLight} onSearch={onSearch}/>
      }/>

      <Route exact path="/pokemons" render={() =>
          <AllPokemonsComponent allPokemons={allPokemons} darkMode={darkMode} nameFilter={nameFilter}/>  
      }/>

      <Route
          path="/pokemons/:pokemonId"
          render={({match}) => 
          <PokemonDetails pokemonId={match.params.pokemonId} darkMode={darkMode}/>}
      />
      
    </ThemeProvider>
    </div>      
  );
}

export default App;