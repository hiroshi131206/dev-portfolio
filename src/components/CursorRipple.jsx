import { useEffect, useCallback, useRef } from 'react'

export default function CursorRipple() {
  const containerRef = useRef(null)

  const spawn = useCallback((x, y, isClick) => {
    const container = containerRef.current
    if (!container) return

    if (isClick) {
      // クリック時: 3重の同心円を時差で展開
      for (let i = 0; i < 3; i++) {
        const el = document.createElement('div')
        el.className = `cr cr--click cr--click-${i + 1}`
        el.style.left = x + 'px'
        el.style.top = y + 'px'
        container.appendChild(el)
        setTimeout(() => el.remove(), 1400)
      }
    } else {
      // 移動時: 小さなリングを1つ展開
      const el = document.createElement('div')
      el.className = 'cr'
      el.style.left = x + 'px'
      el.style.top = y + 'px'
      container.appendChild(el)
      setTimeout(() => el.remove(), 800)
    }
  }, [])

  useEffect(() => {
    let last = 0

    const onMove = (e) => {
      const now = Date.now()
      if (now - last < 65) return
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
