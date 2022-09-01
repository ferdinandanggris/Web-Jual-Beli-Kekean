import { ClassNames } from "@emotion/react";
import { Box, Typography, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    root: {
       [`& fieldset`]: {
             borderRadius: 0,
       },
    },
 });
function LoginPage() {
    const classes = useStyles()
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="85vh"
        >
            <Box textAlign={"center"}>
                <Typography fontSize={"32px"}>
                    Masuk untuk belanja
                    <Box
                        component={"span"}
                        sx={{ color: "#FF674D", fontSize: "40px" }}
                    >
                        .
                    </Box>
                </Typography>
                <Typography color="#939393" fontSize={"16px"}>
                    Belum punya akun?{" "}
                    <Box
                        component={"span"}
                        sx={{ color: "#FF674D", fontSize: "16px" }}
                    >
                        Daftar Sekarang
                    </Box>
                </Typography>
                <TextField
                    sx={{borderRadius: 0}}
                    fullWidth
                    InputProps={{ disableUnderline: true }}
                    id="filled-basic"
                    label="Email"
                    variant="filled"
                    classes={{root: classes.root}}
                />
            </Box>
        </Box>
    );
}

export default LoginPage;
