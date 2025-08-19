"use client";

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Shape, ExtrudeGeometry, Group } from 'three';

interface BoxProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

const Box: React.FC<BoxProps> = ({ position, rotation }) => {
    const shape = new Shape();
    const angleStep = Math.PI * 0.5;
    const radius = 1;

    shape.absarc(2, 2, radius, angleStep * 0, angleStep * 1);
    shape.absarc(-2, 2, radius, angleStep * 1, angleStep * 2);
    shape.absarc(-2, -2, radius, angleStep * 2, angleStep * 3);
    shape.absarc(2, -2, radius, angleStep * 3, angleStep * 4);

    const extrudeSettings = {
        depth: 0.3,
        bevelEnabled: true,
        bevelThickness: 0.05,
        bevelSize: 0.05,
        bevelSegments: 20,
        curveSegments: 20
    };

    const geometry = new ExtrudeGeometry(shape, extrudeSettings);
    geometry.center();

    return (
        <mesh
            geometry={geometry}
            position={position}
            rotation={rotation}
        >
            <meshPhysicalMaterial 
                color="#232323"
                metalness={1}
                roughness={0.3}
                reflectivity={0.5}
                ior={1.5}
                emissive="#000000"
                emissiveIntensity={0}
                transparent={false}
                opacity={1.0}
                transmission={0.0}
                thickness={0.5}
                clearcoat={0.0}
                clearcoatRoughness={0.0}
                sheen={0}
                sheenRoughness={1.0}
                sheenColor="#ffffff"
                specularIntensity={1.0}
                specularColor="#ffffff"
                iridescence={1}
                iridescenceIOR={1.3}
                iridescenceThicknessRange={[100, 400]}
                flatShading={false}
                side={0}
                alphaTest={0}
                depthWrite={true}
                depthTest={true}
            />
        </mesh>
    );
};

interface BoxData {
  position: [number, number, number];
  rotation: [number, number, number];
  id: number;
}

const AnimatedBoxes: React.FC = () => {
    const groupRef = useRef<Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.05;
        }
    });

    const boxes: BoxData[] = Array.from({ length: 50 }, (_, index) => ({
        position: [(index - 25) * 0.75, 0, 0] as [number, number, number],
        rotation: [
            (index - 10) * 0.1,
            Math.PI / 2,
            0
        ] as [number, number, number],
        id: index
    }));

    return (
        <group ref={groupRef}>
            {boxes.map((box) => (
                <Box
                    key={box.id}
                    position={box.position}
                    rotation={box.rotation}
                />
            ))}
        </group>
    );
};

export interface SceneProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  title?: string;
}

export const Scene: React.FC<SceneProps> = ({ className = '', title }) => {
  // Camera positioned further back and higher for better background coverage
  const [cameraPosition] = React.useState<[number, number, number]>([0, 0, 25]);

  return (
    <div className={`${className} w-full h-full relative`}>
      <Canvas
        camera={{
          position: cameraPosition,
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.8} color="#ffffff" />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.5}
          color="#ffffff"
          castShadow={false}
        />
        <AnimatedBoxes />
      </Canvas>
      
      {/* Title overlay */}
      {title && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight text-center px-4">
            {title.split(' ')[0]}
            <span className="block bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              {title.split(' ').slice(1).join(' ')}
            </span>
          </h1>
        </div>
      )}
    </div>
  );
};