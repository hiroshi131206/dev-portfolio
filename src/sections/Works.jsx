import { useState } from 'react'
import { works } from '../data/profile'

const badgeStyles = {
  green:  'bg-emerald-900/50 text-emerald-300 border border-emerald-700',
  blue:   'bg-blue-900/50 text-blue-300 border border-blue-700',
  purple: 'bg-cyan-900/50 text-cyan-300 border border-cyan-700',
}

function WorkModal({ work, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#071828] border border-[#1a4060] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className={`text-xs px-2.5 py-1 rounded-full ${badgeStyles[work.badgeColor]} mr-2`}>
              {work.badge}
            </span>
            <h3 className="text-2xl font-bold text-white mt-3">{work.title}</h3>
            <p className="text-cyan-400 mt-1">{work.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl leading-none ml-4 flex-shrink-0">×</button>
        </div>

        <div className="space-y-6 text-slate-200 text-sm leading-relaxed">
          <div>
            <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">概要</h4>
            <p>{work.description}</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">制作動機</h4>
            <p>{work.motivation}</p>
          </div>
          <div>
            <h4 className="text-cyan-400 font-mono text-xs uppercase tracking-wider mb-2">主な機能・取り組み</h4>
            <ul className="space-y-2">
              {work.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-cyan-500 mt-0.5 flex-shrink-0">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {work.status && (
            <div className="bg-emerald-900/20 border border-emerald-700 rounded-lg p-4">
              <span className="text-emerald-400 text-xs font-mono uppercase tracking-wider">現在の状況</span>
              <p className="text-emerald-300 mt-1">{work.status}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {work.tags.map((t) => (
              <span key={t} className="text-xs bg-slate-800 text-slate-300 border border-slate-600 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
            >
              GitHub でコードを見る →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Works() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="works" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Works</p>
      <h2 className="section-title">制作物</h2>
      <p className="section-sub">カードをクリックすると詳細を表示</p>

      <div className="grid lg:grid-cols-2 gap-6">
        {works.map((work) => (
          <button
            key={work.id}
            className="bg-[#071828] border border-[#1a4060] rounded-xl p-7 text-left hover:border-cyan-600 hover:bg-[#081f35] transition-all group cursor-pointer"
            onClick={() => setSelected(work)}
          >
            {/* バッジ＋矢印 */}
            <div className="flex items-start justify-between mb-4">
              <span className={`text-xs px-2.5 py-1 rounded-full ${badgeStyles[work.badgeColor]}`}>
                {work.badge}
              </span>
              <span className="text-slate-500 group-hover:text-cyan-400 transition-colors text-xl leading-none">→</span>
            </div>

            {/* タイトル */}
            <h3 className="text-white font-bold text-xl mb-1">{work.title}</h3>
            <p className="text-cyan-400 text-sm font-medium mb-4">{work.subtitle}</p>

            {/* 概要 */}
            <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">{work.description}</p>

            {/* 機能プレビュー */}
            <ul className="space-y-2 mb-5">
              {work.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-slate-400 text-xs">
                  <span className="text-cyan-600 flex-shrink-0 mt-0.5">→</span>
                  <span className="line-clamp-1">{f}</span>
                </li>
              ))}
            </ul>

            {/* タグ（全て表示） */}
            <div className="flex flex-wrap gap-1.5">
              {work.tags.map((t) => (
                <span key={t} className="text-xs bg-slate-800/80 text-slate-300 border border-slate-600 px-2.5 py-0.5 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {selected && <WorkModal work={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
