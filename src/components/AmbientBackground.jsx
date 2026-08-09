// ページ全体の余白にかかる水中アンビエント演出（気泡 + ぼかし光）
// テキストの可読性を損なわないよう、低不透明度・コンテンツの背面に固定配置する。
// Math.random をレンダー中に呼ばないよう、配置はモジュール読み込み時に一度だけ生成する。

const BUBBLES = Array.from({ length: 14 }, (_, i) => {
  // 擬似乱数（決定的）: インデックスから散らした値を作る
  const rand = (seed) => {
    const x = Math.sin(i * 127.1 + seed * 311.7) * 43758.5453
    return x - Math.floor(x)
  }
  return {
    left: `${Math.round(rand(1) * 96 + 2)}%`,
    size: 2 + Math.round(rand(2) * 4),          // 2〜6px
    duration: 20 + Math.round(rand(3) * 18),    // 20〜38s
    delay: -Math.round(rand(4) * 30),           // 途中から開始
    drift: Math.round(rand(5) * 40 - 20),       // 横揺れ -20〜20px
    opacity: 0.1 + rand(6) * 0.15,              // 0.10〜0.25
  }
})

export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      {/* ぼかし光（ゆっくり漂う） */}
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />

      {/* 上昇する気泡 */}
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="ambient-bubble"
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size}px`,
            opacity: b.opacity,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
            '--drift': `${b.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
