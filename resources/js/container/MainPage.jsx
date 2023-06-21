import React from "react";
import {
    Container,
    Grid,
    Typography,
    Box,
    Skeleton,
    Pagination,
    Card,
    CardActionArea,
} from "@mui/material/";
import CatalogItem from "../components/CatalogItem";
import ArticleItem from "../components/ArticleItem";
import { Link } from "react-router-dom";
import CatalogCollection from "./CatalogCollection";
import ArticleCollection from "./Artikel/ArticleCollection";
import { LoadingContext } from "../Navs";
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function MainPage(props) {
    // const product = JSON.parse(JSON.stringify(require('../product.json')))

    const [loading, setLoading] = React.useState(true);
    const [product, setProduct] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [postsPerPage, setPostsPerPage] = React.useState(12);
    let isMounted = true;

    React.useEffect(() => {
        const fetchData = async () => {
            axios.get(`api/products`).then((res) => {
                if (res.data.status === 200) {
                    setProduct(res.data.products);
                    setLoading(false);
                }
            });
        };
        fetchData();
        isMounted = false;
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentProducts = product.slice(indexOfFirstPost, indexOfLastPost);

    const changeCurrentPage = (event, value) => {
        window.scrollTo(0, 0);
        setCurrentPage(value);
    };
    if (!loading) {
        var showProductList = "";
        showProductList = currentProducts.map((item, id) => (
            <CatalogItem
                key={id}
                id={item.id}
                description={item.description}
                nama={item.product_name}
                image={item.imageUrl[0].path}
                harga={item.price}
                have3d={item.has_3d}
                model={item.model_3d}
            />
        ));
        console.log(product);
    }

    return (
        <Box>
            {/* <Grid
                display={{ mobile: "flex", laptop: "none" }}
                container
                alignItems="center"
                justifyContent="center"
                pt={0}
            >
                <CatalogCollection />
                <ArticleCollection />
                <Grid item mobile={12}>
                    <Container>
                        <Typography
                            display={{ mobile: "block", laptop: "none" }}
                            fontWeight={"light"}
                            fontSize={18}
                            py={2}
                            textAlign={"center"}
                        >
                            About Us
                        </Typography>
                        <Box
                            sx={{ width: "100%" }}
                            component="img"
                            src={`../images/aboutUs.png`}
                        />
                        <Typography
                            fontSize={8.65}
                            mt={1}
                            fontWeight={"regular"}
                            mb={5}
                        >
                            Kekean Wastra Gallery is a business that carries
                            local Indonesian cultural values. This business was
                            established in Bali on December 2, 2014. Kekean
                            Wastra Gallery focuses on sustainable fashion with
                            Batik, Weaving, and Embroidery.
                        </Typography>
                    </Container>
                </Grid>
            </Grid> */}
            <Grid display={{ mobile: "flex", laptop: "none" }} sx={{minHeight : "70vh"}}>
                <Container>
                <Grid pt={1} container alignItems="center" justifyContent="center">
                    <Grid item mobile={12}>
                        <Typography
                            display={{ mobile: "block", laptop: "none" }}
                            fontWeight={"light"}
                            fontSize={18}
                            py={2}
                            textAlign={'center'}
                        >
                            Our Collection
                        </Typography>
                    </Grid>
                    <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} sx={{width: 1}} pb={1}>
                        <Card sx={{backgroundColor: '#0000', boxShadow: 'none'}}>
                            <CardActionArea sx={{display: 'flex', flexDirection: 'row', pr: 5, py: 0.5, pl: 1, backgroundColor: '#0000', border: '1px solid #D9D9D9'}}>
                                <FilterListIcon sx={{ fontSize: 15, mr: 1 }} />
                                <Typography sx={{ fontSize: 12 }} fontWeight={'light'}>
                                    Filter
                                </Typography>
                            </CardActionArea>
                        </Card>
                        <Card sx={{backgroundColor: '#0000', boxShadow: 'none'}}>
                            <CardActionArea sx={{display: 'flex', flexDirection: 'row', py: 0.5, backgroundColor: '#0000', border: '1px solid #D9D9D9', justifyContent: 'space-between', width: 100}}>
                                <Typography sx={{ fontSize: 12 }} fontWeight={'light'} ml={1}>
                                    Sort By
                                </Typography>
                                <KeyboardArrowDownIcon sx={{ fontSize: 15, mx: 1 }} />
                            </CardActionArea>
                        </Card>
                    </Box>
                    <Grid item mobile={12}>
                        <Grid
                            container
                            spacing={1}
                            sx={{
                                display: { mobile: "flex", laptop: "none" },
                            }}
                        >
                            {showProductList}
                        </Grid>
                        <Grid item mobile={12} style={{marginTop : "20px"}}>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Pagination
                                    sx={{ width: "fit-content" }}
                                    page={currentPage}
                                    onChange={changeCurrentPage}
                                    count={Math.ceil(product.length / postsPerPage)}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item>
                        {/* <Button
                                    sx={{
                                        display: { mobile: "block", laptop: "none" },
                                        px: 1,
                                        mt: { laptop: 8, mobile: 3 },
                                    }}
                                    variant="contained"
                                    color="primary"
                                    disableElevation
                                >
                                    <Typography variant="button" color="white">
                                        Lihat Selengkapnya
                                    </Typography>
                                </Button> */}
                    </Grid>
                </Grid>
            </Container>
            </Grid>

            <Grid
                sx={{ display: { mobile: "none", laptop: "flex" } }}
                container
                spacing={2}
            >
                {loading ? (
                    <>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                            <Grid key={item} item laptop={3}>
                                <Box>
                                    <Skeleton
                                        variant="rounded"
                                        width={250}
                                        height={130}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={250}
                                        sx={{ fontSize: "1rem" }}
                                    />
                                    <Skeleton
                                        variant="text"
                                        width={250}
                                        sx={{ fontSize: "1rem" }}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </>
                ) : (
                    showProductList
                )}
                <Grid item laptop={12}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        
                    >
                        <Pagination
                            sx={{ width: "fit-content" }}
                            page={currentPage}
                            onChange={changeCurrentPage}
                            count={Math.ceil(product.length / postsPerPage)}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>

        
    );
}
