import { skills } from '../data/profile'

const categories = [
  { key: 'dev',   label: '開発・デザイン' },
  { key: 'cg',    label: 'CG・3D制作' },
  { key: 'audio', label: '音響・映像' },
  { key: 'infra', label: 'インフラ（学習中）' },
]

const levelLabel = ['', '入門', '基礎', '実務', '得意', '主力']

function SkillBar({ name, level, note }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-40 flex-shrink-0">
        <span className="text-slate-200 text-sm">{name}</span>
        {note && (
          <span className="ml-2 text-xs text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded">{note}</span>
        )}
      </div>
      <div className="flex gap-2 items-center flex-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`h-2.5 flex-1 rounded-full transition-colors ${
              n <= level ? 'bg-violet-500' : 'bg-slate-700/60'
            }`}
          />
        ))}
        <span className="text-xs text-slate-500 w-8 text-right flex-shrink-0">{levelLabel[level]}</span>
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-2">Skills</p>
      <h2 className="section-title">スキル</h2>
      <p className="section-sub">主力〜入門まで習熟度を可視化</p>

      <div className="grid sm:grid-cols-2 gap-6">
        {categories.map(({ key, label }) => (
          <div key={key} className="card">
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider border-b border-slate-700 pb-3">
              {label}
            </h3>
            <div className="space-y-4">
              {skills[key].map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
