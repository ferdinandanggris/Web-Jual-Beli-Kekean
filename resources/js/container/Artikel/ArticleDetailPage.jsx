import {
    Box,
    Container,
    Grid,
    Skeleton,
    Stack,
    Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { useParams } from "react-router";
import HTMLReactParser from "html-react-parser";

function ArticleDetailPage() {
    const idArtikel = useParams();
    const [article, setArticle] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        axios.get(`/api/article/${idArtikel.id}`).then((res) => {
            setArticle(res.data.data);
            console.log(res.data.data);
            setLoading(false);
        });
    }, []);
    return (
        <Container sx={{mt: 5, px: 20 }}>
            <Stack direction="column" spacing={6}>
                {loading ? (
                    <Grid alignItems={'center'} spacing={6} container direction={"row"}>
                        <Grid item laptop={6}>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </Grid>
                        <Grid item laptop={6}>
                            <Skeleton variant="rectangular" height={280}/>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                        alignItems={"center"}
                    >
                        <Grid item laptop={6}>
                            <Typography color={"#909090"}>
                                <Box component="span" sx={{ fontWeight: 600 }}>
                                    Artikel
                                </Box>{" "}
                                |{" "}
                                {moment(
                                    article.date,
                                    "YYYY-MM-DD HH:mm:ss"
                                ).format("DD MMMM YYYY")}
                            </Typography>
                            <Typography
                                color={"primary"}
                                fontWeight="600"
                                fontSize={32}
                            >
                                {article.title}
                            </Typography>
                            <Typography color="#909090">
                                {article.overview}
                            </Typography>
                        </Grid>

                        <Grid item laptop={5}>
                            <Box
                                sx={{
                                    width: "100%",
                                    objectFit: "cover",
                                }}
                                component="img"
                                src={`../articles/article-${article.id}.png`}
                                borderRadius={0.5}
                            />
                        </Grid>
                    </Grid>
                )}

                {loading ? (
                    <Box>
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" />
                    </Box>
                ) : (
                    HTMLReactParser(article.isi)
                )}
            </Stack>
        </Container>
    );
}

export default ArticleDetailPage;
