import { Container } from "@mui/material";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Product from "./ProductCustomize/Product";

export default function Customize(props) {


    return (
        <Container>
            <Canvas style={{height: '30rem'}} shadows>
                <Suspense fallback={null}>
                    <Product />
                </Suspense>
            </Canvas>
        </Container>
    )
}