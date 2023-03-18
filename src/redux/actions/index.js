import axios from "axios";

export function emptyPokemonCard(){
    return{
        type: "EMPTY_POKEMON_CARD"
    }
}

export function updateUserInformation(envelopes,chosenOnes){    
    const data = {
        envelopes,
        chosenOnes
    }
return async function (dispatch) {      
      return dispatch({
        type: "UPDATE_USER_INFO",        
        payload: data
      });
    };    
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

export function resetUserInformation(){
    return async function(dispatch){
        return dispatch({
            type: "RESET_USER_INFO"
        })}
}
