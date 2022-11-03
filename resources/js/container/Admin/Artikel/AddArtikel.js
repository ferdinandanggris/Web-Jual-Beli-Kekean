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
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DropzoneDialog } from "mui-file-dropzone";

export default function AddArtikel() {
    const [input, setInput] = React.useState({
        title: "",
        isi: "",
        image: new FormData(),
        featured: false,
    });
    const [article, setArticle] = React.useState("");
    const [imageDropzone, setImageDropzone] = React.useState(false);

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

    const changeArticle = (value) => {
        setInput({
            ...input,
            isi: value,
        });
    };

    function handleOpenImage() {
        setImageDropzone(true);
    }

    function handleCloseImage() {
        setImageDropzone(false);
    }

    const handleImage = (files) => {
        const file = files[0];
        convertImgToBase64(file);
    };

    const convertImgToBase64 = (file) => {
        let reader = new FileReader();
        let base64 = "";
        reader.readAsDataURL(file);
        reader.onload = () => {
            setInput({
                ...input,
                image: reader.result
            })
        };
    };

    const saveArtikel = async (e) => {
        e.preventDefault();
        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("api/article", input).then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data.message);
                    history("/admin/artikel");
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
                    <form onSubmit={saveArtikel} encType="multipart/form-data">
                        <Grid container spacing={2}>
                            <Grid item mobile={12}>
                                <FormControl fullWidth variant="filled">
                                    <InputLabel htmlFor="component-filled">
                                        Judul Artikel
                                    </InputLabel>
                                    <FilledInput
                                        value={input.title}
                                        onChange={handleInput}
                                        name="title"
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
                            <Grid item mobile={12}>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenImage}
                                >
                                    <Typography color={"white"}>
                                        Add Image
                                    </Typography>
                                </Button>
                                <DropzoneDialog
                                    maxFileSize={50000000}
                                    acceptedFiles={["image/*"]}
                                    open={imageDropzone}
                                    filesLimit={1}
                                    onClose={handleCloseImage}
                                    onSave={handleImage}
                                />
                            </Grid>
                            <Grid item mobile={12}>
                                <ReactQuill
                                    theme="snow"
                                    value={input.isi}
                                    onChange={changeArticle}
                                />
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
