import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Preload,
  useGLTF,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";
import {styles} from "../../styles"
import CanvasLoader from "../Loader";

const Earth = () => {
  const earth = useGLTF("/plne2/scene.gltf");

  return (
    <primitive
      object={earth.scene}
      scale={0.4}
      position={[0, 0, -0]}
      rotation-y={Math.PI / 3}
      // rotation={[0, 0, -0.02]}
    />
  );
};

const EarthCanvas = () => {
  return (
    <div className="W-500px">
      <h1 className={`${styles.heroHeadText} text-white`}>
        Welcome to <span className="text-[#00ff00]">Book MyPlane</span>
      </h1>
      <p className={`${styles.heroSubText} mt-2 text-white-100 w-[80%]`}>
        {"Book your Tickets Here ..."}
      </p>
      <Canvas
        shadows
        frameloop="demand"
        dpr={[2, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{
          fov: 30,
          near: 2,
          far: 300,
          position: [-20, 4, 10],
          rotation: [7, 0, 0],
        }}
      >
        <spotLight
          position={[-10, 100, 10]}
          angle={10}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={10}
        />
        <pointLight intensity={1} />
        {/* <primitive
        object={computer.scene}
        scale={0.75}
        position={[0, -3.8, -1.5]}
        rotation={[-0.01, -7.2, -0.1]}
      /> */}
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            autoRotate
            rotateX={50}
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          <Earth />

          {/* <Preload all /> */}
        </Suspense>
      </Canvas>
    </div>

    //
  );
};

export default EarthCanvas;
