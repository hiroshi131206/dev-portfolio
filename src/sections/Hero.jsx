import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { profile } from '../data/profile'

// ---- 小さな星たち（白・青白・薄黄で色分け） ----
function StarField() {
  const ref = useRef()
  const count = 6000

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors    = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r     = 18 + Math.random() * 28
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const t = Math.random()
      if (t < 0.65) {
        // 白
        const b = 0.85 + Math.random() * 0.15
        colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = b
      } else if (t < 0.87) {
        // 青白
        colors[i * 3]     = 0.65 + Math.random() * 0.2
        colors[i * 3 + 1] = 0.78 + Math.random() * 0.15
        colors[i * 3 + 2] = 1.0
      } else {
        // 薄橙/黄
        colors[i * 3]     = 1.0
        colors[i * 3 + 1] = 0.82 + Math.random() * 0.12
        colors[i * 3 + 2] = 0.55 + Math.random() * 0.2
      }
    }
    return { positions, colors }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.rotation.y = t * 0.012
    ref.current.rotation.x = Math.sin(t * 0.006) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.038} sizeAttenuation transparent opacity={0.88} vertexColors />
    </points>
  )
}

// ---- きらめく明るい星（3グループで位相ずれ） ----
function TwinkleStars() {
  const r0 = useRef(), r1 = useRef(), r2 = useRef()
  const refs = [r0, r1, r2]

  const groups = useMemo(() =>
    [
      { count: 90,  color: '#ffffff', size: 0.14 },
      { count: 70,  color: '#b0c8ff', size: 0.18 },
      { count: 55,  color: '#ffd580', size: 0.13 },
    ].map(({ count }) => {
      const arr = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        arr[i * 3]     = (Math.random() - 0.5) * 50
        arr[i * 3 + 1] = (Math.random() - 0.5) * 50
        arr[i * 3 + 2] = (Math.random() - 0.5) * 25
      }
      return arr
    }), [])

  const meta = [
    { color: '#ffffff', size: 0.14, phase: 0,   speed: 1.4 },
    { color: '#b0c8ff', size: 0.18, phase: 2.1, speed: 0.9 },
    { color: '#ffd580', size: 0.13, phase: 4.3, speed: 1.7 },
  ]

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    refs.forEach((ref, i) => {
      ref.current.material.opacity = 0.5 + Math.sin(t * meta[i].speed + meta[i].phase) * 0.45
    })
  })

  return (
    <>
      {groups.map((pos, i) => (
        <points ref={refs[i]} key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pos, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={meta[i].color}
            size={meta[i].size}
            sizeAttenuation transparent opacity={0.8}
          />
        </points>
      ))}
    </>
  )
}

// ---- 星雲（大粒・低透明度の3色霧） ----
function Nebula() {
  const r0 = useRef(), r1 = useRef(), r2 = useRef()
  const refs = [r0, r1, r2]

  const clouds = useMemo(() =>
    [
      { count: 700, spread: 22 },
      { count: 500, spread: 28 },
      { count: 400, spread: 34 },
    ].map(({ count, spread }) => {
      const arr = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        // 均一な球状分布（中心集中なし）
        const r     = (0.4 + Math.random() * 0.6) * spread
        const theta = Math.random() * Math.PI * 2
        const phi   = Math.acos(2 * Math.random() - 1)
        arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
        arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
        arr[i * 3 + 2] = r * Math.cos(phi)
      }
      return arr
    }), [])

  const meta = [
    { color: '#3b0764', size: 0.32, baseOp: 0.055, amp: 0.02, speed: 0.28 },
    { color: '#1e3a8a', size: 0.38, baseOp: 0.040, amp: 0.015, speed: 0.22 },
    { color: '#4a1942', size: 0.45, baseOp: 0.030, amp: 0.01, speed: 0.18 },
  ]

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    r0.current.rotation.z = t * 0.007
    r1.current.rotation.z = -t * 0.005
    r2.current.rotation.y = t * 0.004
    refs.forEach((ref, i) => {
      ref.current.material.opacity = meta[i].baseOp + Math.sin(t * meta[i].speed + i) * meta[i].amp
    })
  })

  return (
    <>
      {clouds.map((pos, i) => (
        <points ref={refs[i]} key={i}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[pos, 3]} />
          </bufferGeometry>
          <pointsMaterial
            color={meta[i].color}
            size={meta[i].size}
            sizeAttenuation transparent opacity={meta[i].baseOp}
          />
        </points>
      ))}
    </>
  )
}

// ---- 軌道リング（宇宙ステーション風） ----
function OrbitalRings() {
  const r1 = useRef(), r2 = useRef(), r3 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    r1.current.rotation.x = t * 0.10;  r1.current.rotation.y = t * 0.07
    r1.current.material.opacity = 0.06 + Math.sin(t * 0.55) * 0.03

    r2.current.rotation.x = t * 0.06 + 1.2;  r2.current.rotation.z = t * 0.09
    r2.current.material.opacity = 0.04 + Math.sin(t * 0.4 + 1) * 0.025

    r3.current.rotation.y = t * 0.05 + 2.4;  r3.current.rotation.z = t * 0.08
    r3.current.material.opacity = 0.03 + Math.sin(t * 0.5 + 2) * 0.02
  })

  return (
    <>
      <mesh ref={r1}><torusGeometry args={[7, 0.016, 4, 200]} /><meshBasicMaterial color="#7c3aed" transparent opacity={0.06} /></mesh>
      <mesh ref={r2}><torusGeometry args={[11, 0.012, 4, 220]} /><meshBasicMaterial color="#1e40af" transparent opacity={0.04} /></mesh>
      <mesh ref={r3}><torusGeometry args={[15, 0.009, 4, 240]} /><meshBasicMaterial color="#4c1d95" transparent opacity={0.03} /></mesh>
    </>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 12], fov: 65 }}>
          <Nebula />
          <StarField />
          <TwinkleStars />
          <OrbitalRings />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/10 via-transparent to-[#0a0a0f]" />

      <div className="relative z-10 text-center px-6">
        <p className="text-violet-400 text-sm font-mono tracking-widest mb-4 uppercase">
          Portfolio
        </p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          {profile.nameEn}
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-2 font-light">
          {profile.name}
        </p>
        <p className="text-slate-400 mb-2">{profile.school}</p>
        <p className="text-slate-500 text-sm mb-10">{profile.graduationYear}</p>

        <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          {profile.tagline}
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a href="#works" className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors">
            制作物を見る
          </a>
          <a href="#contact" className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white rounded-lg font-medium transition-colors">
            連絡する
          </a>
        </div>

        <div className="mt-8 flex gap-6 justify-center">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            GitHub
          </a>
          <a href={profile.voicePortfolio} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            声優ポートフォリオ
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-500" />
        <span className="text-slate-600 text-xs tracking-widest">SCROLL</span>
      </div>
    </section>
  )
}
