"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { detectReducedMotionPreference } from "@/lib/ui-settings";
import type { Mesh } from "three";

interface BodyProxyProps {
  wireframe: boolean;
  showAxes: boolean;
  animate: boolean;
  lowPowerMode: boolean;
}

function BodyProxy({ wireframe, showAxes, animate, lowPowerMode }: BodyProxyProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || !animate) {
      return;
    }

    const speed = lowPowerMode ? 0.15 : 0.35;
    meshRef.current.rotation.y += delta * speed;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.75) * 0.16;
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.4, 0.42, 180, 24]} />
        <meshStandardMaterial
          color="#38bdf8"
          roughness={0.3}
          metalness={0.4}
          wireframe={wireframe}
        />
      </mesh>

      <mesh position={[0, 1.8, -0.8]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#f59e0b" />
      </mesh>

      {showAxes ? (
        <group>
          <mesh position={[2.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.04, 0.04, 4.2, 12]} />
            <meshStandardMaterial color="#f43f5e" />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 4.2, 12]} />
            <meshStandardMaterial color="#22c55e" />
          </mesh>
          <mesh position={[0, 0, 2.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 4.2, 12]} />
            <meshStandardMaterial color="#3b82f6" />
          </mesh>
        </group>
      ) : null}
    </group>
  );
}

interface ModelViewer3DProps {
  lowPowerMode?: boolean;
}

export function ModelViewer3D({ lowPowerMode = false }: ModelViewer3DProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => detectReducedMotionPreference(),
  );
  const [wireframe, setWireframe] = useState(false);
  const [showAxes, setShowAxes] = useState(true);
  const [inViewport, setInViewport] = useState(true);
  const [documentVisible, setDocumentVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInViewport(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);
    update();

    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setDocumentVisible(document.visibilityState === "visible");
    };

    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const animate = useMemo(
    () => !prefersReducedMotion && !lowPowerMode && inViewport && documentVisible,
    [documentVisible, inViewport, lowPowerMode, prefersReducedMotion],
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/90" ref={containerRef}>
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
        <button
          type="button"
          onClick={() => setWireframe((prev) => !prev)}
          className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-4 py-2 text-xs text-slate-200 transition hover:border-cyan-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
        >
          {wireframe ? "Surface Mode" : "Wireframe Mode"}
        </button>
        <button
          type="button"
          onClick={() => setShowAxes((prev) => !prev)}
          className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 px-4 py-2 text-xs text-slate-200 transition hover:border-cyan-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/80"
        >
          {showAxes ? "Hide Axes" : "Show Axes"}
        </button>
        <p className="ml-auto font-mono text-[11px] uppercase tracking-[0.12em] text-slate-400">
          {animate ? "animation active" : "paused for performance"}
        </p>
      </div>

      <div className="h-[360px] w-full">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 55 }}
          frameloop={animate ? "always" : "demand"}
          dpr={lowPowerMode ? [1, 1] : [1, 1.25]}
          gl={{ powerPreference: lowPowerMode ? "low-power" : "high-performance" }}
        >
          <color attach="background" args={["#0b1120"]} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 5, 3]} intensity={1.2} color="#7dd3fc" />
          <pointLight position={[-4, -2, -5]} intensity={0.7} color="#f59e0b" />
          <BodyProxy
            wireframe={wireframe}
            showAxes={showAxes}
            animate={animate}
            lowPowerMode={lowPowerMode}
          />
          <OrbitControls enablePan={false} enableDamping={!lowPowerMode} minDistance={3} maxDistance={9} />
        </Canvas>
      </div>
    </div>
  );
}
