import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './container/Main'
import CatalogPage from './container/CatalogPage';
import Navbar from './components/Navbar'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

function Navs() {
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
    return (
        <ThemeProvider theme={theme}>
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" exact element={<Main/>}/>
                <Route path="/catalog" element={<CatalogPage/>}/>
            </Routes>
        </Router>
    </ThemeProvider>
    );
}

export default Navs;

if (document.getElementById('app')) {
    ReactDOM.render(<Navs/>, document.getElementById('app'));
}
