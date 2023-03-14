import { Box } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';

function NoMatch() {

  return (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ml: "auto",
        mr: "auto",
        width: "20%",
        pt: "5%"  
    }}>
      <CardMedia 
        component="img"
        image={"https://res.cloudinary.com/dqnpgchkn/image/upload/v1678762228/Pokemons%20Album/Psyduck-removebg-preview_rp2bpu.png"}
        alt="type image"
      />
      <h1>No Matching Pokemon!</h1>

    </Box>
  );
}

export default NoMatch;
