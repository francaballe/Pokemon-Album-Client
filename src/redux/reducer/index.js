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

        default:
          return {...state};
    };
  };
  
  export default rootReducer;