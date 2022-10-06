import { ClassNames } from "@emotion/react";
import {
    Box,
    Typography,
    FilledInput,
    FormControl,
    InputLabel,
    Button,
    FormHelperText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import swal from "sweetalert";

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
    const history = useNavigate();
    const [login, setLogin] = React.useState({
        email: "",
        password: "",
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setLogin({ ...login, [e.target.name]: e.target.value });
    };

    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: login.email,
            password: login.password,
        };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post(`api/login`, data).then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("auth_token", res.data.token);
                    localStorage.setItem("auth_email", res.data.email);
                    swal("Success", res.data.message);
                    if (res.data.role === "admin") {
                        history("/admin");
                    } else {
                        history("/");
                    }
                    location.reload();
                } else if (res.data.status === 401) {
                    swal("Warning", res.data.message, "warning");
                } else {
                    setLogin({
                        ...login,
                        error_list: res.data.validation_errors,
                    });
                }
            });
        });
    };

    const classes = useStyles();
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="85vh"
        >
            <form onSubmit={loginSubmit}>
                <Box
                    textAlign={"center"}
                    sx={{ border: "1px solid #CACACA", borderRadius: "16px" }}
                    p={5}
                >
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
                        Belum punya akun?
                        <Box
                            component={"span"}
                            sx={{ color: "#FF674D", ml: 1 }}
                        >
                            <Button
                                onClick={() => history("/register")}
                                variant="text"
                            >
                                <Typography fontSize="14px">Daftar Sekarang</Typography>
                            </Button>
                        </Box>
                    </Typography>
                    <FormControl
                        error={login.error_list.email ? true : false}
                        fullWidth
                        variant="filled"
                        sx={{ mb: 2, mt: 5 }}
                    >
                        <InputLabel htmlfor="component-filled">
                            Email
                        </InputLabel>
                        <FilledInput
                            onChange={handleInput}
                            value={login.email}
                            name="email"
                            id="component-filled"
                            disableUnderline={true}
                            classes={{
                                root: classes.root,
                                input: classes.input,
                            }}
                        />
                        <FormHelperText sx={{ fontSize: 10 }}>
                            {login.error_list.email}
                        </FormHelperText>
                    </FormControl>

                    <FormControl
                        error={login.error_list.password ? true : false}
                        fullWidth
                        variant="filled"
                    >
                        <InputLabel htmlfor="component-filled">
                            Password
                        </InputLabel>
                        <FilledInput
                            type="password"
                            onChange={handleInput}
                            value={login.password}
                            name="password"
                            id="component-filled"
                            disableUnderline={true}
                            classes={{
                                root: classes.root,
                                input: classes.input,
                            }}
                        />
                        <FormHelperText sx={{ fontSize: 10 }}>
                            {login.error_list.password}
                        </FormHelperText>
                    </FormControl>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disableElevation="true"
                            sx={{ mt: 3, mr: 2 }}
                        >
                            <Typography color="white" sx={{ px: 6, py: 1 }}>
                                Masuk
                            </Typography>
                        </Button>
                        <Button
                            variant="text"
                            disableElevation="true"
                            sx={{ mt: 3 }}
                        >
                            <Typography color="primary" sx={{ px: 4, py: 1 }}>
                                Lupa Password
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </form>
        </Box>
    );
}

export default LoginPage;
