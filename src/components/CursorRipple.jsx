import { useEffect, useCallback, useRef } from 'react'

export default function CursorRipple() {
  const containerRef = useRef(null)

  const spawn = useCallback((x, y, isClick) => {
    const container = containerRef.current
    if (!container) return

    if (isClick) {
      // クリック: 3重同心円バースト
      for (let i = 0; i < 3; i++) {
        const el = document.createElement('div')
        el.className = `cr cr--click cr--click-${i + 1}`
        el.style.left = x + 'px'
        el.style.top = y + 'px'
        container.appendChild(el)
        setTimeout(() => el.remove(), 1500)
      }
    } else {
      // 移動: 即時フラッシュドット + 拡張リング
      const dot = document.createElement('div')
      dot.className = 'cr-dot'
      dot.style.left = x + 'px'
      dot.style.top = y + 'px'
      container.appendChild(dot)
      setTimeout(() => dot.remove(), 400)

      const ring = document.createElement('div')
      ring.className = 'cr'
      ring.style.left = x + 'px'
      ring.style.top = y + 'px'
      container.appendChild(ring)
      setTimeout(() => ring.remove(), 900)
    }
  }, [])

  useEffect(() => {
    let last = 0

    const onMove = (e) => {
      const now = Date.now()
      if (now - last < 60) return
      last = now
      spawn(e.clientX, e.clientY, false)
    }

    const onClick = (e) => spawn(e.clientX, e.clientY, true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
    }
  }, [spawn])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    />
  )
}
