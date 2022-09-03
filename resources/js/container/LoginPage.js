import { ClassNames } from "@emotion/react";
import {
    Box,
    Typography,
    TextField,
    FilledInput,
    FormControl,
    InputLabel,
    Button,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: 10,
    },
    input: {
        "&:-webkit-autofill": {
            borderRadius: 10,
        },
    },
}));
function LoginPage() {
    const classes = useStyles();
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="85vh"
        >
            <Box textAlign={"center"} sx={{border: '1px solid #CACACA', borderRadius: '16px'}} p={5}>
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
                <FormControl fullWidth variant="filled" sx={{ mb: 2, mt: 5 }}>
                    <InputLabel htmlfor="component-filled">Email</InputLabel>
                    <FilledInput
                        id="component-filled"
                        disableUnderline={true}
                        classes={{
                            root: classes.root,
                            input: classes.input,
                        }}
                    />
                </FormControl>

                <FormControl fullWidth variant="filled">
                    <InputLabel htmlfor="component-filled">Password</InputLabel>
                    <FilledInput
                        type="password"
                        id="component-filled"
                        disableUnderline={true}
                        classes={{
                            root: classes.root,
                            input: classes.input,
                        }}
                    />
                </FormControl>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button variant='contained' disableElevation="true" sx={{mt: 3, mr: 2}}>
                        <Typography color='white' sx={{px: 6, py: 1}}>
                        Masuk
                        </Typography>
                    </Button>
                    <Button variant='text' disableElevation="true" sx={{mt: 3}}>
                        <Typography color='primary' sx={{px: 4, py: 1}}>
                        Lupa Password
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default LoginPage;
