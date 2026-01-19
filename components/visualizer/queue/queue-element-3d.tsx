"use client"

import { useRef, useState } from "react"
import { Text, RoundedBox } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface QueueElement3DProps {
	value: string | number
	position: [number, number, number]
	isHighlighted: boolean
	isFront?: boolean
	isRear?: boolean
	scale?: number
}

export function QueueElement3D({ value, position, isHighlighted, isFront = false, isRear = false, scale: elementScale = 1 }: QueueElement3DProps) {
	const meshRef = useRef<THREE.Mesh>(null)
	const [hovered, setHovered] = useState(false)

	// Ajustar tamaños basados en la escala
	const boxSize = 1.6 * elementScale
	const borderSize = 1.7 * elementScale
	const textSize = 0.5 * elementScale
	const textZ = 0.82 * elementScale

	const { scale, posX, color, emissiveIntensity } = useSpring({
		scale: hovered ? 1.08 : 1,
		posX: position[0],
		color: isHighlighted ? "#f59e0b" : isFront ? "#22c55e" : isRear ? "#8b5cf6" : "#6366f1",
		emissiveIntensity: isHighlighted ? 0.4 : hovered ? 0.15 : 0,
		from: { scale: 0, posX: position[0] + 8, color: "#6366f1", emissiveIntensity: 0 },
		config: { tension: 250, friction: 22 }
	})

	useFrame((state) => {
		if (meshRef.current && isHighlighted) {
			meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.08
		}
	})

	return (
		<animated.group 
			scale={scale} 
			position-x={posX}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			<RoundedBox
				ref={meshRef}
				args={[boxSize, boxSize, boxSize]}
				radius={0.2 * elementScale}
				smoothness={4}
				position={[0, position[1], position[2]]}
				castShadow
				receiveShadow
			>
				<animated.meshStandardMaterial
					color={color}
					roughness={0.15}
					metalness={0.85}
					emissive={color}
					emissiveIntensity={emissiveIntensity}
				/>
			</RoundedBox>
			<Text
				position={[0, position[1], position[2] + textZ]}
				fontSize={textSize}
				color="white"
				anchorX="center"
				anchorY="middle"
			>
				{value.toString()}
			</Text>

			{/* Efecto de borde para elementos destacados */}
			{(isFront || isRear || isHighlighted) && (
				<RoundedBox
					args={[borderSize, borderSize, borderSize]}
					radius={0.2 * elementScale}
					smoothness={4}
					position={[0, position[1], position[2]]}
				>
					<meshBasicMaterial 
						color={isFront ? "#22c55e" : isRear ? "#8b5cf6" : "#f59e0b"} 
						transparent 
						opacity={0.25}
						side={THREE.BackSide}
					/>
				</RoundedBox>
			)}
		</animated.group>
	)
}
