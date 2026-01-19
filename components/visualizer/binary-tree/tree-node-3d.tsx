"use client"

import { useRef, useState } from "react"
import { Text, Sphere } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface TreeNode3DProps {
  value: number | string
  position: [number, number, number]
  isHighlighted: boolean
  scale?: number
}

export function TreeNode3D({ value, position, isHighlighted, scale: nodeScale = 1 }: TreeNode3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  // Tamaños escalados
  const sphereRadius = 0.7 * nodeScale
  const textSize = 0.4 * nodeScale
  const textZ = 0.71 * nodeScale
  const glowRadius = 0.8 * nodeScale

  const { scale, color, emissiveIntensity } = useSpring({
    scale: hovered ? 1.1 : 1,
    color: isHighlighted ? "#f97316" : "#0ea5e9",
    emissiveIntensity: isHighlighted ? 0.4 : hovered ? 0.2 : 0.05,
    from: { scale: 0, color: "#0ea5e9", emissiveIntensity: 0 },
    config: { tension: 200, friction: 20 }
  })

  useFrame((state) => {
    if (meshRef.current && isHighlighted) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.1
    }
  })

  return (
    <animated.group 
      scale={scale} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Sphere ref={meshRef} args={[sphereRadius, 32, 32]} castShadow receiveShadow>
        <animated.meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.6}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </Sphere>
      
      {/* Efecto de resplandor para nodos destacados */}
      {isHighlighted && (
        <Sphere args={[glowRadius, 32, 32]}>
          <meshBasicMaterial 
            color="#f97316" 
            transparent 
            opacity={0.2}
            side={THREE.BackSide}
          />
        </Sphere>
      )}

      <Text
        position={[0, 0, textZ]}
        fontSize={textSize}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {value.toString()}
      </Text>
    </animated.group>
  )
}
