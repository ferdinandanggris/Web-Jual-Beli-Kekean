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
import { useNavigate } from "react-router";
import { toBase64Handler } from "../../../base64converter/base64Converter";
export default function AddProduct() {
    const [imageDropzone, setImageDropzone] = React.useState(false);
    const [sizes, setSizes] = React.useState({
        stock_s  : 0,
        stock_m  : 0,
        stock_xs : 0,
        stock_l  : 0,
        stock_xl : 0,
        stock_xxl : 0,
        S: false,
        M: false,
        XS: false,
        L: false,
        XL: false,
        XXL: false,
    });
    const [input, setInput] = React.useState({
        product_name: "",
        price: "",
        description: "",
        has_3d: false,
        image: [],
        model_3d: "",
        error_list: [],
    });

    const history = useNavigate();

    function handleOpenImage() {
        setImageDropzone(true);
    }

    function handleCloseImage() {
        setImageDropzone(false);
    }

    const checkboxColor = {
        color: "primary.main",
        "&.Mui-checked": {
            color: "primary",
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

    const handleSize = (e) => {
        setSizes({
            ...sizes,
            [e.target.name]: e.target.checked,
        });
    };

    const handleSizeStock = (e) => {
        setSizes({
            ...sizes,
            [e.target.name]: e.target.value,
        });
    };

    const onFileChange = (e) => {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (event) => {
            // this.setState({
            //     selectedImage: event.target.result,
            // })
            setInput({
            ...input,
            model_3d: event.target.result,
        });
        };
    };

    const handleImage = async (files) => {
        const base64img = await toBase64Handler(files);
        setInput({ ...input, image: JSON.stringify(base64img) });

        // if(!files[1]) {
        //     files[1] = {name: ''}
        // }
        // if(!files[2]) {
        //     files[2] = {name: ''}
        // }

        //Old code
        // let imgData = new FormData();
        // if (files.length == 1) {
        //     setInput({
        //         ...input,
        //         image_detail1: files[0].name,
        //         // image_detail2: files[1].name,
        //         // imagedetail3: files[2].name
        //     });
        //     imgData.append("image", files[0]);
        // } else if (files.length == 2) {
        //     setInput({
        //         ...input,
        //         image_detail1: files[0].name,
        //         image_detail2: files[1].name,
        //         // image_detail3: files[2].name
        //     });
        //     imgData.append("image[]", files[0]);
        //     imgData.append("image[]", files[1]);
        // } else if (files.length == 3) {
        //     setInput({
        //         ...input,
        //         image_detail1: files[0].name,
        //         image_detail2: files[1].name,
        //         image_detail3: files[2].name,
        //     });
        //     imgData.append("image[]", files[0]);
        //     imgData.append("image[]", files[1]);
        //     imgData.append("image[]", files[2]);
        // }

        // const res = await axios.post("api/save-image", imgData);
        // if (res.data.status === 200) {
        //     console.log(res.data.message);
        // }
        handleCloseImage();
    };

    console.log(input);
    const saveProduct = async (e) => {
        e.preventDefault();

        let data = { input, sizes };
        console.log(data);
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("api/add-product", data).then((res) => {
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
                    <form onSubmit={saveProduct} encType="multipart/form-data">
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
                                <FormHelperText
                                    sx={{ color: "red", fontSize: 10 }}
                                >
                                    {input.error_list.product_name}
                                </FormHelperText>
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
                                                checked={sizes.S}
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
                                                checked={sizes.M}
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
                                                checked={sizes.XS}
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
                                                checked={sizes.L}
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
                                                checked={sizes.XL}
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
                                                checked={sizes.XXL}
                                                onChange={handleSize}
                                                name="XXL"
                                            />
                                        }
                                        label="XXL"
                                    />
                                </FormGroup>
                            </Grid>
                            <div class="row">
                                <div class="ms-3">
                                    <div class="form-floating mb-3" style={{display : sizes.S ? 'block' : 'none'}}>
                                        <input type="number" class="form-control" onChange={handleSizeStock} id="stock_s" name="stock_s" />
                                        <label for="stock_s">Stock size S</label>
                                    </div>
                                    <div class="form-floating mb-3" style={{display : sizes.M ? 'block' : 'none'}}>
                                        <input type="number" class="form-control" onChange={handleSizeStock} id="stock_m" name="stock_m" />
                                        <label for="stock_m">Stock size M</label>
                                    </div>
                                    <div class="form-floating mb-3" style={{display : sizes.XS ? 'block' : 'none'}}>
                                        <input type="number" class="form-control" onChange={handleSizeStock} id="stock_xs" name="stock_xs" />
                                        <label for="stock_xs">Stock size XS</label>
                                    </div>
                                    <div class="form-floating mb-3" style={{display : sizes.L ? 'block' : 'none'}}>
                                        <input type="number" class="form-control" onChange={handleSizeStock} id="stock_l" name="stock_l" />
                                        <label for="stock_l">Stock size L</label>
                                    </div>
                                    <div class="form-floating mb-3" style={{display : sizes.XL ? 'block' : 'none'}}>
                                        <input type="number" class="form-control" onChange={handleSizeStock} id="stock_xl" name="stock_xl" />
                                        <label for="stock_xl">Stock size XL</label>
                                    </div>
                                    <div class="form-floating mb-3" style={{display : sizes.XXL ? 'block' : 'none'}}>
                                        <input type="number" class="form-control" onChange={handleSizeStock} id="stock_xxl" name="stock_xxl" />
                                        <label for="stock_xxl">Stock size XXL</label>
                                    </div>
                                </div>
                            </div>

                            <Grid item mobile={12}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                onChange={handleCheckbox}
                                                value={input.has_3d}
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
                                    <div style={{display : input.has_3d ? 'inline' : 'none'}} className="form-group mb-3">
                                        <label style={{ fontWeight:500,color:"#000000DE", fontSize : '1rem'}}>
                                            Masukkan file 3D
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="model_3d"
                                            onChange={onFileChange}
                                        />
                                    </div>
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
                                    maxFileSize={50000000}
                                    acceptedFiles={["image/*"]}
                                />
                                {input.image_detail1 ? (
                                    <Typography>
                                        {input.image_detail1}
                                        {`, ${input.image_detail2}`}
                                        {`, ${input.image_detail3}`}
                                    </Typography>
                                ) : (
                                    ""
                                )}
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

                            {/* <Grid item mobile={12}>
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
                            </Grid> */}

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
