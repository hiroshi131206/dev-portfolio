import { skills } from '../data/profile'

const categories = [
  { key: 'dev',   label: '開発・デザイン' },
  { key: 'cg',    label: 'CG・3D制作' },
  { key: 'audio', label: '音響・映像' },
  { key: 'infra', label: 'インフラ（学習中）' },
]

function SkillBar({ name, level, note }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-36 text-slate-300 text-sm flex-shrink-0 flex items-center gap-2">
        {name}
        {note && (
          <span className="text-xs text-slate-600 bg-slate-800 px-1.5 py-0.5 rounded">{note}</span>
        )}
      </div>
      <div className="flex gap-1.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <div
            key={n}
            className={`w-8 h-1.5 rounded-full transition-colors ${
              n <= level ? 'bg-violet-500' : 'bg-slate-800'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-2">Skills</p>
      <h2 className="section-title">スキル</h2>
      <p className="section-sub">★5が得意、★1が学習中</p>

      <div className="grid sm:grid-cols-2 gap-8">
        {categories.map(({ key, label }) => (
          <div
            key={key}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6"
          >
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
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
