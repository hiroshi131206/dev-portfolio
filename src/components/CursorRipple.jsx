import { useEffect, useRef } from 'react'

const TRAIL_LEN  = 32   // 軌跡の保持数
const TRAIL_TTL  = 480  // 軌跡が消えるまでの時間(ms)

export default function CursorRipple() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ---- 状態 ----
    const trail    = []   // { x, y, t }
    const sparks   = []   // 飛び散り粒子
    const impacts  = []   // クリック爆発リング

    // ---- スパーク生成 ----
    const addSparks = (x, y, count, speedMult = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = (1.5 + Math.random() * 3.5) * speedMult
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 1.5,
          life: 1,
          size: 1.5 + Math.random() * 2.5,
          color: Math.random() < 0.5 ? '255,255,255' : '150,220,255',
        })
      }
    }

    // ---- 衝突リング生成 ----
    const addImpact = (x, y) => {
      for (let i = 0; i < 4; i++) {
        impacts.push({
          x, y,
          r: 4,
          speed: 10 + i * 5,
          opacity: 1 - i * 0.15,
          fade: 0.022 - i * 0.003,
          lw: 3.5 - i * 0.5,
          delay: i * 60,
          born: Date.now(),
        })
      }
    }

    // ---- 描画ループ ----
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now()

      // === 流れ星トレイル ===
      if (trail.length >= 2) {
        // 外側グロー（太く・薄い）
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        for (let i = 1; i < trail.length; i++) {
          const p    = trail[i - 1]
          const c    = trail[i]
          const prog = i / trail.length                         // 0=尾, 1=頭
          const age  = Math.max(0, 1 - (now - c.t) / TRAIL_TTL)
          const a    = prog * age

          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(c.x, c.y)
          ctx.strokeStyle = `rgba(100, 200, 255, ${a * 0.35})`
          ctx.lineWidth   = 1 + prog * 10
          ctx.shadowBlur  = 20
          ctx.shadowColor = '#00cfff'
          ctx.stroke()
        }
        ctx.restore()

        // コアライン（細く・白く）
        ctx.save()
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        for (let i = 1; i < trail.length; i++) {
          const p    = trail[i - 1]
          const c    = trail[i]
          const prog = i / trail.length
          const age  = Math.max(0, 1 - (now - c.t) / TRAIL_TTL)
          const a    = prog * age

          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(c.x, c.y)
          ctx.strokeStyle = `rgba(255, 255, 255, ${a * 0.9})`
          ctx.lineWidth   = 0.5 + prog * 2.5
          ctx.shadowBlur  = 10
          ctx.shadowColor = '#ffffff'
          ctx.stroke()
        }
        ctx.restore()

        // 頭部の輝き（ラジアルグラデーション）
        const head = trail[trail.length - 1]
        const headAge = Math.max(0, 1 - (now - head.t) / 200)
        if (headAge > 0) {
          const grad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 22)
          grad.addColorStop(0,   `rgba(255, 255, 255, ${headAge * 0.95})`)
          grad.addColorStop(0.25, `rgba(180, 230, 255, ${headAge * 0.6})`)
          grad.addColorStop(0.6,  `rgba(0, 180, 255, ${headAge * 0.25})`)
          grad.addColorStop(1,    'rgba(0, 100, 255, 0)')
          ctx.beginPath()
          ctx.arc(head.x, head.y, 22, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()

          ctx.beginPath()
          ctx.arc(head.x, head.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 255, 255, ${headAge})`
          ctx.shadowBlur  = 30
          ctx.shadowColor = '#ffffff'
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // === 飛び散りスパーク ===
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x   += s.vx
        s.y   += s.vy
        s.vy  += 0.12   // 重力
        s.life -= 0.028
        if (s.life <= 0) { sparks.splice(i, 1); continue }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2)
        ctx.fillStyle   = `rgba(${s.color}, ${s.life * 0.9})`
        ctx.shadowBlur  = 12
        ctx.shadowColor = '#80e0ff'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // === クリック衝突リング ===
      for (let i = impacts.length - 1; i >= 0; i--) {
        const imp = impacts[i]
        const elapsed = now - imp.born - imp.delay
        if (elapsed < 0) continue

        imp.r       += imp.speed
        imp.opacity -= imp.fade
        if (imp.opacity <= 0) { impacts.splice(i, 1); continue }

        // 外側グロー
        ctx.beginPath()
        ctx.arc(imp.x, imp.y, imp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(150, 230, 255, ${imp.opacity * 0.4})`
        ctx.lineWidth   = imp.lw * 5
        ctx.shadowBlur  = 30
        ctx.shadowColor = '#00cfff'
        ctx.stroke()

        // コア
        ctx.beginPath()
        ctx.arc(imp.x, imp.y, imp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255, 255, 255, ${imp.opacity})`
        ctx.lineWidth   = imp.lw
        ctx.shadowBlur  = 15
        ctx.shadowColor = '#ffffff'
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    // ---- イベント ----
    const onMove = (e) => {
      trail.push({ x: e.clientX, y: e.clientY, t: Date.now() })
      if (trail.length > TRAIL_LEN) trail.shift()

      // 移動時にたまにスパークをこぼす
      if (Math.random() < 0.25) addSparks(e.clientX, e.clientY, 1, 0.6)
    }

    const onClick = (e) => {
      addImpact(e.clientX, e.clientY)
      addSparks(e.clientX, e.clientY, 20, 1.4)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
    />
  )
}
