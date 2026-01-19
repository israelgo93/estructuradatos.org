"use client"

import { useRef, useState } from "react"
import { Text, RoundedBox } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface StackElement3DProps {
	value: string | number
	position: [number, number, number]
	isHighlighted: boolean
	isTop?: boolean
	index?: number
	total?: number
	elementHeight?: number
}

export function StackElement3D({ 
	value, 
	position, 
	isHighlighted, 
	isTop = false,
	index = 0,
	total = 1,
	elementHeight = 1.1
}: StackElement3DProps) {
	const meshRef = useRef<THREE.Mesh>(null)
	const glowRef = useRef<THREE.Mesh>(null)
	const [hovered, setHovered] = useState(false)

	// Colores basados en la posición y estado
	const baseColor = isTop ? "#22c55e" : "#6366f1"
	const highlightColor = "#3b82f6"
	
	// Gradiente de colores según la posición
	const positionRatio = total > 1 ? index / (total - 1) : 0
	const gradientColor = isTop ? "#22c55e" : 
		isHighlighted ? highlightColor :
		`hsl(${240 + positionRatio * 30}, 70%, ${55 + positionRatio * 15}%)`

	// Ajustar tamaño del texto si el bloque es muy delgado
	const textSize = Math.min(0.65, elementHeight * 0.6)

	const { scale, posY, rotationY, emissiveIntensity, glowOpacity } = useSpring({
		scale: hovered ? 1.08 : isHighlighted ? 1.05 : 1,
		posY: position[1],
		rotationY: 0,
		emissiveIntensity: isHighlighted ? 0.6 : hovered ? 0.3 : isTop ? 0.2 : 0.05,
		glowOpacity: isHighlighted ? 0.4 : isTop ? 0.25 : 0,
		from: { 
			scale: 0, 
			posY: position[1] + 12, 
			rotationY: Math.PI * 2,
			emissiveIntensity: 0,
			glowOpacity: 0
		},
		config: { tension: 180, friction: 18 },
		delay: index * 50 // Delay escalonado para animación en cascada
	})

	useFrame((state) => {
		if (meshRef.current) {
			// Rotación suave cuando está resaltado o es el tope
			if (isHighlighted) {
				meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 3) * 0.08
			} else if (isTop) {
				meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.03
			}
			
			// Efecto de respiración para el tope
			if (isTop && !isHighlighted) {
				const breathe = Math.sin(state.clock.elapsedTime * 2) * 0.02 + 1
				meshRef.current.scale.setScalar(breathe)
			}
		}
		
		// Animación del brillo
		if (glowRef.current && (isHighlighted || isTop)) {
			glowRef.current.rotation.y = state.clock.elapsedTime * 0.5
		}
	})

	return (
		<animated.group 
			scale={scale} 
			position-y={posY}
			rotation-y={rotationY}
			onPointerOver={() => setHovered(true)}
			onPointerOut={() => setHovered(false)}
		>
			{/* Elemento principal */}
			<RoundedBox
				ref={meshRef}
				args={[4, elementHeight, 4]}
				radius={Math.min(0.2, elementHeight * 0.15)}
				smoothness={6}
				position={[position[0], 0, position[2]]}
				castShadow
				receiveShadow
			>
				<animated.meshStandardMaterial
					color={isHighlighted ? highlightColor : isTop ? "#22c55e" : gradientColor}
					roughness={0.15}
					metalness={0.85}
					emissive={isHighlighted ? highlightColor : isTop ? "#22c55e" : gradientColor}
					emissiveIntensity={emissiveIntensity}
				/>
			</RoundedBox>
			
			{/* Texto frontal mejorado */}
			<Text
				position={[position[0], 0, position[2] + 2.02]}
				fontSize={textSize}
				color="white"
				anchorX="center"
				anchorY="middle"
				outlineWidth={0.03}
				outlineColor="#000000"
			>
				{value.toString()}
			</Text>

			{/* Texto trasero */}
			<Text
				position={[position[0], 0, position[2] - 2.02]}
				fontSize={textSize}
				color="white"
				anchorX="center"
				anchorY="middle"
				rotation={[0, Math.PI, 0]}
				outlineWidth={0.03}
				outlineColor="#000000"
			>
				{value.toString()}
			</Text>

			{/* Efecto de brillo exterior */}
			{(isHighlighted || isTop) && (
				<RoundedBox
					ref={glowRef}
					args={[4.2, elementHeight + 0.05, 4.2]}
					radius={Math.min(0.22, elementHeight * 0.17)}
					smoothness={4}
					position={[position[0], 0, position[2]]}
				>
					<animated.meshBasicMaterial 
						color={isHighlighted ? "#60a5fa" : "#4ade80"}
						transparent 
						opacity={glowOpacity}
						side={THREE.BackSide}
					/>
				</RoundedBox>
			)}

			{/* Indicador de TOP en la parte superior */}
			{isTop && !isHighlighted && (
				<mesh position={[position[0], elementHeight / 2 + 0.15, position[2]]}>
					<sphereGeometry args={[Math.min(0.15, elementHeight * 0.15), 16, 16]} />
					<meshStandardMaterial 
						color="#22c55e" 
						emissive="#22c55e"
						emissiveIntensity={0.8}
					/>
				</mesh>
			)}

			{/* Línea decorativa lateral */}
			<mesh position={[position[0] + 2.05, 0, position[2]]}>
				<boxGeometry args={[0.05, elementHeight * 0.7, 3.6]} />
				<meshStandardMaterial 
					color={isTop ? "#22c55e" : isHighlighted ? "#3b82f6" : "#818cf8"}
					emissive={isTop ? "#22c55e" : isHighlighted ? "#3b82f6" : "#818cf8"}
					emissiveIntensity={0.3}
				/>
			</mesh>

			<mesh position={[position[0] - 2.05, 0, position[2]]}>
				<boxGeometry args={[0.05, elementHeight * 0.7, 3.6]} />
				<meshStandardMaterial 
					color={isTop ? "#22c55e" : isHighlighted ? "#3b82f6" : "#818cf8"}
					emissive={isTop ? "#22c55e" : isHighlighted ? "#3b82f6" : "#818cf8"}
					emissiveIntensity={0.3}
				/>
			</mesh>
		</animated.group>
	)
}
