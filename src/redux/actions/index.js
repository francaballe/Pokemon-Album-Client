import axios from "axios";

export function emptyPokemonCard(){
    return{
        type: "EMPTY_POKEMON_CARD"
    }
}

//const respuesta2 = await axios.get("http://localhost:3001/users?id=francaballe@gmail.com")
export function getUserInformation(id){
    return async function(dispatch){
        var response = await axios.get("http://localhost:3001/users?id="+id);
        return dispatch({
            type: "GET_USER_INFO",
            payload: response.data
        })}
}
