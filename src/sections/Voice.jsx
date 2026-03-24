import { voiceWorks, profile } from '../data/profile'

const equipment = [
  { label: 'マイク', items: ['NEUMANN U87 Ai', 'TLM 103', 'SHURE SM7dB'] },
  { label: 'DAW', items: ['Pro Tools', 'Cubase 13 Pro', 'Adobe Audition'] },
]

const categoryColors = {
  'アニメ': 'text-pink-300 bg-pink-900/40 border-pink-700',
  'ゲーム': 'text-cyan-300 bg-cyan-900/40 border-cyan-700',
  'CM':     'text-amber-300 bg-amber-900/40 border-amber-700',
  'VP':     'text-emerald-300 bg-emerald-900/40 border-emerald-700',
}

export default function Voice() {
  return (
    <section id="voice" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Voice</p>
      <h2 className="section-title">声優・ナレーター活動</h2>
      <p className="section-sub">HAL入学以前からプロとして活動中</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 実績 */}
        <div>
          <h3 className="text-white font-semibold mb-4 border-b border-slate-700 pb-3">主な実績</h3>
          <div className="space-y-2.5">
            {voiceWorks.map((w) => (
              <div
                key={`${w.title}-${w.role}`}
                className="flex items-center gap-3 bg-[#0e0e1c] border border-slate-700 rounded-lg px-4 py-3"
              >
                <span className={`text-xs px-2 py-0.5 rounded border flex-shrink-0 ${categoryColors[w.category]}`}>
                  {w.category}
                </span>
                <span className="text-slate-100 text-sm flex-1 font-medium">{w.title}</span>
                <span className="text-slate-400 text-xs flex-shrink-0">{w.role}</span>
              </div>
            ))}
          </div>
          <a
            href={profile.voicePortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-cyan-400 hover:text-cyan-300 text-sm transition-colors font-medium"
          >
            声優ポートフォリオサイトを見る →
          </a>
        </div>

        {/* 機材・スタジオ */}
        <div className="space-y-4">
          {equipment.map((e) => (
            <div key={e.label} className="card">
              <h4 className="text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">{e.label}</h4>
              <ul className="space-y-2">
                {e.items.map((item) => (
                  <li key={item} className="text-slate-200 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="card">
            <h4 className="text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">自宅スタジオ</h4>
            <p className="text-slate-300 text-sm leading-relaxed">
              電動昇降デスクを中心としたPCデスク環境をDIYで構築。
              吸音パネルの配置・機材レイアウトを繰り返し見直し、録音品質と作業効率を両立。
              CADで設計したマイクアクセサリーを3Dプリンターで自作。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
