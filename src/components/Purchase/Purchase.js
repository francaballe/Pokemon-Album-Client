import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import * as React from 'react';


const tiers = [
  {
    title: 'Basic ( x1 )',
    price: '0.25',    
    description: [
      'It contains a 5 cards envelope x 1'            
    ]    
  },
  {
    title: 'Premium ( x9 )',
    subheader: 'Most popular',
    price: '1.50',
    description: [
      'It contains a 5 cards envelope x 9'
    ]
  },
  {
    title: 'Advanced ( x3 )',
    price: '0.60',
    description: [
      'It contains a 5 cards envelope x 3'
    ]
  },
];


function PricingContent() {

const [totalToPay, setTotalToPay] = React.useState(0)
const [totalEnvelopes, setTotalEnvelopes] = React.useState(0)


/********************************************************HANDLERS*************************************************************/

function handleIncrement (title){  
  switch(title){
    case "Basic ( x1 )":      
      setTotalToPay((parseFloat(totalToPay)+parseFloat(tiers[0].price)).toFixed(2))      
      break;
    case "Advanced ( x3 )":      
      setTotalToPay((parseFloat(totalToPay)+parseFloat(tiers[2].price)).toFixed(2))      
      break;
    case "Premium ( x9 )":      
      setTotalToPay((parseFloat(totalToPay)+parseFloat(tiers[1].price)).toFixed(2))      
      break;
    //default:
  }
  
}

function handleDecrement (title){
  console.log("hice click en un menos:",title)
}


/*****************************************************************************************************************************/

  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
          
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }} >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Purchase
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p" gutterBottom>
          Please, be aware of the following:
        </Typography>
        <Typography variant="h7" align="center" color="text.secondary" component="p" gutterBottom>          
          * total price will not be adjusted for your convenience. For instance, if you buy 9 Basic products you will be paying
          way more than the Premium Package.          
        </Typography>
        <Typography variant="h7" align="center" color="text.secondary" component="p" gutterBottom>          
          * as a general game rule, there is nothing to do with repeated cards so far. If you get a repeated card, it's the 
          same as getting nothing.
        </Typography>
        <Typography variant="h7" align="center" color="text.secondary" component="p" gutterBottom>          
          * there is no money refund. When you press the confirmation button you get new envelopes right away and there's nothing
          we can do to reverse it.
        </Typography>
      </Container>

      <Container maxWidth="md" component="main" sx={{borderColor: 'red'}}>
        <Grid container spacing={5} alignItems="flex-end" sx={{borderColor: 'red'}}>
          {tiers.map((tier) => (            
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={6}
              md={4}
            >
              <Card sx={{ display: 'flex', flexDirection: 'column', border: 5, borderRadius: 10,
                  boxShadow:  tier.title.includes("Basic") ? '10px 5px 5px grey' :
                              tier.title.includes("Premium") ? '10px 5px 5px #C99700' :
                              '10px 5px 5px blue',
                  borderColor:  tier.title.includes("Basic") ? '#A1AEB1' :
                                tier.title.includes("Premium") ? 'yellow' :
                                '#355BF5'                  
                  }}>

                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}                  
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{background: (theme) =>
                      theme.palette.mode === 'light' &&
                      (tier.title.includes("Basic") ? 'linear-gradient(to right bottom, #262626, #808080)' :
                      tier.title.includes("Premium") ? 'linear-gradient(to right bottom,orange, yellow, white)' :
                      'linear-gradient(to right bottom, #0000ff, #9999ff)'
                      )                                            
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      US$ {tier.price}
                    </Typography>                    
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <IconButton onClick={()=>handleDecrement(tier.title)}>
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs>
                        <TextField fullWidth defaultValue={0} type="number"
                        sx={{ '& input': { textAlign: 'center' } }}                        
                        />
                    </Grid>
                    <Grid item>
                      <IconButton onClick={()=>handleIncrement(tier.title)}>
                        <AddCircleOutlineIcon />
                      </IconButton>
                    </Grid>

                  </Grid>
                  
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
      
      <Typography component="h2" variant="h4" color="text.primary">
                      Total: US$ {totalToPay}
      </Typography>        

      </Container>
      
    </React.Fragment>
  );
}

export default function Purchase() {
  return <PricingContent />;
}