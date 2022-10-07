import React from "react";
import Carousel from "react-material-ui-carousel";

export default function Carousel1(props) {
    return (
        <Carousel>
            <Box
                sx={{
                    width: "538px",
                    height: "400px",
                    objectFit: "cover",
                }}
                component="img"
                src={`../catalog/${props.img}`}
            />
        </Carousel>
    );
}
