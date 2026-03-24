import { useState } from 'react'
import { works } from '../data/profile'

const badgeStyles = {
  green:  'bg-emerald-900/50 text-emerald-300 border border-emerald-700',
  blue:   'bg-blue-900/50 text-blue-300 border border-blue-700',
  purple: 'bg-cyan-900/50 text-cyan-300 border border-cyan-700',
}

// ============================================================
// 1件分のiframeビューア
// ============================================================
function DriveEmbed({ item, title }) {
  return (
    <div className={`w-full rounded-b-xl overflow-hidden bg-[#050f1c] border-x border-b border-[#1a4060] ${
      item.icon === 'video' ? 'aspect-video' : 'h-[420px]'
    }`}>
      <iframe
        src={item.url}
        title={item.label ?? title}
        className="w-full h-full"
        allow="autoplay"
        allowFullScreen
      />
    </div>
  )
}

// ============================================================
// メディアパネル（タブ切り替え対応）
// ============================================================
function MediaPanel({ work }) {
  const [activeTab, setActiveTab] = useState(0)
  const { media, status, github } = work

  // 配列メディア（タブ切り替え）
  if (Array.isArray(media) && media.length > 0) {
    const current = media[activeTab]
    return (
      <div>
        {/* タブ */}
        <div className="flex border border-[#1a4060] rounded-t-xl overflow-hidden">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-colors ${
                activeTab === i
                  ? 'bg-cyan-900/40 text-cyan-300 border-b-2 border-cyan-500'
                  : 'bg-[#050f1c] text-slate-500 hover:text-slate-300'
              }`}
            >
              {m.icon === 'video' ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
              {m.label}
            </button>
          ))}
        </div>

        {/* ビューア */}
        <DriveEmbed item={current} title={work.title} />

        {/* 外部リンク */}
        <a
          href={current.url.replace('/preview', '/view')}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-cyan-500 hover:text-cyan-300 text-xs mt-2 transition-colors"
        >
          別タブで開く →
        </a>
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
            className="py-20 border-b border-[#1a4060]/50 first:border-t first:border-[#1a4060]/50"
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
