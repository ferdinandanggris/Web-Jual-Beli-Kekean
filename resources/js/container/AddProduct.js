import { makeStyles } from "@mui/styles";
import {
    TextField,
    Container,
    Paper,
    FilledInput,
    InputLabel,
    FormControl,
    Grid,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Typography,
    Button,
} from "@mui/material";
import React from "react";
import { DropzoneDialog } from "mui-file-dropzone";

export default function AddProduct() {
    const [open, setOpen] = React.useState(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const checkboxColor = {
        color: "#FF674D",
        "&.Mui-checked": {
            color: "#FF674D",
        },
    };

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

    const [input, setInput] = React.useState({
        product_name: "",
        price: "",
        description: "",
        has_3d: false,
    });

    const handleInput = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckbox = (e) => {
        setInput({
            ...input,
            has_3d: e.target.checked,
        });
    };

    const saveProduct = async (e) => {
        e.preventDefault();

        const res = await axios.post("api/add-product", input);
        if (res.data.status === 200) {
            console.log(res.data.message);
            setInput({
                product_name: "",
                price: "",
                description: "",
                has_3d: e.target.checked,
            });
        }
        // axios.get("/sanctum/csrf-cookie").then((response) => {
        //     axios.post("/api/login", input).then((res) => {
        //         if (res.data.status === 200) {
        //             console.log(res.data.message);
        //             setInput({
        //                 product_name: "",
        //                 price: "",
        //                 description: "",
        //                 has_3d: e.target.checked,
        //             });
        //         }
        //     });
        // });
    };

    const classes = useStyles();
    return (
        <Container>
            <Paper elevation={5}>
                <Container sx={{ py: 5 }}>
                    <form onSubmit={saveProduct}>
                        <Grid container spacing={2}>
                            <Grid item mobile={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel htmlFor="component-filled">
                                        Nama Barang
                                    </InputLabel>
                                    <FilledInput
                                        value={input.product_name}
                                        onChange={handleInput}
                                        name="product_name"
                                        id="component-filled"
                                        disableUnderline={true}
                                        classes={{
                                            root: classes.root,
                                            input: classes.input,
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item mobile={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel htmlFor="component-filled">
                                        Harga barang
                                    </InputLabel>
                                    <FilledInput
                                        value={input.price}
                                        onChange={handleInput}
                                        name="price"
                                        id="component-filled"
                                        disableUnderline={true}
                                        classes={{
                                            root: classes.root,
                                            input: classes.input,
                                        }}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item mobile={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel htmlFor="component-filled">
                                        Deskripsi
                                    </InputLabel>
                                    <FilledInput
                                        value={input.description}
                                        onChange={handleInput}
                                        name="description"
                                        id="component-filled"
                                        disableUnderline={true}
                                        classes={{
                                            root: classes.root,
                                            input: classes.input,
                                        }}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item mobile={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={handleCheckbox}
                                                value={input.has_3d}
                                                sx={checkboxColor}
                                            />
                                        }
                                        name={"has_3d"}
                                        label={
                                            <Typography
                                                fontSize={{
                                                    laptop: 12,
                                                    desktop: 17,
                                                }}
                                                fontWeight="medium"
                                            >
                                                Ada 3D?
                                            </Typography>
                                        }
                                    />
                                </FormGroup>
                            </Grid>

                            <Grid item mobile={12}>
                                <Typography fontWeight={"medium"}>
                                    Gambar Catalog
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    <Typography color={"white"}>
                                        Add Image
                                    </Typography>
                                </Button>
                                <DropzoneDialog
                                    open={open}
                                    onClose={handleClose}
                                />
                            </Grid>

                            <Grid item mobile={12}>
                                <Typography fontWeight={"medium"}>
                                    Model 3D
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleOpen}
                                >
                                    <Typography color={"white"}>
                                        Add Model
                                    </Typography>
                                </Button>
                                <DropzoneDialog
                                    open={open}
                                    onClose={handleClose}
                                />
                            </Grid>

                            <Grid sx={{ mt: 5 }} item mobile={12}>
                                <Button variant="contained" type="submit">
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
