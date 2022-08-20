import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function CatalogItem(props) {
    return(
        <>
        <Grid xs={2} lg={4} item px="12px" pt="10px">
            <Box sx={{width: "100%"}} component='img' src={`../images/catalog-${props.item}.png`} />
            <Container sx={{border: "1px solid #D9D9D9", borderTop: "none", borderRadius: "0px 0px 10px 10px"}}>
            <Typography pt={1} fontWeight="500">{props.nama}</Typography>
            <hr></hr>
            <Typography pb={1} fontWeight="500">{`Rp. ${props.harga.toLocaleString()}`}</Typography>
            <Typography fontWeight="500" sx={{color: "rgb(0,0,0,41%)"}} pt={1} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. .</Typography>
            <Grid container>
                <Grid item lg={7}>
                    <Button sx={{ px:1, my:3 }} variant="contained" color="primary" disableElevation>
                        <Typography variant="button" color="white">Beli Sekarang</Typography><Typography pl={0.5} fontSize={17} color="white" className='bx bx-shopping-bag'></Typography>
                    </Button>
                </Grid>
                <Grid item lg={1}>
                    <Button sx={{ px:1, my:3}} variant="contained" color="secondary" disableElevation>
                        <Typography class='bx bx-cart'/>
                    </Button>
                </Grid>
            </Grid>
            </Container>
        </Grid>
        </>
    )
}
