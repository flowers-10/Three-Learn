import { OrbitControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import {
  DepthOfField,
  Bloom,
  Noise,
  Glitch,
  ToneMapping,
  Vignette,
  EffectComposer,
} from "@react-three/postprocessing";
import { GlitchMode, BlendFunction, ToneMappingMode } from "postprocessing";
import { useRef } from "react";
import { useControls } from "leva";

import Drunk from "./Drunk.jsx";

export default function Experience() {
  const drunkRef = useRef();
  const drunkProps = useControls("Drunk Effect", {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });
  return (
    <>
      <color args={["#ffffff"]} attach="background" />
      <EffectComposer>
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
        {/* <Vignette
          blendFunction={BlendFunction.NORMAL}
          offset={0.3}
          darkness={0.9}
        /> */}
        {/* <Glitch
          mode={GlitchMode.CONSTANT_MILD}
          delay={[0.5, 1]}
          duration={[0.1, 0.3]}
          strength={[0.2, 0.4]}
        /> */}
        {/* <Noise blendFunction={BlendFunction.SOFT_LIGHT} /> */}
          <Bloom
                mipmapBlur
                intensity={ 0.5 }
                luminanceThreshold={ 0 }
            />
        {/* <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        /> */}
        <Drunk ref={drunkRef} frequency={2} amplitude={0.1} {...drunkProps} blendFunction={ BlendFunction.DARKEN }/>
      </EffectComposer>
      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight castShadow position={[1, 2, 3]} intensity={4.5} />
      <ambientLight intensity={1.5} />

      <mesh castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="orange" emissive="orange" />
      </mesh>

      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
