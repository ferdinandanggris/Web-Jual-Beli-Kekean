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
import { useNavigate, useParams } from "react-router";
import axios from "axios";

function EditPayment() {
    const history = useNavigate();
    const idPayment = useParams().id;
    const [input, setInput] = React.useState({
        id: idPayment,
        namaBank: "",
        rekening: "",
        jenis: "",
    });
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
    const pilihanBank = () => {
        if (input.jenis == 1) {
            return (
                <>
                    <MenuItem value={"BCA"}>BCA</MenuItem>
                    <MenuItem value={"Mandiri"}>Mandiri</MenuItem>
                    <MenuItem value={"Cimb_Niaga"}>Cimb Niaga</MenuItem>
                    <MenuItem value={"BNI"}>BNI</MenuItem>
                </>
            );
        } else if (input.jenis == 2) {
            return (
                <>
                    <MenuItem value={"OVO"}>OVO</MenuItem>
                    <MenuItem value={"Dana"}>Dana</MenuItem>
                    <MenuItem value={"Gopay"}>Gopay</MenuItem>
                    <MenuItem value={"Shopeepay"}>Shopeepay</MenuItem>
                </>
            );
        }
    };

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const savePayment = async (e) => {
        e.preventDefault();

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.put("api/update-payment", input).then((res) => {
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

    React.useEffect(() => {
        axios.get(`/api/payments/${idPayment}`).then((res) => {
            console.log(res);
            setInput({
                jenis: Number(res.data.payments.jenis),
                namaBank: res.data.payments.nama_bank,
                rekening: res.data.payments.nomor_rekening,
            });
        });
    }, []);

    const classes = useStyles();
    return (
        <Container sx={{ my: 5 }}>
            <Paper elevation={5}>
                <Container sx={{ py: 5 }}>
                    <form onSubmit={savePayment} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item mobile={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        Bank / E-Wallet
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Bank / E-Wallet"
                                        name="jenis"
                                        value={input.jenis}
                                        onChange={handleInput}
                                    >
                                        <MenuItem value={1}>Bank</MenuItem>
                                        <MenuItem value={2}>Ewallet</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item mobile={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">
                                        {input.jenis != null
                                            ? `Nama ${
                                                  input.jenis == 1
                                                      ? "Bank"
                                                      : "E-Wallet"
                                              }`
                                            : "Silahkan pilih jenis rekening"}
                                    </InputLabel>
                                    <Select
                                        disabled={input.jenis == null}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label={
                                            input.jenis != null
                                                ? `Nama ${
                                                      input.jenis == 1
                                                          ? "Bank"
                                                          : "E-Wallet"
                                                  }`
                                                : "Silahkan pilih jenis rekening"
                                        }
                                        name="namaBank"
                                        value={input.namaBank}
                                        onChange={handleInput}
                                    >
                                        {input.jenis == 1
                                            ? [
                                                  <MenuItem
                                                      key={1}
                                                      value={"BCA"}
                                                  >
                                                      BCA
                                                  </MenuItem>,
                                                  <MenuItem
                                                      key={2}
                                                      value={"Mandiri"}
                                                  >
                                                      Mandiri
                                                  </MenuItem>,
                                                  <MenuItem
                                                      key={3}
                                                      value={"Cimb_Niaga"}
                                                  >
                                                      Cimb Niaga
                                                  </MenuItem>,
                                                  <MenuItem
                                                      key={4}
                                                      value={"BNI"}
                                                  >
                                                      BNI
                                                  </MenuItem>,
                                              ]
                                            : [
                                                  <MenuItem
                                                      key={1}
                                                      value={"OVO"}
                                                  >
                                                      OVO
                                                  </MenuItem>,
                                                  <MenuItem
                                                      key={2}
                                                      value={"Dana"}
                                                  >
                                                      Dana
                                                  </MenuItem>,
                                                  <MenuItem
                                                      key={3}
                                                      value={"Gopay"}
                                                  >
                                                      Gopay
                                                  </MenuItem>,
                                                  <MenuItem
                                                      key={4}
                                                      value={"Shopeepay"}
                                                  >
                                                      Shopeepay
                                                  </MenuItem>,
                                              ]}
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* <Grid item mobile={6}>
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
                                    {input.error_list.product_name}
                                </FormHelperText>
                            </Grid> */}

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

export default EditPayment;
