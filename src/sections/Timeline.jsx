import { timeline } from '../data/profile'

export default function Timeline() {
  return (
    <section id="timeline" className="section">
      <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-2">Timeline</p>
      <h2 className="section-title">経歴</h2>
      <p className="section-sub">学習・活動の歩み</p>

      <div className="relative max-w-2xl mx-auto">
        {/* 縦線 */}
        <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/60 via-violet-600/20 to-transparent" />

        <div className="space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="flex gap-6 items-start group">
              {/* 年 */}
              <div className="w-12 text-right flex-shrink-0 pt-0.5">
                <span className="text-slate-500 text-xs font-mono">{item.year}</span>
              </div>

              {/* ドット */}
              <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 border-2 border-[#0a0a0f] transition-colors ${
                item.future ? 'bg-slate-700 border-slate-600' : 'bg-violet-500 group-hover:bg-violet-400'
              }`} />

              {/* イベント */}
              <div className={`pb-1 text-sm leading-relaxed ${
                item.future ? 'text-slate-600 italic' : 'text-slate-300'
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
