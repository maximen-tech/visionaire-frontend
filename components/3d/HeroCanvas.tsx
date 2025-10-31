"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// Animated sphere with distortion
function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;

    // Slow rotation
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#00D4FF"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

// Floating particles
function Particles({ count = 100 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 10;
    const y = (Math.random() - 0.5) * 10;
    const z = (Math.random() - 0.5) * 10;
    particlesPosition.set([x, y, z], i * 3);
  }

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlesPosition, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#A78BFA" transparent opacity={0.6} />
    </points>
  );
}

// Wireframe torus
function WireframeTorus() {
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!torusRef.current) return;
    torusRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    torusRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <mesh ref={torusRef} position={[2, 0, -2]}>
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshBasicMaterial color="#10B981" wireframe />
    </mesh>
  );
}

interface HeroCanvasProps {
  enableInteraction?: boolean;
}

export function HeroCanvas({ enableInteraction = false }: HeroCanvasProps) {
  return (
    <div className="absolute inset-0 -z-10 opacity-30 dark:opacity-50">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#00D4FF" />

          {/* 3D Elements */}
          <AnimatedSphere />
          <Particles count={150} />
          <WireframeTorus />

          {/* Controls (optional) */}
          {enableInteraction && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

// Lightweight fallback for mobile
export function HeroCanvasFallback() {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-purple-50 to-emerald-50 dark:from-cyan-950/20 dark:via-purple-950/20 dark:to-emerald-950/20 opacity-50" />

      {/* Animated gradient blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-300 dark:bg-cyan-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-float animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-emerald-300 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-float animation-delay-4000" />
    </div>
  );
}

// Smart component that uses Canvas on desktop, fallback on mobile
export function ResponsiveHeroBackground() {
  if (typeof window === "undefined") {
    return <HeroCanvasFallback />;
  }

  const isMobile = window.innerWidth < 768;

  return isMobile ? <HeroCanvasFallback /> : <HeroCanvas />;
}
