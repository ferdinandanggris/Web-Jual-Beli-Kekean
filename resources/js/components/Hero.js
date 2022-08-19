import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Hero() {
    return(
        <Container>
            <div className="hero">
                {/* Todo: Crop gambar n Export gambar yg ada gradientnya */}
                <Box sx={{width: "100%"}} component='img' src="../images/hero.png" />
                <Box sx={{position: 'absolute', top: '106px', left: '150px'}}>
                    <Typography variant="h2">Batik Cakhra 1.1</Typography>
                    <Typography color="subtitle" variant="h6">Lorem ipsum dolor sit amet, consectetur<br/> adipiscing elit. </Typography>
                    <Button sx={{ mt:4 }} variant="contained" color="primary" disableElevation>
                        <Typography variant="button" color="white">Beli Sekarang</Typography>
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
