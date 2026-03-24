import { useState } from 'react'
import { works } from '../data/profile'

const badgeStyles = {
  green:  'bg-emerald-900/50 text-emerald-400 border border-emerald-800',
  blue:   'bg-blue-900/50 text-blue-400 border border-blue-800',
  purple: 'bg-violet-900/50 text-violet-400 border border-violet-800',
}

function WorkModal({ work, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f18] border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${badgeStyles[work.badgeColor]} mr-2`}>
              {work.badge}
            </span>
            <h3 className="text-2xl font-bold text-white mt-2">{work.title}</h3>
            <p className="text-slate-300">{work.subtitle}</p>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white text-2xl leading-none">×</button>
        </div>

        <div className="space-y-6 text-slate-300 text-sm leading-relaxed">
          <div>
            <h4 className="text-violet-400 font-mono text-xs uppercase tracking-wider mb-2">概要</h4>
            <p>{work.description}</p>
          </div>
          <div>
            <h4 className="text-violet-400 font-mono text-xs uppercase tracking-wider mb-2">制作動機</h4>
            <p>{work.motivation}</p>
          </div>
          <div>
            <h4 className="text-violet-400 font-mono text-xs uppercase tracking-wider mb-2">主な機能・取り組み</h4>
            <ul className="space-y-2">
              {work.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="text-violet-500 mt-0.5">→</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          {work.status && (
            <div className="bg-emerald-900/20 border border-emerald-800 rounded-lg p-4">
              <span className="text-emerald-400 text-xs font-mono uppercase tracking-wider">現在の状況</span>
              <p className="text-emerald-300 mt-1">{work.status}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {work.tags.map((t) => (
              <span key={t} className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm"
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
      <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-2">Works</p>
      <h2 className="section-title">制作物</h2>
      <p className="section-sub">カードをクリックすると詳細を表示</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {works.map((work) => (
          <button
            key={work.id}
            className="bg-[#0e0e1c] border border-slate-700 rounded-xl p-6 text-left hover:border-violet-600 hover:bg-[#11112a] transition-all group cursor-pointer"
            onClick={() => setSelected(work)}
          >
            <div className="flex items-start justify-between mb-4">
              <span className={`text-xs px-2 py-0.5 rounded-full ${badgeStyles[work.badgeColor]}`}>
                {work.badge}
              </span>
              <span className="text-slate-600 group-hover:text-violet-500 transition-colors text-lg">→</span>
            </div>
            <h3 className="text-white font-semibold mb-1">{work.title}</h3>
            <p className="text-slate-400 text-sm mb-4">{work.subtitle}</p>
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-3">{work.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {work.tags.slice(0, 3).map((t) => (
                <span key={t} className="text-xs bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
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
