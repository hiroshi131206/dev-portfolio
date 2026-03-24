import { profile } from '../data/profile'

const works = [
  { category: 'CM',     title: '東芝 ZABOON',     role: 'ナレーション' },
  { category: 'CM',     title: '日本特殊陶業',     role: 'ナレーション' },
  { category: 'VP',     title: 'トヨタ自動車',     role: 'ナレーション' },
  { category: 'VP',     title: '名古屋大学',        role: 'ナレーション' },
  { category: 'アニメ', title: '薬屋のひとりごと', role: '宦官役' },
  { category: 'ゲーム', title: '原神',              role: 'NPC役' },
]

const categoryColors = {
  'CM':     'text-amber-300 bg-amber-900/40 border-amber-700',
  'VP':     'text-emerald-300 bg-emerald-900/40 border-emerald-700',
  'アニメ': 'text-pink-300 bg-pink-900/40 border-pink-700',
  'ゲーム': 'text-cyan-300 bg-cyan-900/40 border-cyan-700',
}

export default function Voice() {
  return (
    <section id="voice" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Other Activities</p>
      <h2 className="section-title">その他の活動</h2>
      <p className="section-sub">タレント・ナレーター活動</p>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* 左: 経歴 + 実績 */}
        <div className="space-y-6">
          {/* 経歴 */}
          <div className="card p-6 space-y-3">
            <p className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1">経歴</p>
            <p className="text-slate-300 text-sm leading-relaxed">
              高校在学中に配信サービス上でスカウトを受け、<span className="text-white font-semibold">NTC事務所</span>の研修生として所属。高校卒業と同時にタレントとしてデビュー。
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              東海圏を中心に、ラジオCMや企業VPなどナレーションを主軸に活動。医学部浪人期間中も活動を継続し、現在もHAL在学と並行してプロとして案件に対応している。
            </p>
          </div>

          {/* 実績 */}
          <div>
            <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-3">主な実績</p>
            <div className="space-y-2">
              {works.map((w) => (
                <div
                  key={`${w.title}-${w.role}`}
                  className="flex items-center gap-3 bg-[#071828] border border-[#1a4060] rounded-lg px-4 py-2.5"
                >
                  <span className={`text-xs px-2 py-0.5 rounded border flex-shrink-0 ${categoryColors[w.category]}`}>
                    {w.category}
                  </span>
                  <span className="text-slate-200 text-sm flex-1 font-medium">{w.title}</span>
                  <span className="text-slate-500 text-xs flex-shrink-0">{w.role}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右: ポートフォリオサイトプレビュー */}
        <div className="space-y-3">
          <p className="text-slate-500 text-xs font-mono uppercase tracking-wider">声優ポートフォリオサイト</p>
          <div className="rounded-xl overflow-hidden border border-[#1a4060] bg-[#050f1c]">
            {/* アドレスバー風ヘッダー */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-[#071828] border-b border-[#1a4060]">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-slate-500 text-xs font-mono flex-1 text-center truncate">
                hiroshi131206.github.io
              </span>
            </div>
            {/* iframe */}
            <div className="w-full h-[340px]">
              <iframe
                src={profile.voicePortfolio}
                title="声優ポートフォリオサイト"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
          <a
            href={profile.voicePortfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
          >
            別タブで開く →
          </a>
        </div>

      </div>
    </section>
  )
}
