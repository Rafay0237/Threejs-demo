"use client"

import { useRef } from "react"
import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import type * as THREE from "three"

function InfinityLoopModel() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.3, 100, 16]} />
      <meshPhongMaterial color="#00FFFF" emissive="#0080FF" specular="#FFFFFF" shininess={100} />
    </mesh>
  )
}

export default function InfinityLoop3DView() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} color="#FF00FF" />
      <pointLight position={[-10, -10, -10]} color="#00FF00" />
      <InfinityLoopModel />
      <OrbitControls enableZoom={false} />
    </Canvas>
  )
}

