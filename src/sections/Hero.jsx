import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { profile } from '../data/profile'

// メインパーティクル: 小さく大量、球状分布
function SmallParticles() {
  const ref = useRef()
  const count = 4000

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.rotation.y = t * 0.07
    ref.current.rotation.x = Math.sin(t * 0.025) * 0.25
    ref.current.rotation.z = Math.cos(t * 0.018) * 0.12
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7c3aed" size={0.055} sizeAttenuation transparent opacity={0.9} />
    </points>
  )
}

// 中間パーティクル: 明るい紫、逆回転、息継ぎする透明度
function MidParticles() {
  const ref = useRef()
  const count = 350

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 32
      arr[i * 3 + 1] = (Math.random() - 0.5) * 32
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.rotation.y = -t * 0.045
    ref.current.rotation.x = Math.cos(t * 0.022) * 0.18
    ref.current.material.opacity = 0.45 + Math.sin(t * 0.9) * 0.35
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#a78bfa" size={0.2} sizeAttenuation transparent opacity={0.7} />
    </points>
  )
}

// 輝く星: 少数・大きい、サイズと透明度がパルス
function GlowStars() {
  const ref = useRef()
  const count = 70

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 26
      arr[i * 3 + 1] = (Math.random() - 0.5) * 26
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    ref.current.rotation.y = t * 0.025
    ref.current.material.size    = 0.38 + Math.sin(t * 1.1) * 0.18
    ref.current.material.opacity = 0.55 + Math.sin(t * 0.85) * 0.35
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c4b5fd" size={0.38} sizeAttenuation transparent opacity={0.75} />
    </points>
  )
}

// 軌道リング: 3重のトーラスがそれぞれ異なる軸で回転
function OrbitalRings() {
  const r1 = useRef()
  const r2 = useRef()
  const r3 = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime

    r1.current.rotation.x = t * 0.12
    r1.current.rotation.y = t * 0.08
    r1.current.material.opacity = 0.07 + Math.sin(t * 0.6) * 0.04

    r2.current.rotation.x = t * 0.07 + 1.2
    r2.current.rotation.z = t * 0.1
    r2.current.material.opacity = 0.05 + Math.sin(t * 0.45 + 1) * 0.03

    r3.current.rotation.y = t * 0.06 + 2.4
    r3.current.rotation.z = t * 0.09
    r3.current.material.opacity = 0.04 + Math.sin(t * 0.55 + 2) * 0.025
  })

  return (
    <>
      <mesh ref={r1}>
        <torusGeometry args={[6.5, 0.018, 4, 200]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.07} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[10, 0.014, 4, 220]} />
        <meshBasicMaterial color="#6d28d9" transparent opacity={0.05} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[13.5, 0.01, 4, 240]} />
        <meshBasicMaterial color="#4c1d95" transparent opacity={0.04} />
      </mesh>
    </>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js背景 */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
          <SmallParticles />
          <MidParticles />
          <GlowStars />
          <OrbitalRings />
        </Canvas>
      </div>

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/20 via-transparent to-[#0a0a0f]" />

      {/* コンテンツ */}
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
          <a
            href="#works"
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-medium transition-colors"
          >
            制作物を見る
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white rounded-lg font-medium transition-colors"
          >
            連絡する
          </a>
        </div>

        {/* GitHub リンク */}
        <div className="mt-8 flex gap-6 justify-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.voicePortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
          >
            声優ポートフォリオ
          </a>
        </div>
      </div>

      {/* スクロール誘導 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-500" />
        <span className="text-slate-600 text-xs tracking-widest">SCROLL</span>
      </div>
    </section>
  )
}
