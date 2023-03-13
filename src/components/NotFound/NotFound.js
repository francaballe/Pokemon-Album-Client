import { Box } from '@mui/system';
import CardMedia from '@mui/material/CardMedia';

function NotFound() {

  return (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ml: "auto",
        mr: "auto",
        width: "20%",
        pt: "10%"  
    }}>
      <CardMedia 
        component="img"
        image={"https://res.cloudinary.com/dqnpgchkn/image/upload/v1678730045/Pokemons%20Album/AllTypes_xrdqg4.svg"}
        alt="type image"
      />
      <h1>Page Not Found!</h1>

    </Box>
  );
}

export default NotFound;
