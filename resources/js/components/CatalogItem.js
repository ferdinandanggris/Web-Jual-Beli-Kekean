import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export default function CatalogItem(props) {
    return(
        <>
        <Grid md={4} item px="12px" pt="10px">
            <Box sx={{width: "100%"}} component='img' src={`../images/catalog-${props.item}.png`} />
            <Container sx={{border: "1px solid black", borderTop: "none", borderRadius: "0px 0px 10px 10px"}}>
            <Typography pt={1} fontWeight="bold">{props.nama}</Typography>
            <hr></hr>
            <Typography pb={1} fontWeight="bold">{`Rp. ${props.harga}`}</Typography>
            </Container>
        </Grid>
        </>
    )
}
