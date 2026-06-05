"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Axis3D, Pause, Rotate3D, ScanLine, TriangleAlert } from "lucide-react";
import { detectReducedMotionPreference } from "@/lib/ui-settings";
import type { Group } from "three";

interface BodyProxyProps {
  wireframe: boolean;
  showAxes: boolean;
  showNegatives: boolean;
  animate: boolean;
  lowPowerMode: boolean;
  flexionAngle: number;
  selectedJoint: JointOption;
}

type JointOption = "knee" | "hip" | "thorax" | "shoulder";

const jointLabels: Record<JointOption, string> = {
  knee: "Knee",
  hip: "Hip",
  thorax: "Thorax",
  shoulder: "Shoulder",
};

function BodyProxy({
  wireframe,
  showAxes,
  showNegatives,
  animate,
  lowPowerMode,
  flexionAngle,
  selectedJoint,
}: BodyProxyProps) {
  const groupRef = useRef<Group>(null);
  const flexion = (flexionAngle / 180) * Math.PI;
  const kneeFlexion = selectedJoint === "knee" ? flexion * 0.36 : 0;
  const hipFlexion = selectedJoint === "hip" ? flexion * 0.22 : 0;
  const thoraxTwist = selectedJoint === "thorax" ? flexion * 0.18 : 0;
  const shoulderFlexion = selectedJoint === "shoulder" ? flexion * 0.3 : 0;

  useFrame((state, delta) => {
    if (!groupRef.current || !animate) {
      return;
    }

    const speed = lowPowerMode ? 0.15 : 0.35;
    groupRef.current.rotation.y += delta * speed;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, -0.25, 0]}>
      <mesh position={[0, 1.15, 0]} scale={[1.05, 0.45, 0.56]}>
        <sphereGeometry args={[0.72, 32, 18]} />
        <meshStandardMaterial color="#2dd4bf" roughness={0.35} metalness={0.25} wireframe={wireframe} />
      </mesh>

      <mesh position={[0, 2.05, 0]} rotation={[0, thoraxTwist, 0]} scale={[0.72, 1.15, 0.42]}>
        <sphereGeometry args={[0.64, 28, 18]} />
        <meshStandardMaterial color="#67e8f9" roughness={0.38} metalness={0.22} wireframe={wireframe} transparent opacity={0.92} />
      </mesh>

      <mesh position={[0, 2.8, 0]}>
        <sphereGeometry args={[0.28, 20, 16]} />
        <meshStandardMaterial color="#fbbf24" roughness={0.28} metalness={0.2} />
      </mesh>

      <mesh position={[-0.52, 0.35, 0]} rotation={[hipFlexion, 0, -0.28]}>
        <cylinderGeometry args={[0.13, 0.16, 1.55, 24]} />
        <meshStandardMaterial color="#38bdf8" wireframe={wireframe} roughness={0.35} />
      </mesh>
      <mesh position={[-0.82, -0.47, 0]} rotation={[kneeFlexion, 0, -0.34]}>
        <cylinderGeometry args={[0.11, 0.13, 1.45, 24]} />
        <meshStandardMaterial color="#2dd4bf" wireframe={wireframe} roughness={0.35} />
      </mesh>
      <mesh position={[0.52, 0.35, 0]} rotation={[hipFlexion, 0, 0.28]}>
        <cylinderGeometry args={[0.13, 0.16, 1.55, 24]} />
        <meshStandardMaterial color="#38bdf8" wireframe={wireframe} roughness={0.35} />
      </mesh>
      <mesh position={[0.82, -0.47, 0]} rotation={[kneeFlexion, 0, 0.34]}>
        <cylinderGeometry args={[0.11, 0.13, 1.45, 24]} />
        <meshStandardMaterial color="#2dd4bf" wireframe={wireframe} roughness={0.35} />
      </mesh>

      <mesh position={[-0.82, 1.82, 0]} rotation={[0, 0, -0.64 - shoulderFlexion]}>
        <cylinderGeometry args={[0.08, 0.1, 1.05, 18]} />
        <meshStandardMaterial color="#38bdf8" wireframe={wireframe} roughness={0.35} />
      </mesh>
      <mesh position={[0.82, 1.82, 0]} rotation={[0, 0, 0.64 + shoulderFlexion]}>
        <cylinderGeometry args={[0.08, 0.1, 1.05, 18]} />
        <meshStandardMaterial color="#38bdf8" wireframe={wireframe} roughness={0.35} />
      </mesh>

      {[
        [-0.62, -0.32, 0],
        [0.62, -0.32, 0],
        [-0.3, 1.15, 0],
        [0.3, 1.15, 0],
      ].map(([x, y, z]) => (
        <mesh key={`${x}-${y}-${z}`} position={[x, y, z]}>
          <sphereGeometry args={[0.18, 18, 14]} />
          <meshStandardMaterial color="#f59e0b" roughness={0.3} metalness={0.25} />
        </mesh>
      ))}

      <mesh position={[0, 1.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.015, 8, 96]} />
        <meshStandardMaterial color="#f97316" emissive="#7c2d12" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0, 2.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.54, 0.012, 8, 96]} />
        <meshStandardMaterial color="#f59e0b" emissive="#78350f" emissiveIntensity={0.22} />
      </mesh>

      {showNegatives ? (
        <group>
          {[
            [-0.42, 0.15, 0.18],
            [0.42, 0.15, -0.16],
            [-0.18, 1.25, 0.28],
          ].map(([x, y, z]) => (
            <mesh key={`negative-${x}-${y}-${z}`} position={[x, y, z]}>
              <sphereGeometry args={[0.1, 16, 12]} />
              <meshStandardMaterial color="#fb7185" emissive="#7f1d1d" emissiveIntensity={0.55} transparent opacity={0.86} />
            </mesh>
          ))}
        </group>
      ) : null}

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
  const [showNegatives, setShowNegatives] = useState(true);
  const [selectedJoint, setSelectedJoint] = useState<JointOption>("knee");
  const [flexionAngle, setFlexionAngle] = useState(70);
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
    <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-900/90" ref={containerRef}>
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 px-4 py-3">
        <button
          type="button"
          onClick={() => setWireframe((prev) => !prev)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-xs text-slate-200 transition hover:border-amber-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
        >
          <ScanLine size={14} aria-hidden />
          {wireframe ? "Surface Mode" : "Wireframe Mode"}
        </button>
        <button
          type="button"
          onClick={() => setShowAxes((prev) => !prev)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-xs text-slate-200 transition hover:border-amber-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
        >
          <Axis3D size={14} aria-hidden />
          {showAxes ? "Hide Axes" : "Show Axes"}
        </button>
        <button
          type="button"
          onClick={() => setShowNegatives((prev) => !prev)}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-xs text-slate-200 transition hover:border-amber-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300/80"
        >
          <TriangleAlert size={14} aria-hidden />
          {showNegatives ? "Hide Negatives" : "Show Negatives"}
        </button>
        <p className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase text-slate-400">
          {animate ? <Rotate3D size={14} aria-hidden /> : <Pause size={14} aria-hidden />}
          {animate ? "animation active" : "paused for performance"}
        </p>
      </div>

      <div className="grid gap-3 border-b border-white/10 px-4 py-3 lg:grid-cols-[0.8fr_1fr_1.1fr] lg:items-center">
        <label className="space-y-1">
          <span className="font-mono text-[11px] uppercase text-slate-400">Joint workflow</span>
          <select
            value={selectedJoint}
            onChange={(event) => setSelectedJoint(event.target.value as JointOption)}
            className="min-h-[44px] w-full rounded-lg border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-slate-100"
          >
            {(Object.keys(jointLabels) as JointOption[]).map((joint) => (
              <option key={joint} value={joint}>{jointLabels[joint]}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="font-mono text-[11px] uppercase text-slate-400">
            Repositioning angle: {flexionAngle}deg
          </span>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={flexionAngle}
            onChange={(event) => setFlexionAngle(Number(event.target.value))}
            className="h-11 w-full accent-amber-300"
          />
        </label>
        <div className="grid gap-2 sm:grid-cols-3">
          {[
            { label: "Before", value: "~6000", tone: "text-rose-200" },
            { label: "After", value: "2", tone: "text-emerald-200" },
            { label: "Knee", value: "70deg", tone: "text-amber-100" },
          ].map((metric) => (
            <div key={metric.label} className="rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2">
              <p className="font-mono text-[10px] uppercase text-slate-500">{metric.label}</p>
              <p className={`mt-1 text-lg font-semibold ${metric.tone}`}>{metric.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-[420px] w-full">
        <Canvas
          camera={{ position: [0, 0.75, 5.6], fov: 48 }}
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
            showNegatives={showNegatives}
            animate={animate}
            lowPowerMode={lowPowerMode}
            flexionAngle={flexionAngle}
            selectedJoint={selectedJoint}
          />
          <OrbitControls enablePan={false} enableDamping={!lowPowerMode} minDistance={3} maxDistance={9} />
        </Canvas>
      </div>
    </div>
  );
}
