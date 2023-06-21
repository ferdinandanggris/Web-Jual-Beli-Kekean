import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import LinesEllipsis from "react-lines-ellipsis";

function ArticleCarousel(props) {
    return (
        <Grid container spacing={{mobile : 2 , laptop : 5}} alignItems={"center"}>
            <Grid item laptop={4} mobile={12}>
                <Box
                    sx={{ borderRadius: 1, width: {laptop : "100%",mobile : "100%"}, height: {laptop : '100%',mobile : 150}, objectFit: 'cover'}}
                    component="img"
                    src={`../storage/articles/article-${props.img}.png`}
                />
            </Grid>
            <Grid item laptop={8} mobile={12}>
                <Typography
                    fontSize={12}
                    color={"primary"}
                    width={"fit-content"}
                    sx={{
                        border: 1,
                        borderColor: "primary.main",
                        borderRadius: 5,
                        px: 4,
                        py: 0.5,
                        mb: 2,
                    }}
                >
                    {props.date}
                </Typography>
                <Box>
                    <Typography
                        width={400}
                        mb={2}
                        variant="h4"
                        fontWeight={"medium"}
                        sx={{fontSize : {mobile : 14}}}
                    >
                        <LinesEllipsis  text={props.title} maxLine={2} />
                    </Typography>
                    <Typography width={600} sx={{fontSize : {mobile : 12}}}>
                        <LinesEllipsis  sx={{fontSize : {mobile : 12}}} text={props.body} maxLine={3} />
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export default ArticleCarousel;
