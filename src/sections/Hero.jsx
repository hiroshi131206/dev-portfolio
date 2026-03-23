import { useRef, useMemo, Suspense, lazy } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { profile } from '../data/profile'

function ParticleField() {
  const meshRef = useRef()
  const count = 1800

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.04
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#7c3aed"
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  )
}

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js背景 */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <ParticleField />
        </Canvas>
      </div>

      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/30 via-transparent to-[#0a0a0f]" />

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
