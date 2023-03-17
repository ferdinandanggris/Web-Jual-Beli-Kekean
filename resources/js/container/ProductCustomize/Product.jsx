import { Environment, OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { degToRad } from 'three/src/math/MathUtils'
import Baju from "./Baju";
import * as THREE from 'three'
import { Anime } from "./.GLB/Anime";
import { Capybara } from "./.GLB/Capybara";
import { Kemeja } from "./.GLB/KEMEJA";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader"




export default function Product() {
    extend({ OrbitControls, EffectComposer, RenderPass, OutlinePass, ShaderPass })
    const controlRef = useRef(null)

    useEffect(() => {
        if (!!controlRef) {
            console.log(controlRef.current)
        }
    })

    return (
        <>
            <PerspectiveCamera makeDefault position={[1, 2, 3]} fov={60} />
            <Kemeja rotation={[0, 0, 0]} position={[0, -1.3, 0]} />
            <OrbitControls ref={controlRef} />


            <ambientLight args={['#ffffff', 1]} />
            <spotLight args={['#ffffff', 1.5]} position={[0, 1.7, 3]} penumbra={0.4} distance={10} angle={degToRad(90)} castShadow />
            <spotLight args={['#ffffff', 1.5]} position={[0, 1.7, -3]} penumbra={0.4} distance={10} angle={degToRad(90)} rotation={[0, 1, 0]} castShadow />
            <spotLight args={['#ffffff', 1]} position={[-3, 1.7, 0]} penumbra={0.4} distance={10} angle={degToRad(90)} rotation={[0.5, 1, 0]} castShadow />
            <spotLight args={['#ffffff', 1]} position={[3, 1.7, 0]} penumbra={0.4} distance={10} angle={degToRad(90)} rotation={[-0.5, 1, 0]} castShadow />


        </>
    )
}

