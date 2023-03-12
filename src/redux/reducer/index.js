const initialState = {
    loggedInUser: {}
  };
  
  function rootReducer (state = initialState, action) {

    switch(action.type) {

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