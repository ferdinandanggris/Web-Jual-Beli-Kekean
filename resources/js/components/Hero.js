import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Hero() {
    return(
        <Container>
            <div className="hero">
                <Box sx={{width: "100%"}} component='img' src="../images/hero.png" />
                <Box sx={{position: 'absolute', top: '6.5rem', left: '9rem'}}>
                    <Typography fontWeight={'medium'} fontSize={50}>Batik Cakhra 1.1</Typography>
                    <Typography fontWeight={600} color="subtitle" variant="h6">Lorem ipsum dolor sit amet, consectetur<br/> adipiscing elit. </Typography>
                    <Button sx={{ px:1, mt:4 }} variant="contained" color="primary" disableElevation>
                        <Typography variant="button" color="white">Beli Sekarang</Typography><Typography pl={0.5} fontSize={17} color="white" className='bx bx-shopping-bag'></Typography>
                    </Button>
                </Box>
            </div>
        </Container>
    )
}
