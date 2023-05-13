import { OrbitControls, PresentationControls, Stage, PerspectiveCamera } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import React from "react";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {environment} from  "../environments/environment"

const Model3d = (props) => {
    const gltf = useLoader(
        GLTFLoader,environment.fileUrl + '/' + props.model
    );
    return (
        <>
        <PerspectiveCamera makeDefault position={[1, 2, 3]} fov={60} />
        <OrbitControls/>
            <Stage
                environment={"city"}
                intensity={0.6}
                contactShadow={false}
                shadowBias={-0.0015}
            >
                <Suspense fallback={null}>
                    <primitive object={gltf.scene} />
                </Suspense>
                {/* <PerspectiveCamera makeDefault position={[1, 0, 0]} fov={60}> */}
                <mesh>
                    <OrbitControls makeDefault />
                    {/* <boxGeometry />
            <meshNormalMaterial /> */}
                </mesh>
                {/* </PerspectiveCamera> */}
            </Stage>
            {/* <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[170, 170]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}  
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#101010"
          metalness={0.5}
        />
      </mesh> */}
      </>
    );
};

export default Model3d;
