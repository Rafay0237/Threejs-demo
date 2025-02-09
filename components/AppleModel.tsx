"use client"

import { useRef, useEffect } from "react"
import { useGLTF, PerspectiveCamera } from "@react-three/drei"
import { Canvas, useThree } from "@react-three/fiber"
import type * as THREE from "three"

function AppleModel() {
  const group = useRef<THREE.Group>(null)
  const { nodes, materials } = useGLTF("/apple.glb") as any
  const { viewport } = useThree()

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (group.current) {
        const rotationX = (event.clientY / window.innerHeight - 0.5) * Math.PI * 0.1
        const rotationY = (event.clientX / window.innerWidth - 0.5) * Math.PI * 0.1
        group.current.rotation.x = rotationX
        group.current.rotation.y = rotationY
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <group ref={group}>
      <mesh
        geometry={nodes.Apple.geometry}
        material={materials.Apple}
        scale={[0.015 * viewport.width, 0.015 * viewport.width, 0.015 * viewport.width]}
      />
    </group>
  )
}

export default function Apple3DView() {
  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <AppleModel />
    </Canvas>
  )
}

useGLTF.preload("/apple.glb")

