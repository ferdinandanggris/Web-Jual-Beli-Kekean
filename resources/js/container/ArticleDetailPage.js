import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import { useParams } from "react-router";

function ArticleDetailPage() {
    const idArtikel = useParams();
    const [article, setArticle] = React.useState([]);

    React.useEffect(() => {
        axios.get(`/api/article/${idArtikel.id}`).then((res) => {
            setArticle(res.data.data);
            console.log(res.data.data);
        });
    }, []);
    return (
        <Container sx={{ px: 20 }}>
            <Stack direction="column" spacing={6}>
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
                            {moment(article.date, "YYYY-MM-DD HH:mm:ss").format(
                                "DD MMMM YYYY"
                            )}
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

                    <Typography
                        align="justify"
                        fontSize={20}
                        color="#484848"
                        sx={{whiteSpace: 'pre-wrap'}}
                    >
                        {article.isi}
                    </Typography>
            </Stack>
        </Container>
    );
}

export default ArticleDetailPage;