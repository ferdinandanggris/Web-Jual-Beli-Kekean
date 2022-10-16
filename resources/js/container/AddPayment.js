import { makeStyles } from "@mui/styles";
import {
    Container,
    Paper,
    FilledInput,
    InputLabel,
    FormControl,
    Grid,
    Typography,
    Button,
    FormHelperText,
    Select,
    MenuItem,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export default function AddPayment() {
    const [input, setInput] = React.useState({
        namaBank: '',
        rekening: '',
        jenis: ''
    });
    const history = useNavigate();
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

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const savePayment = async (e) => {
        e.preventDefault();

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("api/add-payment", input).then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data.message);
                    history("/admin/payment");
                } else {
                    setInput({
                        ...input,
                        error_list: res.data.validation_errors,
                    });
                }
            });
        });
    };

    const classes = useStyles();
    return (
        <Container sx={{ my: 5 }}>
            <Paper elevation={5}>
                <Container sx={{ py: 5 }}>
                    <form onSubmit={savePayment} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item mobile={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel htmlFor="component-filled">
                                        Nama Bank / E-Wallet
                                    </InputLabel>
                                    <FilledInput
                                        value={input.namaBank}
                                        onChange={handleInput}
                                        name="namaBank"
                                        id="component-filled"
                                        disableUnderline={true}
                                        classes={{
                                            root: classes.root,
                                            input: classes.input,
                                        }}
                                    />
                                </FormControl>
                                <FormHelperText
                                    sx={{ color: "red", fontSize: 10 }}
                                >
                                    {/* {input.error_list.product_name} */}
                                </FormHelperText>
                            </Grid>

                            <Grid item mobile={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel htmlFor="component-filled">
                                        Nomor Rekening
                                    </InputLabel>
                                    <FilledInput
                                        value={input.rekening}
                                        onChange={handleInput}
                                        name="rekening"
                                        id="component-filled"
                                        disableUnderline={true}
                                        classes={{
                                            root: classes.root,
                                            input: classes.input,
                                        }}
                                    />
                                    <FormHelperText
                                        sx={{ color: "red", fontSize: 10 }}
                                    >
                                        {/* {input.error_list.price} */}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item mobile={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Rekening / E-Wallet
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Rekening / E-Wallet"
                                        name="jenis"
                                        value={input.jenis}
                                        onChange={handleInput}
                                    >
                                        <MenuItem value={1}>Bank</MenuItem>
                                        <MenuItem value={2}>Ewallet</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid sx={{ mt: 5 }} item mobile={12}>
                                <Button onClick={() => history("/admin")}>
                                    <Typography color={"main"}>
                                        Cancel
                                    </Typography>
                                </Button>
                                <Button
                                    sx={{ ml: 2 }}
                                    variant="contained"
                                    type="submit"
                                >
                                    <Typography color={"white"}>
                                        Submit
                                    </Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Paper>
        </Container>
    );
}
