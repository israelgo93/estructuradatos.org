"use client"

import { Text, Sphere } from "@react-three/drei"
import { useSpring, animated } from "@react-spring/three"

interface GraphNode3DProps {
  id: string
  label: string
  position: [number, number, number]
  isVisited: boolean
  isCurrent: boolean
  isPath: boolean
  distance: number | string
}

export function GraphNode3D({ label, position, isVisited, isCurrent, isPath, distance }: GraphNode3DProps) {
  let color = "#64748b" // Default gray
  if (isCurrent) color = "#facc15" // Yellow
  else if (isPath) color = "#22c55e" // Green
  else if (isVisited) color = "#3b82f6" // Blue

  const { scale } = useSpring({
    scale: 1,
    from: { scale: 0 },
    config: { tension: 200, friction: 20 }
  })

  return (
    <animated.group scale={scale} position={position}>
      <Sphere args={[0.6, 32, 32]} castShadow>
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.4}
        />
      </Sphere>
      <Text
        position={[0, 0.8, 0]}
        fontSize={0.3}
        color="white"
      >
        {label}
      </Text>
      <Text
        position={[0, -0.8, 0]}
        fontSize={0.25}
        color="#94a3b8"
      >
        {distance === Infinity ? "∞" : distance}
      </Text>
    </animated.group>
  )
}
