import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MobileNav from '../components/MobileNav'
import Backdrop from '../components/backdrop';
import Filter from '../components/Filter';
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid } from '@mui/material';
import Catalog from './Catalog'

const theme = createTheme({
    palette: {
        primary: {
            main: "#FF674D"
        },
        secondary: {
            main: "#7776BC"
        },
        subtitle : "rgb(0, 0, 0, 31%)"
    },
    typography: {
        "fontFamily": `"Poppins", "Helvetica", "Arial", sans-serif`,
        "fontSize": 14,
        "fontWeightLight": 300,
        "fontWeightRegular": 400,
        "fontWeightMedium": 500,
        button: {
            textTransform: 'none'
        }
    },
    shape: {
        borderRadius: 12,
    }, 
    breakpoints: {
        values: {
          mobile: 0,
          tablet: 640,
          laptop: 1024,
          desktop: 1200,
        },
    },

})
function Main() {
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <MobileNav/>
                <Backdrop/>
                <Navbar/>
                <Hero/>

                <Container>
                    <Grid spacing={2} container sx={{mt:3}}>
                        <Grid sx={{display: {mobile: 'none', laptop: 'flex'}}} item laptop={2} mobile={0}>
                            <Filter/>
                        </Grid>
                        <Grid item laptop={10} mobile={12}>
                            <Catalog/>
                        </Grid>
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default Main;

if (document.getElementById('example')) {
    ReactDOM.render(<Main/>, document.getElementById('example'));
}
