import StarIcon from '@mui/icons-material/Star';

function RarityRating({index}){

  function StyledStar ({color}){
    const starStyle = {fontSize:'20', color:color}
    return <StarIcon style={starStyle}/>
  }

  switch(index){
    case 1: 
      return <StyledStar color='grey'/>
    case 2:
      return <><StyledStar color='green'/><StyledStar color='green'/></>
    case 3:
      return <><StyledStar color='blue'/><StyledStar color='blue'/><StyledStar color='blue'/></>
    case 4:
      return <><StyledStar color='purple'/><StyledStar color='purple'/><StyledStar color='purple'/><StyledStar color='purple'/></>
    case 5:
      return <><StyledStar color='gold'/><StyledStar color='gold'/><StyledStar color='gold'/><StyledStar color='gold'/><StyledStar color='gold'/></>
    default:
      return null;  
  }
}

export default RarityRating; 