import { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import { motion } from 'framer-motion'

const AnimatedSphere = ({ position, color, speed, distort }) => {
  const sphereRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    sphereRef.current.position.y = Math.sin(time * speed) * 0.2
    sphereRef.current.rotation.x = time * 0.1
    sphereRef.current.rotation.y = time * 0.15
  })
  
  return (
    <Sphere 
      ref={sphereRef} 
      args={[1, 64, 64]} 
      position={position}
      castShadow
    >
      <MeshDistortMaterial 
        color={color} 
        attach="material" 
        distort={distort} 
        speed={0.5} 
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  )
}

const ThreeDBackground = ({ style }) => {
  return (
    <motion.div 
      className="three-d-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.7 }} // Reduced opacity for better text visibility
      transition={{ duration: 1.5 }}
      style={{...style, pointerEvents: 'none'}} // Ensure it doesn't block interactions
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.4} /> // Slightly dimmer
        <directionalLight intensity={0.8} position={[5, 5, 5]} castShadow />
        <AnimatedSphere position={[-2, 0, 0]} color="#2980b9" speed={0.5} distort={0.4} />
        <AnimatedSphere position={[2, 0, 0]} color="#3498db" speed={0.7} distort={0.6} />
        <AnimatedSphere position={[0, 0, -2]} color="#1abc9c" speed={0.3} distort={0.3} />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </motion.div>
  )
}

export default ThreeDBackground
