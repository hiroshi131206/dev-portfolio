import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { profile } from '../data/profile'

// 浮遊する水中粒子（気泡・微粒子）
function FlowField() {
  const ref = useRef()
  const count = 3000

  const state = useMemo(() => {
    const pos   = new Float32Array(count * 3)
    const vel   = new Float32Array(count * 3)
    const phase = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 28
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16
      vel[i * 3]     = (Math.random() - 0.5) * 0.008
      vel[i * 3 + 1] = 0.004 + Math.random() * 0.008  // 上昇
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.006
      phase[i] = Math.random() * Math.PI * 2
    }
    return { pos, vel, phase }
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const p = ref.current.geometry.attributes.position
    for (let i = 0; i < count; i++) {
      p.array[i * 3]     += state.vel[i * 3]     + Math.sin(t * 0.4 + state.phase[i]) * 0.004
      p.array[i * 3 + 1] += state.vel[i * 3 + 1] + Math.cos(t * 0.3 + state.phase[i]) * 0.001
      p.array[i * 3 + 2] += state.vel[i * 3 + 2]
      if (p.array[i * 3 + 1] > 11)  p.array[i * 3 + 1] = -11
      if (p.array[i * 3]     > 14)  p.array[i * 3]     = -14
      if (p.array[i * 3]     < -14) p.array[i * 3]     = 14
    }
    p.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[state.pos, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#22d3ee" size={0.04} sizeAttenuation transparent opacity={0.65} />
    </points>
  )
}

// 水面の光のきらめき
function SurfaceGlints() {
  const ref = useRef()
  const count = 70

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 24
      arr[i * 3 + 1] = 3 + Math.random() * 6
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.material.opacity = 0.4 + Math.sin(t * 2.1) * 0.35
    ref.current.material.size    = 0.16 + Math.sin(t * 1.7) * 0.09
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#e0f7ff" size={0.16} sizeAttenuation transparent opacity={0.7} />
    </points>
  )
}

// コースティック光（水底の光の揺らぎ）
function CausticGrid() {
  const ref = useRef()
  const W = 38, H = 38
  const count = W * H

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    let idx = 0
    for (let xi = 0; xi < W; xi++) {
      for (let zi = 0; zi < H; zi++) {
        arr[idx * 3]     = (xi / (W - 1) - 0.5) * 26
        arr[idx * 3 + 1] = -4.5
        arr[idx * 3 + 2] = (zi / (H - 1) - 0.5) * 22
        idx++
      }
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    const p = ref.current.geometry.attributes.position
    let idx = 0
    for (let xi = 0; xi < W; xi++) {
      for (let zi = 0; zi < H; zi++) {
        const x = p.array[idx * 3]
        const z = p.array[idx * 3 + 2]
        p.array[idx * 3 + 1] = -4.5
          + Math.sin(x * 0.4 + t * 0.9) * 0.38
          + Math.sin(z * 0.35 + t * 0.7) * 0.28
          + Math.sin((x + z) * 0.25 + t * 1.2) * 0.16
        idx++
      }
    }
    p.needsUpdate = true
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#0e7490" size={0.07} sizeAttenuation transparent opacity={0.5} />
    </points>
  )
}

// 深い粒子群（奥行き感）
function DeepField() {
  const ref = useRef()
  const count = 1200

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 32
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = -8 - Math.random() * 10
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.rotation.y = t * 0.008
    ref.current.material.opacity = 0.2 + Math.sin(t * 0.4) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#0891b2" size={0.05} sizeAttenuation transparent opacity={0.25} />
    </points>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 1, 12], fov: 60 }}>
          <DeepField />
          <CausticGrid />
          <FlowField />
          <SurfaceGlints />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#040e1a]/30 via-transparent to-[#040e1a]" />

      <div className="relative z-10 text-center px-6">
        {/* ラベル */}
        <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-8">
          Portfolio
        </p>

        {/* 名前 */}
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-none mb-3">
          {profile.nameEn}
        </h1>
        <p className="text-2xl md:text-3xl text-slate-300 font-light mb-6">
          {profile.name}
        </p>

        {/* 所属 — 1行にまとめる */}
        <p className="text-slate-500 text-sm mb-14 tracking-wide">
          {profile.school}
          <span className="mx-3 text-slate-700">|</span>
          {profile.graduationYear}
        </p>

        {/* キャッチコピー */}
        <p className="text-slate-200 text-lg md:text-xl max-w-lg mx-auto mb-14 leading-relaxed">
          {profile.tagline}
        </p>

        {/* CTA ボタン */}
        <div className="flex gap-4 justify-center flex-wrap mb-8">
          <a href="#works" className="px-7 py-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium transition-colors">
            制作物を見る
          </a>
          <a href="#contact" className="px-7 py-3 border border-slate-600 hover:border-cyan-500 text-slate-300 hover:text-white rounded-lg font-medium transition-colors">
            連絡する
          </a>
        </div>

        {/* 外部リンク */}
        <div className="flex gap-8 justify-center">
          <a href={profile.github} target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors flex items-center gap-1.5">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href={profile.voicePortfolio} target="_blank" rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors">
            声優ポートフォリオ
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-cyan-600/60" />
        <span className="text-slate-500 text-xs tracking-widest">SCROLL</span>
      </div>
    </section>
  )
}
