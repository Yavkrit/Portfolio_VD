"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform vec3 uLineColor;
  uniform vec3 uSweepColor;
  varying vec2 vUv;

  float gridLine(float coord, float lineWidth) {
    float grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
    return 1.0 - clamp(grid / lineWidth, 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;
    vec2 scaled = uv * vec2(14.0, 9.0);

    float lines = max(gridLine(scaled.x, 1.4), gridLine(scaled.y, 1.4));

    float distToPointer = distance(uv, uPointer * 0.5 + 0.5);
    float glow = smoothstep(0.6, 0.0, distToPointer) * 0.5;

    float sweep = smoothstep(0.06, 0.0, abs(uv.y - fract(uTime * 0.05)));

    vec3 color = uLineColor * lines * (0.18 + glow);
    color += uSweepColor * sweep * 0.35;

    float vignette = smoothstep(0.9, 0.15, distance(uv, vec2(0.5)));

    gl_FragColor = vec4(color, (lines * 0.5 + sweep * 0.35) * vignette);
  }
`;

function SchematicPlane({
  lineColor,
  sweepColor,
}: {
  lineColor: string;
  sweepColor: string;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uLineColor: { value: new THREE.Color(lineColor) },
      uSweepColor: { value: new THREE.Color(sweepColor) },
    }),
    [lineColor, sweepColor]
  );

  useFrame(({ clock, pointer }) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    const target = materialRef.current.uniforms.uPointer.value as THREE.Vector2;
    target.lerp(new THREE.Vector2(pointer.x, pointer.y), 0.04);
  });

  return (
    <mesh scale={[viewport.width * 1.4, viewport.height * 1.4, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export function HeroScene({
  lineColor,
  sweepColor,
}: {
  lineColor: string;
  sweepColor: string;
}) {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 100, position: [0, 0, 10] }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      className="!absolute !inset-0"
    >
      <SchematicPlane lineColor={lineColor} sweepColor={sweepColor} />
    </Canvas>
  );
}
