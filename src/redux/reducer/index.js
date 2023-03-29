const initialState = {
    loggedInUser: {},
    purchasedEnvelopes:0
  };
  
  function rootReducer (state = initialState, action) {

    switch(action.type) {

        case "UPDATE_TEMP_PURCHASED_ENVELOPES":
        return {
          ...state,
          purchasedEnvelopes: action.payload
        }

        case "EMPTY_POKEMON_CARD":
          return {
            ...state,
            country:{}
          }

        case "GET_USER_INFO":
          return {
            ...state,
            loggedInUser: action.payload
          }

        case "UPDATE_USER_INFO":          
          const newPokemonList = [...state.loggedInUser.pokemons]
          for (let i=0;i<action.payload.chosenOnes.length;i++){
            if (!newPokemonList.includes(action.payload.chosenOnes[i]))
            newPokemonList.push(action.payload.chosenOnes[i])
          }          
          return {
            ...state,
            loggedInUser: {...state.loggedInUser, unopenedenvelopes:action.payload.envelopes,
              pokemons:[...newPokemonList]}
          }

        case "UPDATE_PURCHASED_ENVELOPES":           
        return {
            ...state,
            loggedInUser: {...state.loggedInUser, unopenedenvelopes:state.loggedInUser.unopenedenvelopes + action.payload}
          }

        case "RESET_USER_INFO":
          return {
            ...state,
            loggedInUser: {}
          }

        default:
          return {...state};
    };
  };
  
  export default rootReducer;