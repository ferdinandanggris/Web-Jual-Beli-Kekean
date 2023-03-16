import { Environment, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { degToRad } from 'three/src/math/MathUtils'
import Baju from "./Baju";
import * as THREE from 'three'
import { Anime } from "./.GLB/Anime";
import { Capybara } from "./.GLB/Capybara";
import { Kemeja } from "./.GLB/KEMEJA";



export default function Product() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 3.5, 5]} fov={60} />
            <OrbitControls />

            <Kemeja />

            <ambientLight args={['#ffffff', 1]} />
            <spotLight args={['#ffffff', 1.5]} position={[0, 3, 3]} penumbra={0.4} distance={10} angle={degToRad(90)} castShadow />
            <spotLight args={['#ffffff', 1.5]} position={[0, 3, -3]} penumbra={0.4} distance={10} angle={degToRad(90)} rotation={[0, 1, 0]} castShadow />
            <spotLight args={['#ffffff', 1]} position={[-3, 3, 0]} penumbra={0.4} distance={10} angle={degToRad(90)} rotation={[0.5, 1, 0]} castShadow />
            <spotLight args={['#ffffff', 1]} position={[3, 3, 0]} penumbra={0.4} distance={10} angle={degToRad(90)} rotation={[-0.5, 1, 0]} castShadow />


        </>
    )
}