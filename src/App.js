import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import AllPokemonsComponent from "../src/components/AllPokemonsComponent/AllPokemonsComponent.js";
import AuthGuard from "../src/components/AuthGuard/AuthGuard";
import Login from "../src/components/Login/Login.js";
import Navbar from "../src/components/Navbar/Navbar.js";
import NotFound from "../src/components/NotFound/NotFound";
import PokemonDetails from "../src/components/PokemonDetails/PokemonDetails";
import SignUp from "../src/components/SignUp/SignUp";


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

  const [allPokemons, setAllPokemons] = React.useState([]);
  const [allTypes, setAllTypes] = React.useState([]);

  async function fetchData (){
    const respuesta = await axios.get("http://localhost:3001/pokemons")
    if (respuesta) setAllPokemons(respuesta.data)
    const respuesta2 = await axios.get("http://localhost:3001/types")
    if (respuesta2) setAllTypes(respuesta2.data)
  }
  
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="App">

    <ThemeProvider theme={lightTheme}>
 
    <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route element={<AuthGuard/>}>
              <Route element={<Navbar setDarkLight={setDarkLight} onSearch={onSearch}/>}>
                  <Route path="/pokemons" element={<AllPokemonsComponent allTypes={allTypes} allPokemons={allPokemons} darkMode={darkMode} nameFilter={nameFilter}/>}/>
                  <Route path="/pokemons/:pokemonId" element={<PokemonDetails darkMode={darkMode}/>}/>
              </Route>
          </Route>
          <Route path="*" element={<NotFound/>}></Route>          
    </Routes>

    </ThemeProvider>
    </div>      
  );
}

export default App;
