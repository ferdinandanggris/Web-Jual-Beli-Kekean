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
import { typography } from '@mui/system';

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
        "fontWeightMedium": 500
    },
    shape: {
            borderRadius: 12,
        }, 
})
function Main() {
    
    const [sidebar, setSidebar] = React.useState(false)

    const toggleSidebar = () => {
        setSidebar(prevState => !prevState)
    }
    return (
        <div>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <MobileNav sidebar={sidebar}/>
                <Backdrop sidebar={sidebar}/>
                <Navbar openSidebar={toggleSidebar}/>
                <Hero/>

                <Container>
                    <Grid spacing={2} container sx={{mt:3}}>
                        <Grid item md={2}>
                            <Filter/>
                        </Grid>
                        <Grid item md={10}>
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
