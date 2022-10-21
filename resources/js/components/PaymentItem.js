import { Grid, Box, Typography } from "@mui/material";
import React from "react";

function PaymentItem(props) {
    return (
        <>
            <Grid item mobile={6}>
                <Box
                    sx={{ width: "131px" }}
                    component="img"
                    src={`../images/logo-${props.img}.png`}
                />
            </Grid>
            <Grid item mobile={6}>
                <Typography fontSize={20}>{props.rekening}</Typography>
            </Grid>
        </>
    );
}

export default PaymentItem;
