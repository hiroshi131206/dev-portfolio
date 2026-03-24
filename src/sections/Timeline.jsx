import { timeline } from '../data/profile'

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Timeline</p>
      <h2 className="section-title">経歴</h2>
      <p className="section-sub">学習・活動の歩み</p>

      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-20 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/70 via-cyan-600/30 to-transparent" />

        <div className="space-y-7">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6 items-start group">
              <div className="w-16 text-right flex-shrink-0 pt-0.5">
                <span className={`text-sm font-mono font-medium ${item.future ? 'text-slate-600' : 'text-cyan-400'}`}>
                  {item.year}
                </span>
              </div>

              <div className={`w-3.5 h-3.5 rounded-full mt-0.5 flex-shrink-0 border-2 border-[#040e1a] transition-all ${
                item.future
                  ? 'bg-slate-700 border-slate-600'
                  : 'bg-cyan-500 group-hover:bg-cyan-300 group-hover:shadow-[0_0_8px_rgba(6,182,212,0.8)]'
              }`} />

              <div className={`pb-1 leading-relaxed ${
                item.future ? 'text-slate-600 italic text-sm' : 'text-slate-200 text-sm'
              }`}>
                {item.future && <span className="text-slate-600 mr-1">（予定）</span>}
                {item.event}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
