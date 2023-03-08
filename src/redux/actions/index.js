import axios from "axios";

export function emptyPokemonCard(){
    return{
        type: "EMPTY_POKEMON_CARD"
    }
}

export function getUserInformation(id, password){
    
    const data = {id,password}

    return async function(dispatch){
        const response = await axios.patch("http://localhost:3001/users", data);
        return dispatch({
            type: "GET_USER_INFO",
            payload: response.data
        })}
}
