import { voiceWorks, profile } from '../data/profile'

const equipment = [
  { label: 'マイク', items: ['NEUMANN U87 Ai', 'TLM 103', 'SHURE SM7dB'] },
  { label: 'DAW', items: ['Pro Tools', 'Cubase 13 Pro', 'Adobe Audition'] },
]

const categoryColors = {
  'アニメ': 'text-pink-400 bg-pink-900/30 border-pink-800',
  'ゲーム': 'text-cyan-400 bg-cyan-900/30 border-cyan-800',
  'CM':     'text-amber-400 bg-amber-900/30 border-amber-800',
  'VP':     'text-emerald-400 bg-emerald-900/30 border-emerald-800',
}

export default function Voice() {
  return (
    <section id="voice" className="section">
      <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-2">Voice</p>
      <h2 className="section-title">声優・ナレーター活動</h2>
      <p className="section-sub">HAL入学以前からプロとして活動中</p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* 実績 */}
        <div>
          <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">主な実績</h3>
          <div className="space-y-3">
            {voiceWorks.map((w) => (
              <div
                key={`${w.title}-${w.role}`}
                className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3"
              >
                <span className={`text-xs px-2 py-0.5 rounded border ${categoryColors[w.category]}`}>
                  {w.category}
                </span>
                <span className="text-slate-200 text-sm flex-1">{w.title}</span>
                <span className="text-slate-500 text-xs">{w.role}</span>
              </div>
            ))}
          </div>
          <a
            href={profile.voicePortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 text-violet-400 hover:text-violet-300 text-sm transition-colors"
          >
            声優ポートフォリオサイトを見る →
          </a>
        </div>

        {/* 機材・スタジオ */}
        <div className="space-y-6">
          {equipment.map((e) => (
            <div key={e.label} className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
              <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-3">{e.label}</h4>
              <ul className="space-y-1.5">
                {e.items.map((item) => (
                  <li key={item} className="text-slate-200 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-5">
            <h4 className="text-slate-400 text-xs uppercase tracking-wider mb-3">自宅スタジオ</h4>
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
