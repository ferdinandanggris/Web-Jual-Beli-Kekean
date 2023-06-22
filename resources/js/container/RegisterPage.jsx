import { ClassNames } from "@emotion/react";
import {
    Box,
    Typography,
    Grid,
    FilledInput,
    FormControl,
    InputLabel,
    Button,
    FormHelperText,
    Alert,
    Snackbar,
    Slide,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import React from "react";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

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

function RegisterPage() {
    const history = useNavigate();
    const [register, setRegister] = React.useState({
        first_name: "",
        last_name: "",
        address: "",
        email: "",
        password: "",
        number_phone: "",
        error_list: [],
    });
    const [confirm, setConfirm] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false)

    const handleInput = (e) => {
        e.persist();
        setRegister({ ...register, [e.target.name]: e.target.value });
    };

    const handleConfirm = (e) => {
        e.persist();
        setConfirm(e.target.value);
    };



    const registerSubmit = (e) => {
        e.preventDefault();
        if (register.password === confirm) {
            const data = {
                first_name: register.first_name,
                last_name: register.last_name,
                // address: register.address,
                email: register.email,
                password: register.password,
                number_phone: register.number_phone,
            };

            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios.post("/api/register", data).then((res) => {
                    if (res.data.status === 200) {
                        localStorage.setItem("auth_token", res.data.token);
                        swal("Success", res.data.message, "success");
                        history("/");
                    } else {
                        setRegister({
                            ...register,
                            error_list: res.data.validation_errors,
                        });
                    }
                });
            });
        } else {
            setSnackbarOpen(true)
        }
    };

    const snackbarClose = () => {
        setSnackbarOpen(false)
    }

    const classes = useStyles();
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="85vh"
        >
            <Box
                textAlign={"center"}
                sx={{ border: "1px solid #CACACA", borderRadius: "16px" }}
                p={3}
            >
                <Typography fontSize={"28px"}>
                    Daftar untuk belanja
                    <Box
                        component={"span"}
                        sx={{ color: "#FF674D", fontSize: "36px" }}
                    >
                        .
                    </Box>
                </Typography>
                <Typography color="#939393" fontSize={"12px"}>
                    Sudah punya akun?{" "}
                    <Box
                        component={"span"}
                        sx={{ color: "#FF674D", fontSize: "12px" }}
                    >
                        <Button
                            onClick={() => history("/login")}
                            variant="text"
                        >
                            <Typography fontSize="14px">
                                Masuk Sekarang
                            </Typography>
                        </Button>
                    </Box>
                </Typography>
                <form onSubmit={registerSubmit}>
                    <Grid container sx={{ maxWidth: 450, mt: 2 }} spacing={2}>
                        <Grid item mobile={6}>
                            <FormControl
                                error={
                                    register.error_list.first_name
                                        ? true
                                        : false
                                }
                                fullWidth
                                variant="filled"
                            >
                                <InputLabel htmlFor="component-filled">
                                    First Name
                                </InputLabel>
                                <FilledInput
                                    id="component-filled"
                                    disableUnderline={true}
                                    onChange={handleInput}
                                    name="first_name"
                                    value={register.first_name}
                                    classes={{
                                        root: classes.root,
                                        input: classes.input,
                                    }}
                                />
                                <FormHelperText sx={{ fontSize: 10 }}>
                                    {register.error_list.first_name}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item mobile={6}>
                            <FormControl
                                error={
                                    register.error_list.last_name ? true : false
                                }
                                fullWidth
                                variant="filled"
                            >
                                <InputLabel htmlFor="component-filled">
                                    Last Name
                                </InputLabel>
                                <FilledInput
                                    id="component-filled"
                                    disableUnderline={true}
                                    onChange={handleInput}
                                    value={register.last_name}
                                    name="last_name"
                                    classes={{
                                        root: classes.root,
                                        input: classes.input,
                                    }}
                                />
                                <FormHelperText sx={{ fontSize: 10 }}>
                                    {register.error_list.last_name}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        {/* <Grid item mobile={12}>
                            <FormControl
                                error={
                                    register.error_list.address ? true : false
                                }
                                fullWidth
                                variant="filled"
                            >
                                <InputLabel htmlFor="component-filled">
                                    Address
                                </InputLabel>
                                <FilledInput
                                    id="component-filled"
                                    disableUnderline={true}
                                    onChange={handleInput}
                                    value={register.address}
                                    name="address"
                                    classes={{
                                        root: classes.root,
                                        input: classes.input,
                                    }}
                                />
                                <FormHelperText>
                                    {register.error_list.address}
                                </FormHelperText>
                            </FormControl>
                        </Grid> */}
                        <Grid item mobile={12}>
                            <FormControl
                                error={
                                    register.error_list.number_phone
                                        ? true
                                        : false
                                }
                                fullWidth
                                variant="filled"
                            >
                                <InputLabel htmlFor="component-filled">
                                    Phone Number
                                </InputLabel>
                                <FilledInput
                                    id="component-filled"
                                    disableUnderline={true}
                                    onChange={handleInput}
                                    value={register.number_phone}
                                    name="number_phone"
                                    classes={{
                                        root: classes.root,
                                        input: classes.input,
                                    }}
                                />
                                <FormHelperText>
                                    {register.error_list.number_phone}
                                </FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item mobile={12}>
                            <FormControl
                                error={register.error_list.email ? true : false}
                                fullWidth
                                variant="filled"
                            >
                                <InputLabel htmlFor="component-filled">
                                    Email
                                </InputLabel>
                                <FilledInput
                                    id="component-filled"
                                    disableUnderline={true}
                                    value={register.email}
                                    onChange={handleInput}
                                    name="email"
                                    classes={{
                                        root: classes.root,
                                        input: classes.input,
                                    }}
                                />
                                <FormHelperText>
                                    {register.error_list.email}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item mobile={12}>
                            <FormControl
                                error={
                                    register.error_list.password ? true : false
                                }
                                fullWidth
                                variant="filled"
                            >
                                <InputLabel htmlFor="component-filled">
                                    Password
                                </InputLabel>
                                <FilledInput
                                    id="component-filled"
                                    disableUnderline={true}
                                    onChange={handleInput}
                                    value={register.password}
                                    type="password"
                                    name="password"
                                    classes={{
                                        root: classes.root,
                                        input: classes.input,
                                    }}
                                />
                                <FormHelperText>
                                    {register.error_list.password}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item mobile={12}>
                            <FormControl
                                error={
                                    register.error_list.password ? true : false
                                }
                                fullWidth
                                variant="filled"
                            >
                                <InputLabel htmlFor="component-filled">
                                    Confirm Password
                                </InputLabel>
                                <FilledInput
                                    id="component-filled"
                                    disableUnderline={true}
                                    onChange={handleConfirm}
                                    value={confirm}
                                    type="password"
                                    name="confirmPassword"
                                    classes={{
                                        root: classes.root,
                                        input: classes.input,
                                    }}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button
                            type="submit"
                            variant="contained"
                            disableElevation={true}
                            sx={{ mt: 3, mr: 2 }}
                        >
                            <Typography color="white" sx={{ px: 6, py: 1 }}>
                                Daftar
                            </Typography>
                        </Button>
                    </Box>
                </form>
            </Box>
            <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'} } open={snackbarOpen} autoHideDuration={6000} onClose={snackbarClose}>
                <Alert
                    onClose={snackbarClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    Password tidak sesuai!
                </Alert>
            </Snackbar>
        </Box>
    );
}

export default RegisterPage;
