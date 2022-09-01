import { ClassNames } from "@emotion/react";
import { Box, Typography, TextField, FilledInput, FormControl, InputLabel } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: 10
    }
}))
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
                <FormControl  fullWidth variant='filled'>
                    <InputLabel htmlfor='component-filled'>Email</InputLabel>
                    <FilledInput
                        id="component-filled"
                        disableUnderline={true}
                        classes={{
                            root: classes.root
                        }}
                    />
                </FormControl>
            </Box>
        </Box>
    );
}

export default LoginPage;
