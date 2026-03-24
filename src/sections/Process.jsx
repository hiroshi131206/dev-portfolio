const steps = [
  {
    step: '01',
    title: '現場ヒアリング',
    desc: '店長・エリアマネージャー・現場スタッフへのヒアリングで課題を言語化。複数業種・複数店舗を横断して要件を整理。',
  },
  {
    step: '02',
    title: 'AI Agent で要件ドキュメント化',
    desc: 'Claude Code を活用してヒアリング内容を要件定義書・設計ドキュメントへ自動整理。認識齟齬を防ぐ。',
  },
  {
    step: '03',
    title: 'AI 支援による高速実装',
    desc: 'コード生成・レビュー・リファクタリングをAIと並走しながら進行。従来比で大幅な工期短縮を実現。',
  },
  {
    step: '04',
    title: 'Figma + AI でデザインサイクル',
    desc: 'Figma・Google Stitch にAIを連携。デザイン情報を自動収集・学習させ、AIエージェント同士の改善サイクルで制作指針を生成。',
  },
  {
    step: '05',
    title: '現場フィードバック → 改善',
    desc: '実際に使う店舗スタッフからのフィードバックを収集し、継続的に改善。試験運用から本運用へ向けて反復中。',
  },
]

export default function Process() {
  return (
    <section id="process" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Process</p>
      <h2 className="section-title">開発プロセス</h2>
      <p className="section-sub">AI Agent 導入による開発効率化</p>

      <div className="max-w-2xl mx-auto space-y-4">
        {steps.map((s) => (
          <div key={s.step} className="card flex gap-5 items-start">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-cyan-900/40 border border-cyan-700 flex items-center justify-center">
              <span className="text-cyan-300 font-mono text-sm font-bold">{s.step}</span>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1.5">{s.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-2xl mx-auto bg-cyan-900/15 border border-cyan-700/50 rounded-2xl p-8 text-center">
        <p className="text-cyan-200 text-lg font-semibold mb-2">
          「AIを使いこなす側」のエンジニアとして
        </p>
        <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
          ツールとしてAIを活用するだけでなく、AIエージェント同士を連携させ、
          開発・デザイン・品質改善のサイクルを自律的に回す仕組みを実践しています。
        </p>
      </div>
    </section>
  )
}
