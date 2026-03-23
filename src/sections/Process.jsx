const steps = [
  {
    step: '01',
    title: '現場ヒアリング',
    desc: '店長・エリアマネージャー・現場スタッフへのヒアリングで課題を言語化。複数業種・複数店舗を横断して要件を整理。',
    color: 'violet',
  },
  {
    step: '02',
    title: 'AI Agent で要件ドキュメント化',
    desc: 'Claude Code を活用してヒアリング内容を要件定義書・設計ドキュメントへ自動整理。認識齟齬を防ぐ。',
    color: 'violet',
  },
  {
    step: '03',
    title: 'AI 支援による高速実装',
    desc: 'コード生成・レビュー・リファクタリングをAIと並走しながら進行。従来比で大幅な工期短縮を実現。',
    color: 'violet',
  },
  {
    step: '04',
    title: 'Figma + AI でデザインサイクル',
    desc: 'Figma・Google Stitch にAIを連携。デザイン情報を自動収集・学習させ、AIエージェント同士の改善サイクルで制作指針を生成。',
    color: 'violet',
  },
  {
    step: '05',
    title: '現場フィードバック → 改善',
    desc: '実際に使う店舗スタッフからのフィードバックを収集し、継続的に改善。試験運用から本運用へ向けて反復中。',
    color: 'violet',
  },
]

export default function Process() {
  return (
    <section id="process" className="section">
      <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-2">Process</p>
      <h2 className="section-title">開発プロセス</h2>
      <p className="section-sub">AI Agent 導入による開発効率化</p>

      <div className="relative">
        {/* 縦線 */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-violet-600/50 via-violet-600/20 to-transparent md:-translate-x-1/2" />

        <div className="space-y-10">
          {steps.map((s, i) => (
            <div
              key={s.step}
              className={`relative flex gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}
            >
              {/* ドット */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#0a0a0f] md:-translate-x-1/2 mt-1.5" />

              {/* カード */}
              <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-violet-800 transition-colors">
                  <span className="text-violet-500 font-mono text-xs">{s.step}</span>
                  <h3 className="text-white font-semibold mt-1 mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ハイライト */}
      <div className="mt-16 bg-violet-900/20 border border-violet-800/50 rounded-2xl p-8 text-center">
        <p className="text-violet-300 text-lg font-medium mb-2">
          「AIを使いこなす側」のエンジニアとして
        </p>
        <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
          ツールとしてAIを活用するだけでなく、AIエージェント同士を連携させ、
          開発・デザイン・品質改善のサイクルを自律的に回す仕組みを実践しています。
        </p>
      </div>
    </section>
  )
}
