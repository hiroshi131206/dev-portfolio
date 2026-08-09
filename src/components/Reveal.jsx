import { useEffect, useRef, useState } from 'react'

// スクロールでセクションがふわっと現れる演出。
// IntersectionObserver が使えない環境では即表示にフォールバックする。
export default function Reveal({ children }) {
  const ref = useRef(null)
  // IntersectionObserver 非対応環境では最初から表示する
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === 'undefined'
  )

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out will-change-transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  )
}
