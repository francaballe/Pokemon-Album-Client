import * as React from 'react';
import {Link} from "react-router-dom";

function Login() {
  
  return (
    <div> 
      <Link to="/pokemons">
          <button onClick={()=>console.log("hola")}>LOGIN</button>
      </Link>
    </div>      
  );
}

export default Login;
