import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera,
  Stars,
  Points,
  PointMaterial,
} from '@react-three/drei';
import * as THREE from 'three';
import { MotionValue, useTransform } from 'motion/react';

const DigitalDust = ({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) => {
  const count = 800;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      const scroll = scrollYProgress?.get() || 0;
      pointsRef.current.rotation.y += 0.0002 + scroll * 0.005;
      pointsRef.current.rotation.x += 0.0001 + scroll * 0.002;
      
      // Dynamic scale based on scroll
      const s = 1 + scroll * 0.5;
      pointsRef.current.scale.set(s, s, s);
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00F0FF"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.15}
      />
    </Points>
  );
};

const CoordinateAxes = () => {
  return (
    <group scale={[10, 10, 10]}>
      {/* X Axis */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1, 0, 0), new THREE.Vector3(1, 0, 0)])} />
        <lineBasicMaterial attach="material" color="#ff0000" opacity={0.2} transparent />
      </line>
      {/* Y Axis */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 1, 0)])} />
        <lineBasicMaterial attach="material" color="#00ff00" opacity={0.2} transparent />
      </line>
      {/* Z Axis */}
      <line>
        <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 1)])} />
        <lineBasicMaterial attach="material" color="#0000ff" opacity={0.2} transparent />
      </line>
    </group>
  );
};

const NeuralToken = ({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) => {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const scroll = scrollYProgress?.get() || 0;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2 + scroll * 4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      
      const s = 1 + scroll * 1.5;
      meshRef.current.scale.set(s, s, s);
      
      // Floating effect
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Main Token Cube */}
      <mesh>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial 
          color="#00F0FF" 
          wireframe 
          transparent 
          opacity={0.3} 
          emissive="#00F0FF"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Inner Core */}
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial 
          color="#00F0FF" 
          transparent 
          opacity={0.1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Data Points inside */}
      <Points count={50}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            count={50}
            array={new Float32Array(Array.from({ length: 150 }, () => (Math.random() - 0.5) * 3.5))}
            itemSize={3}
          />
        </bufferGeometry>
        <PointMaterial
          transparent
          color="#00F0FF"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Coordinate Labels (Visualized as small lines/dots) */}
      <group position={[2.5, 0, 0]}>
        <mesh><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#ff0000" /></mesh>
      </group>
      <group position={[0, 2.5, 0]}>
        <mesh><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#00ff00" /></mesh>
      </group>
      <group position={[0, 0, 2.5]}>
        <mesh><sphereGeometry args={[0.05]} /><meshBasicMaterial color="#0000ff" /></mesh>
      </group>
    </group>
  );
};

const SceneContent = ({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) => {
  const { mouse, camera } = useThree();
  
  useFrame(() => {
    const scroll = scrollYProgress?.get() || 0;
    camera.position.x += (mouse.x * 10 - camera.position.x) * 0.02;
    camera.position.y += (-mouse.y * 10 - camera.position.y) * 0.02;
    
    camera.position.z = 20 + scroll * 40;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00F0FF" />
      <pointLight position={[-10, -10, 10]} intensity={0.5} color="#ffffff" />
      
      <DigitalDust scrollYProgress={scrollYProgress} />
      <NeuralToken scrollYProgress={scrollYProgress} />
      <CoordinateAxes />
      
      <Stars radius={300} depth={150} count={3000} factor={4} saturation={0} fade speed={1} />
    </>
  );
};

const Scene3D: React.FC<{ activeTab: string; scrollYProgress?: MotionValue<number> }> = ({ scrollYProgress }) => {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 2]}>
        <SceneContent scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
};

export default Scene3D;
