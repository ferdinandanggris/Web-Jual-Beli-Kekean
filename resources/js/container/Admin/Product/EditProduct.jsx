import { makeStyles } from "@mui/styles";
import {
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
    FormHelperText,
} from "@mui/material";
import React from "react";
import { DropzoneDialog } from "mui-file-dropzone";
import { useNavigate, useParams } from "react-router";
import { toBase64Handler } from "../../../base64converter/base64Converter";

export default function EditProduct(props) {
    const [imageDropzone, setImageDropzone] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [input, setInput] = React.useState({
        product_name: "",
        price: "",
        description: "",
        has_3d: false,
        image_detail1: "",
        image_detail2: "",
        image_detail3: "",
        model_3d: "",
        error_list: [],
    });
    const [sizes, setSizes] = React.useState({
        S: "0",
        M: "0",
        XS: "0",
        L: "0",
        XL: "0",
        XXL: "0",
    });
    const prod_id = useParams();
    const history = useNavigate();

    function handleOpenImage() {
        setImageDropzone(true);
    }

    function handleCloseImage() {
        setImageDropzone(false);
    }

    const checkboxColor = {
        color: "main.primary",
        "&.Mui-checked": {
            color: "main.primary",
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

    React.useEffect(() => {
        const fetchData = () => {
            axios.get(`api/edit-products/${prod_id.id}`).then((res) => {
                res.data.products.has_3d = !!Number(res.data.products.has_3d);
                res.data.products.model_3d == null
                    ? (res.data.products.model_3d = "")
                    : null;
                console.log(res.data.products.image);
                let imagePath = [];
                for (let i = 0; i < res.data.products.image.length; i++) {
                    imagePath.push(".." + Object.values(res.data.products.image[i])[2])
                }
                console.log(imagePath)
                res.data.products.image = toBase64Handler(imagePath);

                setInput({ ...input, ...res.data.products });
                setSizes(res.data.size);
                setLoading(false);
            });
        };
        fetchData();
    }, []);

    console.log(input);

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

    const handleImage = async (files) => {
        const base64img = await toBase64Handler(files);
        setInput({ ...input, image: JSON.stringify(base64img) });

        handleCloseImage();
    };

    const handleSize = (e) => {
        setSizes({
            ...sizes,
            [e.target.name]: e.target.checked,
        });
    };

    const editProduct = async (e) => {
        e.preventDefault();
        let data = { input, sizes };

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.put(`api/update-products/${prod_id.id}`, data).then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data.message);
                    history("/admin");
                } else {
                    setInput({
                        ...input,
                        error_list: res.data.validation_errors,
                    });
                }
            });
        });
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
        <Container sx={{ my: 5 }}>
            <Paper elevation={5}>
                <Container sx={{ py: 5 }}>
                    <form onSubmit={editProduct} encType="multipart/form-data">
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
                                    <FormHelperText
                                        sx={{ color: "red", fontSize: 10 }}
                                    >
                                        {input.error_list.product_name}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        sx={{ color: "red", fontSize: 10 }}
                                    >
                                        {input.error_list.price}
                                    </FormHelperText>
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
                                    <FormHelperText
                                        sx={{ color: "red", fontSize: 10 }}
                                    >
                                        {input.error_list.description}
                                    </FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid item mobile={12}>
                                <FormGroup row={true}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={checkboxColor}
                                                checked={!!Number(sizes.S)}
                                                onChange={handleSize}
                                                name="S"
                                            />
                                        }
                                        label="S"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={checkboxColor}
                                                checked={!!Number(sizes.M)}
                                                onChange={handleSize}
                                                name="M"
                                            />
                                        }
                                        label="M"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={checkboxColor}
                                                checked={!!Number(sizes.XS)}
                                                onChange={handleSize}
                                                name="XS"
                                            />
                                        }
                                        label="XS"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={checkboxColor}
                                                checked={!!Number(sizes.L)}
                                                onChange={handleSize}
                                                name="L"
                                            />
                                        }
                                        label="L"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={checkboxColor}
                                                checked={!!Number(sizes.XL)}
                                                onChange={handleSize}
                                                name="XL"
                                            />
                                        }
                                        label="XL"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={checkboxColor}
                                                checked={!!Number(sizes.XXL)}
                                                onChange={handleSize}
                                                name="XXL"
                                            />
                                        }
                                        label="XXL"
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item mobile={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={handleCheckbox}
                                                checked={input.has_3d}
                                                sx={checkboxColor}
                                                name="has_3d"
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
                                    onClick={handleOpenImage}
                                >
                                    <Typography color={"white"}>
                                        Add Image
                                    </Typography>
                                </Button>
                                <DropzoneDialog
                                    open={imageDropzone}
                                    onClose={handleCloseImage}
                                    onSave={handleImage}
                                    filesLimit={3}
                                    acceptedFiles={["image/*"]}
                                    maxFileSize={50000000}
                                />

                                <Typography color={"red"}>
                                    {input.error_list.image_detail1}
                                </Typography>
                            </Grid>

                            {/* <Grid item mobile={12}>
                                <Typography fontWeight={"medium"}>
                                    Model 3D
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenModel}
                                >
                                    <Typography color={"white"}>
                                        Add Model
                                    </Typography>
                                </Button>
                                <DropzoneDialog
                                    open={modelDropzone}
                                    onClose={handleCloseModel}
                                    maxFileSize={100000000}
                                    filesLimit={1}
                                    onSave={handleModel}
                                />
                            </Grid> */}

                            <Grid item mobile={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel htmlFor="component-filled">
                                        Link model 3d dari sketchfab
                                    </InputLabel>
                                    <FilledInput
                                        value={input.model_3d}
                                        onChange={handleInput}
                                        name="model_3d"
                                        id="component-filled"
                                        disableUnderline={true}
                                        disabled={input.has_3d ? false : true}
                                        classes={{
                                            root: classes.root,
                                            input: classes.input,
                                        }}
                                    />
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
                                        Update
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
