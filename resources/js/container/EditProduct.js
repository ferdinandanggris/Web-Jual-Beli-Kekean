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
} from "@mui/material";
import React from "react";
import { DropzoneDialog } from "mui-file-dropzone";
import { useNavigate, useParams } from "react-router";

export default function EditProduct(props) {
    const [imageDropzone, setImageDropzone] = React.useState(false);
    const [modelDropzone, setModelDropzone] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [input, setInput] = React.useState({
        product_name: "",
        price: "",
        description: "",
        has_3d: false,
        image_detail1: "",
        image_detail2: "",
        image_detail3: "",
        model_3d: "",
    });
    const [sizes, setSizes] = React.useState({
        S: '0',
        M: '0',
        XS: '0',
        L: '0',
        XL: '0',
        XXL: '0',
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

    let products = {};
    let size = {};
    React.useEffect(() => {
        const fetchData = () => {
            try {
                axios.get(`api/edit-products/${prod_id.id}`).then((res) => {
                    products = res.data.products;
                    size = res.data.size;
                    products.has_3d = !!Number(products.has_3d);
                    setInput(products);
                    setSizes(size);
                });
            } catch (error) {
                console.error(error.message);
            }
        };

        fetchData();
    }, []);

    console.log(sizes)

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
        // if(!files[1]) {
        //     files[1] = {name: ''}
        // }
        // if(!files[2]) {
        //     files[2] = {name: ''}
        // }
        setInput({
            ...input,
            image_detail1: files[0].name,
            // image_detail2: files[1].name,
            // imagedetail3: files[2].name
        });

        let imgData = new FormData();
        if (files.length == 1) {
            setInput({
                ...input,
                image_detail1: files[0].name,
                // image_detail2: files[1].name,
                // imagedetail3: files[2].name
            });
            imgData.append("image[]", files[0]);
        } else if (files.length == 2) {
            setInput({
                ...input,
                image_detail1: files[0].name,
                image_detail2: files[1].name,
                // image_detail3: files[2].name
            });
            imgData.append("image[]", files[0]);
            imgData.append("image[]", files[1]);
        } else if (files.length == 3) {
            setInput({
                ...input,
                image_detail1: files[0].name,
                image_detail2: files[1].name,
                image_detail3: files[2].name,
            });
            imgData.append("image[]", files[0]);
            imgData.append("image[]", files[1]);
            imgData.append("image[]", files[2]);
        }

        const res = await axios.post(`api/edit-image/${prod_id.id}`, imgData);
        if (res.data.status === 200) {
            console.log(res.data.message);
        }
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
        let data = {input, sizes}
        const res = await axios.put(`api/update-products/${prod_id.id}`, data);

        if (res.data.status === 200) {
            setInput({
                product_name: "",
                price: "",
                description: "",
                has_3d: e.target.checked,
                model_3d: "",
            });
            history("/admin");
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
                                />
                                <Typography>{input.image_detail1 ? <Typography>{input.image_detail1}{`, ${input.image_detail2 != null ? input.image_detail2 : ''}`}{`, ${input.image_detail3 != null ? input.image_detail3 : ''}</Typography>
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
                                <Button variant="contained" type="submit">
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
