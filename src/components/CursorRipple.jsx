import { useEffect, useRef } from 'react'

export default function CursorRipple() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ---- オブジェクトプール ----
    const rings  = []  // 拡張リング
    const sparks = []  // トレイル用光点

    // ---- ユーティリティ ----
    const addRing = (x, y, opts) => rings.push({ x, y, r: opts.r0 ?? 8, ...opts })
    const addSpark = (x, y) =>
      sparks.push({ x, y, life: 1, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3 })

    // ---- アニメーションループ ----
    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // トレイル光点
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.06
        if (s.life <= 0) { sparks.splice(i, 1); continue }

        ctx.beginPath()
        ctx.arc(s.x, s.y, 3 * s.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 200, ${s.life})`
        ctx.shadowBlur  = 16
        ctx.shadowColor = '#00ffc8'
        ctx.fill()
        ctx.shadowBlur = 0
      }

      // 波紋リング
      for (let i = rings.length - 1; i >= 0; i--) {
        const rg = rings[i]
        rg.r       += rg.speed
        rg.opacity -= rg.fade

        if (rg.opacity <= 0) { rings.splice(i, 1); continue }

        ctx.beginPath()
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rg.rgb}, ${rg.opacity})`
        ctx.lineWidth   = rg.lw
        ctx.shadowBlur  = rg.glow
        ctx.shadowColor = rg.shadow
        ctx.stroke()

        // 二重グロー
        ctx.beginPath()
        ctx.arc(rg.x, rg.y, rg.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${rg.rgb}, ${rg.opacity * 0.35})`
        ctx.lineWidth   = rg.lw * 4
        ctx.shadowBlur  = rg.glow * 2
        ctx.stroke()
        ctx.shadowBlur = 0
      }

      raf = requestAnimationFrame(draw)
    }
    draw()

    // ---- イベント ----
    let lastMove = 0

    const onMove = (e) => {
      const now = Date.now()

      // トレイル点を毎イベント追加
      addSpark(e.clientX, e.clientY)

      // リングは間引き
      if (now - lastMove < 55) return
      lastMove = now

      addRing(e.clientX, e.clientY, {
        r0: 12, speed: 5, opacity: 0.95, fade: 0.028,
        lw: 2.5, glow: 30, shadow: '#00ffc8',
        rgb: '0, 255, 200',
      })
    }

    const onClick = (e) => {
      // 中心フラッシュ（白）
      addRing(e.clientX, e.clientY, {
        r0: 5, speed: 14, opacity: 1, fade: 0.022,
        lw: 4, glow: 60, shadow: '#ffffff',
        rgb: '255, 255, 255',
      })
      // 第2波（シアン）
      addRing(e.clientX, e.clientY, {
        r0: 5, speed: 10, opacity: 1, fade: 0.018,
        lw: 3, glow: 50, shadow: '#00e5ff',
        rgb: '0, 229, 255',
      })
      // 第3波（ネオングリーン）
      addRing(e.clientX, e.clientY, {
        r0: 5, speed: 6.5, opacity: 0.9, fade: 0.014,
        lw: 2, glow: 35, shadow: '#00ffc8',
        rgb: '0, 255, 200',
      })
      // 第4波（広域）
      addRing(e.clientX, e.clientY, {
        r0: 5, speed: 4, opacity: 0.7, fade: 0.01,
        lw: 1.5, glow: 20, shadow: '#00e5ff',
        rgb: '0, 200, 255',
      })
      // スパーク爆発
      for (let i = 0; i < 14; i++) addSpark(e.clientX, e.clientY)
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
