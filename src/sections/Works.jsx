import { works } from '../data/profile'

const badgeStyles = {
  green:  'bg-emerald-900/50 text-emerald-300 border border-emerald-700',
  blue:   'bg-blue-900/50 text-blue-300 border border-blue-700',
  purple: 'bg-cyan-900/50 text-cyan-300 border border-cyan-700',
}

// ============================================================
// メディアプレビュー（右カラム）
// ============================================================
function MediaPanel({ work }) {
  const { media, status, github } = work

  // YouTube埋め込み
  if (media?.type === 'youtube') {
    return (
      <div className="flex flex-col gap-3">
        <div className="w-full aspect-video rounded-xl overflow-hidden bg-[#050f1c] border border-[#1a4060]">
          <iframe
            src={media.url}
            title={media.caption ?? work.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        {media.caption && (
          <p className="text-slate-500 text-xs text-center">{media.caption}</p>
        )}
      </div>
    )
  }

  // PDF埋め込み
  if (media?.type === 'pdf') {
    return (
      <div className="flex flex-col gap-3">
        <div className="w-full h-[420px] rounded-xl overflow-hidden bg-[#050f1c] border border-[#1a4060]">
          <iframe
            src={media.url}
            title={media.caption ?? work.title}
            className="w-full h-full"
          />
        </div>
        {media.caption && (
          <p className="text-slate-500 text-xs text-center">{media.caption}</p>
        )}
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 text-xs text-center transition-colors"
        >
          別タブで開く →
        </a>
      </div>
    )
  }

  // 画像
  if (media?.type === 'image') {
    return (
      <div className="flex flex-col gap-3">
        <div className="w-full rounded-xl overflow-hidden bg-[#050f1c] border border-[#1a4060]">
          <img
            src={media.url}
            alt={media.caption ?? work.title}
            className="w-full h-auto object-cover"
          />
        </div>
        {media.caption && (
          <p className="text-slate-500 text-xs text-center">{media.caption}</p>
        )}
      </div>
    )
  }

  // メディアなし → ステータス情報 + GitHub
  return (
    <div className="rounded-xl border border-dashed border-[#1a4060] bg-[#050f1c] p-6 flex flex-col gap-4 min-h-[220px]">
      {status && (
        <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-4">
          <p className="text-emerald-400 text-xs font-mono uppercase tracking-wider mb-1">現在の状況</p>
          <p className="text-emerald-300 text-sm leading-relaxed">{status}</p>
        </div>
      )}

      <div className="flex-1 flex flex-col justify-end gap-3">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium border border-cyan-800/60 hover:border-cyan-600 rounded-lg px-4 py-2.5 transition-colors w-fit"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub でコードを見る
          </a>
        )}
        <p className="text-slate-700 text-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-700 inline-block" />
          動画・資料は順次追加予定
        </p>
      </div>
    </div>
  )
}

// ============================================================
// Works セクション本体
// ============================================================
export default function Works() {
  return (
    <section id="works" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Works</p>
      <h2 className="section-title">制作物</h2>
      <p className="section-sub">実際に動いているプロダクト・開発中のツール</p>

      <div className="space-y-0">
        {works.map((work, i) => (
          <article
            key={work.id}
            className="py-14 border-b border-[#1a4060]/50 first:border-t first:border-[#1a4060]/50"
          >
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-start">

              {/* ===== 左: 概要・技術 ===== */}
              <div>
                {/* 番号 + バッジ */}
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-5xl font-bold text-cyan-900/40 font-mono leading-none select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${badgeStyles[work.badgeColor]}`}>
                    {work.badge}
                  </span>
                </div>

                {/* タイトル */}
                <h3 className="text-white font-bold text-2xl md:text-3xl mb-1 leading-tight">
                  {work.title}
                </h3>
                <p className="text-cyan-400 text-base font-medium mb-5">{work.subtitle}</p>

                {/* 概要 */}
                <p className="text-slate-300 leading-relaxed mb-6 text-sm md:text-base">
                  {work.description}
                </p>

                {/* 機能・技術的取り組み */}
                <div className="mb-6">
                  <p className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-3">
                    主な機能・取り組み
                  </p>
                  <ul className="space-y-2.5">
                    {work.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                        <span className="text-cyan-600 flex-shrink-0 mt-0.5 font-bold">→</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 技術タグ */}
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-[#071828] text-slate-300 border border-[#1a4060] px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* ===== 右: プレビュー ===== */}
              <div className="lg:sticky lg:top-24">
                <MediaPanel work={work} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
