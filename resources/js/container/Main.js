import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import MobileNav from '../components/MobileNav'
import Filter from '../components/Filter';
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Grid } from '@mui/material';
import MainPage from './MainPage'
import Footer from '../components/Footer'
import CatalogPage from './CatalogPage';

function Main() {
    return (
        <div>
            <Hero/>
            <Container>
                <Grid spacing={0} container sx={{mt:3}}>
                    <Grid sx={{display: {mobile: 'none', laptop: 'flex'}}} item laptop={2} mobile={0}>
                        <Filter/>
                    </Grid>
                    <Grid item laptop={10} mobile={12}>
                        <MainPage/>
                    </Grid>
                </Grid>
            </Container>
            <Footer/>
        </div>
    );
}

export default Main;
