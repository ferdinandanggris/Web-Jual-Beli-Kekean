import {
    Container,
    Grid,
    Box,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    TextField,
    Skeleton,
} from "@mui/material";
import React from "react";
import ButtonBeli from "../components/ButtonBeli";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import ButtonKeranjang from "../components/ButtonKeranjang";
import axios from "axios";
import swal from "sweetalert";
import Carousel from "react-material-ui-carousel";
import { useQueryClient } from "@tanstack/react-query";

export default function ProductPage(props) {
    const queryClient = useQueryClient();
    const [size, setSize] = React.useState("");
    const [sizes, setSizes] = React.useState({
        S: "0",
        M: "0",
        ML: "0",
        L: "0",
        XL: "0",
        XXL: "0",
    });
    const [product, setProduct] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [quantity, setQuantity] = React.useState(1);
    let isMounted = true;
    const { productId } = useParams();
    // const catalog = JSON.parse(JSON.stringify(require("../catalog.json")));
    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            axios.get(`api/products/${productId}`).then((res) => {
                if (res.data.status === 200) {
                    setProduct(res.data.products);
                    setSizes(res.data.size);
                    console.log(res.data.size);
                    setLoading(false);
                }
            });
        };
        fetchData();
        isMounted = false;
    }, []);

    // if (!loading) {
    //     var product"";
    //     currentProduct = product.filter((item) => item.id == productId);
    //     console.log(currentProduct);
    // }

    const handleChange = (event) => {
        setSize(event.target.value);
    };

    function submitToCart(e) {
        const data = {
            product_id: productId,
            product_qty: quantity,
            product_size: size,
        };
        axios.post("/api/add-to-cart", data).then((res) => {
            if (res.data.status === 201) {
                queryClient.invalidateQueries("cartLength");
                swal("Success", res.data.message, "success");
            } else if (res.data.status === 409) {
                swal("Warning", res.data.message, "warning");
            } else if (res.data.status === 401) {
                swal("Error", res.data.message, "error");
            } else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            } else if (res.data.status === 500) {
                swal("Warning", res.data.message, "warning");
            }
        });
    }
    return (
        <Container sx={{ px: 10, mt: 5 }}>
            <Grid
                spacing={15}
                container
                display={{ mobile: "none", laptop: "flex" }}
            >
                <Grid item laptop={6}>
                    {loading ? (
                        <>
                            <Skeleton
                                variant="rounded"
                                width="538px"
                                height="400px"
                            />
                            <Skeleton
                                variant="text"
                                sx={{ fontSize: 36, mt: 5 }}
                            />
                            <Skeleton variant="text" sx={{ fontSize: 12 }} />
                        </>
                    ) : (
                        <Box>
                            {!!Number(product.has_3d) ? (
                                <div className="sketchfab-embed-wrapper">
                                    <iframe
                                        title={product.product_name}
                                        frameBorder="0"
                                        allowFullScreen
                                        mozAllowFullscreen="true"
                                        webkitAllowFullscreen="true"
                                        allow="autoplay; fullscreen; xr-spatial-tracking"
                                        xrSpecialTracking
                                        executionWhileOutOfViewPort
                                        executionWhileNotRendered
                                        webShare
                                        width={"612px"}
                                        height={"500px"}
                                        src={product.model_3d}
                                    ></iframe>
                                </div>
                            ) : (
                                <Carousel>
                                    {product.imageUrl.map((item, id) => (
                                        <Box
                                        key={id}
                                        sx={{
                                            height: "400px",
                                            objectFit: "fill",
                                            ml: "30%",
                                        }}
                                        component="img"
                                        src={`../storage/${item.path}`}
                                    />
                                    ))}
                                </Carousel>
                                // <Box
                                //     sx={{
                                //         width: "538px",
                                //         height: "400px",
                                //         objectFit: "cover",
                                //     }}
                                //     component="img"
                                //     src={`../catalog/${product.image_detail1}`}
                                // />
                            )}
                            <Box my={5}>
                                <Typography fontSize={36} fontWeight={"medium"}>
                                    Deskripsi
                                </Typography>
                                <Typography>{product.description}</Typography>
                            </Box>
                        </Box>
                    )}
                </Grid>
                <Grid item laptop={6}>
                    <Box
                        sx={{ border: "1px solid #D9D9D9", borderRadius: 1 }}
                        p={2}
                    >
                        <Box>
                            {loading ? (
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: 36 }}
                                />
                            ) : (
                                <Typography fontSize={30} fontWeight="medium">
                                    {product.product_name}
                                </Typography>
                            )}
                            {loading ? (
                                <Skeleton
                                    variant="text"
                                    sx={{ fontSize: 24 }}
                                />
                            ) : (
                                <Typography fontSize={20}>
                                    Rp. {Number(product.price).toLocaleString()}
                                </Typography>
                            )}
                        </Box>
                        <Box pt={3}>
                            <FormControl sx={{ width: 300 }}>
                                <InputLabel id="demo-simple-select-label">
                                    Pilih Ukuran
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="ukuran"
                                    value={size}
                                    displayEmpty={true}
                                    label="Pilih Ukuran"
                                    onChange={handleChange}
                                >
                                    <MenuItem
                                        disabled={!Number(sizes.XS)}
                                        value={"XS"}
                                    >
                                        Xtra Small (XS)
                                    </MenuItem>
                                    <MenuItem
                                        disabled={!Number(sizes.S)}
                                        value={"S"}
                                    >
                                        Small
                                    </MenuItem>
                                    <MenuItem
                                        disabled={!Number(sizes.M)}
                                        value={"M"}
                                    >
                                        Medium
                                    </MenuItem>
                                    <MenuItem
                                        disabled={!Number(sizes.L)}
                                        value={"L"}
                                    >
                                        Large
                                    </MenuItem>
                                    <MenuItem
                                        disabled={!Number(sizes.XL)}
                                        value={"XL"}
                                    >
                                        Xtra Large (XL)
                                    </MenuItem>
                                    <MenuItem
                                        disabled={!Number(sizes.XXL)}
                                        value={"XXL"}
                                    >
                                        Xtra Xtra Large (XXL)
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <br />
                            <TextField
                                onChange={(event) => {
                                    if (event.target.value < 0) {
                                        event.target.value = 0;
                                        setQuantity(event.target.value);
                                    } else {
                                        event.target.value;
                                        setQuantity(event.target.value);
                                    }
                                }}
                                id="jumlah-barang"
                                label="Quantity"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                variant="outlined"
                                sx={{ mt: 3, width: 300 }}
                                value={quantity}
                            />
                            <Grid container>
                                <Grid item laptop={6}>
                                    <ButtonKeranjang
                                        id={productId}
                                        onClick={submitToCart}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}
