/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 .\DEPAN KIRI.glb
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function DepanKiri(props) {
  const { nodes, materials } = useGLTF('/3dModel/.GLB/DEPAN KIRI.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Depan_Kiri.geometry} material={nodes.Depan_Kiri.material} position={[0.37, 1.45, 0.4]} rotation={[Math.PI / 2, 0, 0]} />
    </group>
  )
}

useGLTF.preload('/3dModel/.GLB/DEPAN KIRI.glb')
