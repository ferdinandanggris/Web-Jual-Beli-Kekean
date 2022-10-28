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
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

export default function AddArtikel() {
    const [input, setInput] = React.useState({
        title: "",
        isi: "",
        featured: false,
    });
    const [article, setArticle] = React.useState('')
    const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())
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

    const saveArtikel = async (e) => {
        e.preventDefault();
        setInput({
            ...input,
            isi: article
        })

        axios.get("/sanctum/csrf-cookie").then((response) => {
            axios.post("api/article", input).then((res) => {
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
                                <ReactQuill theme='snow' value={article} onChange={setArticle}/>
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
