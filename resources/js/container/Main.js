import React from 'react';
import Hero from '../components/Hero'
import Filter from '../components/Filter';
import Container from '@mui/material/Container'
import { Grid } from '@mui/material';
import MainPage from './MainPage'
import Footer from '../components/Footer'

function Main() {
    return (
        <div>
            <Container sx={{px: {mobile: 5, laptop: 10}}}>
                <Hero/>
                <Grid spacing={0} container sx={{mt:{laptop: 15, mobile: 7}}}>
                    <Grid sx={{display: {mobile: 'none', laptop: 'flex'}}} item laptop={2}>
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
