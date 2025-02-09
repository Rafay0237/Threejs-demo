"use client"

import { useRef } from "react"
import { useGLTF, OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function IPhoneModel() {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF("/iphone_xs_max.glb") as any

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  return (
    <group ref={group}>
      <mesh
        geometry={nodes.iPhoneXSMax.geometry}
        material={materials.iPhoneXSMax}
        position={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
      />
    </group>
  )
}

export default function IPhone3DView() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <IPhoneModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

useGLTF.preload("/iphone_xs_max.glb")

