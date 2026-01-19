"use client"

import { useMemo } from "react"
import { Line } from "@react-three/drei"
import * as THREE from "three"

interface LinkedListLink3DProps {
	start: [number, number, number]
	end: [number, number, number]
	scale?: number
}

export function LinkedListLink3D({ start, end, scale = 1 }: LinkedListLink3DProps) {
	const { points, arrowPoints, lineWidth, glowWidth } = useMemo(() => {
		const startVec = new THREE.Vector3(...start)
		const endVec = new THREE.Vector3(...end)
		
		// Ajustar para que no toque los nodos - escalado
		const nodeRadius = 1 * scale
		const direction = new THREE.Vector3().subVectors(endVec, startVec).normalize()
		const adjustedStart = startVec.clone().add(direction.clone().multiplyScalar(nodeRadius))
		const adjustedEnd = endVec.clone().sub(direction.clone().multiplyScalar(nodeRadius))

		// Crear curva con control point
		const midpoint = new THREE.Vector3().addVectors(adjustedStart, adjustedEnd).multiplyScalar(0.5)
		midpoint.y += 0.3 * scale // Pequeña curva hacia arriba

		// Puntos para la flecha - escalados
		const arrowSize = 0.25 * scale
		const arrowBack = adjustedEnd.clone().sub(direction.clone().multiplyScalar(arrowSize))
		const perpendicular = new THREE.Vector3(-direction.z, 0, direction.x).normalize()
		
		const arrowLeft = arrowBack.clone().add(perpendicular.clone().multiplyScalar(arrowSize * 0.6))
		const arrowRight = arrowBack.clone().sub(perpendicular.clone().multiplyScalar(arrowSize * 0.6))
		arrowLeft.y += arrowSize * 0.3
		arrowRight.y += arrowSize * 0.3

		return {
			points: [adjustedStart, midpoint, adjustedEnd],
			arrowPoints: [
				[arrowLeft.x, arrowLeft.y, arrowLeft.z] as [number, number, number],
				[adjustedEnd.x, adjustedEnd.y, adjustedEnd.z] as [number, number, number],
				[arrowRight.x, arrowRight.y, arrowRight.z] as [number, number, number]
			],
			lineWidth: Math.max(2, 3 * scale),
			glowWidth: Math.max(4, 6 * scale)
		}
	}, [start, end, scale])

	return (
		<group>
			{/* Línea principal con degradado */}
			<Line
				points={points}
				color="#a78bfa"
				lineWidth={lineWidth}
				dashed={false}
			/>
			
			{/* Punta de flecha */}
			<Line
				points={arrowPoints}
				color="#a78bfa"
				lineWidth={lineWidth}
			/>

			{/* Efecto de resplandor */}
			<Line
				points={points}
				color="#8b5cf6"
				lineWidth={glowWidth}
				transparent
				opacity={0.3}
			/>
		</group>
	)
}
