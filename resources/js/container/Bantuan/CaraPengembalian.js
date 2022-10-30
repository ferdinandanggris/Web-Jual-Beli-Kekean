import { Box, Container, Typography } from "@mui/material";
import React from "react";

function CaraPengembalian() {
    return (
        <Container sx={{ px: 10, pt: 10, pb: 20 }}>
            <Typography>Cara pengembalian</Typography>

            <Box sx={{ pt: 2 }}>
                <Typography>1. Pastikan barang tidak rusak</Typography>

                <Typography>2. Bungkus barang dengan rapi, pastikan tidak ada kerusakan pada kotak barang</Typography>
                <Typography>3. Tempelkan struk belanja bersama dengan kotak barang </Typography>
                <Typography>4. Kirimkan barang ke alamat berikut :  </Typography>
            </Box>
        </Container>
    );
}

export default CaraPengembalian;
