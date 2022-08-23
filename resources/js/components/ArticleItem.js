import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function ArticleItem(props) {
    return (
        <Grid mobile={4} laptop={3} item px="0px" pt="10px">
            <Box
                sx={{ width: "100%" }}
                component="img"
                src={`../images/catalog-${props.item}.png`}
                borderRadius={0.5}
            />
            <Typography py={0.5} fontWeight={'bold'} fontSize={{mobile: 8.65, laptop: 24}} color={'primary'}>
                {props.tanggal}
            </Typography>
            <Typography pb={0.5} fontWeight={'bold'} fontSize={{mobile: 10.65, laptop: 24}}>
                {props.nama}
            </Typography>
            <Typography fontSize={{mobile: 8.65, laptop: 24}}>
                {props.deskripsi} 
            </Typography>
        </Grid>
    );
}
