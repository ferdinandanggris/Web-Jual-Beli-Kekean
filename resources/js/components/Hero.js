import React from 'react';
import BtnBeli from './BtnBeli';
import { spacing } from '@mui/system';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Hero() {
    return(
        <Container>
            <div className="hero">
                {/* Todo: Crop gambar n Export gambar yg ada gradientnya */}
                <Box sx={{width: "100%"}}component='img' src="../images/hero.png" />
                    <div className='hero--text'>
                        <h1 className="display-4">Batik Cakhra 1.1</h1>
                        <p className="h4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. </p>
                        <Button sx={{ mt:4 }} variant="contained" color="primary" disableElevation>
                            <Typography variant="button" color="white">Beli Sekarang</Typography>
                        </Button>
                    </div>
            </div>
        </Container>
    )
}
