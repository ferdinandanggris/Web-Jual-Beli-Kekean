import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CatalogItem from '../components/CatalogItem'

export default function Catalog() {
    return(
        <Grid container spacing={2}>
            <CatalogItem nama="Batik Duwo" item="1" harga={599000}/>
            <CatalogItem nama="Chakra" item="1" harga={599000}/>
            <CatalogItem nama="Ngga tau" item="1" harga={599000}/>
            <CatalogItem nama="Ngga tau" item="1" harga={599000}/>
        </Grid>
    )
}
