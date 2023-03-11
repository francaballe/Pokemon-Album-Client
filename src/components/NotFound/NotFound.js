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
        width: "20%"  
    }}>
      <CardMedia 
        component="img"
        image={"https://res.cloudinary.com/dqnpgchkn/image/upload/c_scale,h_128,w_128/v1678473311/Pokemon-Icons/AllTypes_fb6pbn.svg"}
        alt="type image"
      />
      <h1>Page Not Found!</h1>

    </Box>
  );
}

export default NotFound;
