import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, useTexture } from "@react-three/drei";
import { Suspense } from "react";

const EarthMarsModel = () => {
  return (
    <div className="w-full h-96 md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <Suspense fallback={null}>
          <OrbitControls enableZoom={true} />
          <ambientLight intensity={1} />
          <pointLight position={[10, 10, 10]} />

          {/* Sun */}
          <Sphere args={[1.8, 32, 32]} position={[5, 0, 0]}>
            <MeshWithTexture textureUrl="/textures/Sun.png" />
          </Sphere>

          {/* Mercury */}
          <Sphere args={[0.6, 32, 32]} position={[-1.5, 0, 0]}>
            <MeshWithTexture textureUrl="/textures/Mercury.png" />
          </Sphere>

          {/* Venus */}
          <Sphere args={[1, 32, 32]} position={[-4, 0, 0]}>
            <MeshWithTexture textureUrl="/textures/Venus.png" />
          </Sphere>

          {/* Earth */}
          <Sphere args={[1.2, 32, 32]} position={[1, 0, 0]}>
            <MeshWithTexture textureUrl="/textures/Earth.png" />
          </Sphere>

          {/* Mars */}
          <Sphere args={[0.8, 32, 32]} position={[-6.5, 0, 0]}>
            <MeshWithTexture textureUrl="/textures/Mars.png" />
          </Sphere>

          {/* Jupiter */}
          <Sphere args={[1.8, 32, 32]} position={[-10, 0, 0]}>
            <MeshWithTexture textureUrl="/textures/Jupiter.png" />
          </Sphere>

          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
};

const MeshWithTexture = ({ textureUrl }) => {
  const texture = useTexture(textureUrl);
  return <meshStandardMaterial map={texture} />;
};

export default EarthMarsModel;
