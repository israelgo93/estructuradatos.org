"use client"

import { useRef, useState } from "react"
import { Text, Sphere } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface LinkedListNode3DProps {
	value: string | number
	position: [number, number, number]
	isHighlighted: boolean
	isHead?: boolean
	isTail?: boolean
	scale?: number
}

export function LinkedListNode3D({ value, position, isHighlighted, isHead = false, isTail = false, scale: nodeScale = 1 }: LinkedListNode3DProps) {
	const meshRef = useRef<THREE.Mesh>(null)
	const [hovered, setHovered] = useState(false)

	const { scale, color, emissiveIntensity } = useSpring({
		scale: hovered ? 1.1 : 1,
		color: isHighlighted ? "#ec4899" : isHead ? "#22c55e" : isTail ? "#f59e0b" : "#8b5cf6",
		emissiveIntensity: isHighlighted ? 0.5 : hovered ? 0.2 : 0.05,
		from: { scale: 0, color: "#8b5cf6", emissiveIntensity: 0 },
		config: { tension: 200, friction: 20 }
	})

	useFrame((state) => {
		if (meshRef.current) {
			if (isHighlighted) {
				meshRef.current.rotation.y += 0.02
			} else {
				meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1
			}
		}
	})

	// Tamaños escalados
	const sphereRadius = 0.9 * nodeScale
	const torusRadius = 1.1 * nodeScale
	const textSize = 0.45 * nodeScale
	const textZ = 0.92 * nodeScale
	const glowRadius = 1.05 * nodeScale

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
					roughness={0.15}
					metalness={0.7}
					emissive={color}
					emissiveIntensity={emissiveIntensity}
				/>
			</Sphere>
			
			{/* Anillo exterior decorativo */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<torusGeometry args={[torusRadius, 0.05 * nodeScale, 16, 100]} />
				<animated.meshStandardMaterial 
					color={color} 
					emissive={color} 
					emissiveIntensity={0.3}
					transparent
					opacity={0.6}
				/>
			</mesh>

			<Text
				position={[0, 0, textZ]}
				fontSize={textSize}
				color="white"
				anchorX="center"
				anchorY="middle"
			>
				{value.toString()}
			</Text>

			{/* Efecto de resplandor para nodos destacados */}
			{isHighlighted && (
				<Sphere args={[glowRadius, 32, 32]}>
					<meshBasicMaterial 
						color="#ec4899" 
						transparent 
						opacity={0.2}
						side={THREE.BackSide}
					/>
				</Sphere>
			)}
		</animated.group>
	)
}
