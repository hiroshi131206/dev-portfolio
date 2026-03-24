const phases = [
  {
    num: '01',
    title: '要件は「聞き取る」のではなく「開発する」',
    body: `依頼者は要件を知らない。現場担当者も全体を把握していない。「正しく聞き取る」という前提が、そもそも現実に即していない。
だから私はヒアリングを出発点にしない。複数店舗のシフト運用を自ら体験し、業務の流れを観察し、「今やっていることの電子化」ではなく「本来あるべき姿」を自分で構築する。これが萩本順三氏の言う「要求開発」の本質であり、私の開発の出発点だ。`,
    note: '現状の非効率をシステムで固定化しない。追加仕様が無限に発生する罠を避けるために。',
    color: 'cyan',
  },
  {
    num: '02',
    title: 'AI で「スイッチを入れる」プロトタイプを最速で作る',
    body: `遷移図や画面モックでは依頼者の意見が出ない。業務モードと通常モードで思考が切り替わっているため、実務に近いデータを使った動作するプロトタイプを触ってもらって初めて本当の要件定義が始まる。
AI エージェントはこの「動くものを作る」速度を大幅に上げる。コード生成・テスト・ドキュメント整理といった定型作業をエージェントに委譲し、人間は「何を作るか」の判断に集中できる。`,
    note: 'AI が進化するほど、要件を「開発する」判断力の価値が高まる。速く作れる分、間違ったものを速く完成させるリスクも同時に増すから。',
    color: 'emerald',
  },
  {
    num: '03',
    title: '設定・エージェント・フックで品質を構造化する',
    body: `プロトタイプを素早く作ることと、品質を保つことは矛盾しない。claude-universal-config による AI 駆動の品質管理基盤がその橋渡しをしている。`,
    note: null,
    color: 'cyan',
    infra: true,
  },
  {
    num: '04',
    title: '現場フィードバック → 自律改善ループ',
    body: `実際に店舗スタッフが触ったプロトタイプから「スイッチが入り」、本当の要件が浮かび上がる。そのフィードバックをもとに autoresearch ループが「修正 → 検証 → 採用 / 棄却」を自律的に繰り返し、品質指標を継続改善する。
人間がすべきことは、改善の「目標」と「検証方法」を定義することだけ。あとはエージェントが実行する。`,
    note: '実績: 品質チェック通過率 66.7% → 100%（5ラウンド自動実行）',
    color: 'emerald',
  },
]

const infraItems = [
  {
    label: '設定 (Settings)',
    icon: 'CF',
    iconColor: 'cyan',
    what: 'AI の「行動規範」',
    desc: 'コーディングスタイル・セキュリティルール・git 規約など、Claude Code がどう振る舞うかを定義するルールファイル群。言語・フレームワークごとに選択的に導入できる。',
    example: 'coding-style.md / security.md / testing.md / git.md',
  },
  {
    label: 'エージェント (Agents)',
    icon: 'AG',
    iconColor: 'emerald',
    what: '専門特化した AI の役割',
    desc: 'code-reviewer・tdd-guide・security-reviewer など、特定のタスクに特化した AI の「役」。コンテキストを持った専門家として、コードレビューや TDD サイクル、セキュリティ監査を担当する。',
    example: 'code-reviewer / tdd-guide / security-reviewer',
  },
  {
    label: 'フック (Hooks)',
    icon: 'HK',
    iconColor: 'amber',
    what: 'ツール実行前後の自動チェック',
    desc: 'AI がツールを呼び出す前後に自動実行される安全装置。危険なコマンド（rm -rf 等）を阻止し、XSS・インジェクションなどのセキュリティパターンを警告する。コードを書かずに Markdown で追加できる。',
    example: 'block: rm -rf / warn: dangerouslySetInnerHTML / warn: eval()',
  },
]

const colorMap = {
  cyan:    { num: 'text-cyan-700',   dot: 'bg-cyan-500',   border: 'border-cyan-700/40',  note: 'border-cyan-900/50 text-cyan-300/70' },
  emerald: { num: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-700/40', note: 'border-emerald-900/50 text-emerald-300/70' },
  amber:   { num: 'text-amber-700',  dot: 'bg-amber-500',  border: 'border-amber-700/40',  note: 'border-amber-900/50 text-amber-300/70' },
}

const iconColorMap = {
  cyan:    'bg-cyan-900/40 border-cyan-700 text-cyan-300',
  emerald: 'bg-emerald-900/40 border-emerald-700 text-emerald-300',
  amber:   'bg-amber-900/30 border-amber-700 text-amber-300',
}

export default function Process() {
  return (
    <section id="process" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Process</p>
      <h2 className="section-title">開発プロセス</h2>
      <p className="section-sub">要件を「開発」し、AI と品質を構造化する</p>

      <div className="max-w-2xl mx-auto space-y-0">
        {phases.map((phase, i) => {
          const c = colorMap[phase.color]
          return (
            <div key={phase.num} className="relative pl-10 pb-12 last:pb-0">
              {/* 縦線 */}
              {i < phases.length - 1 && (
                <div className="absolute left-[14px] top-8 bottom-0 w-px bg-gradient-to-b from-[#1a4060] to-transparent" />
              )}
              {/* ドット */}
              <div className={`absolute left-0 top-1.5 w-[29px] h-[29px] rounded-full border border-[#1a4060] bg-[#040e1a] flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${c.dot}`} />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`font-mono text-xs font-bold ${c.num}`}>{phase.num}</span>
                  <h3 className="text-white font-semibold text-base leading-snug">{phase.title}</h3>
                </div>

                {phase.infra ? (
                  <>
                    <p className="text-slate-400 text-sm leading-relaxed mb-5">{phase.body}</p>
                    {/* 設定・エージェント・フック 説明 */}
                    <div className="space-y-3">
                      {infraItems.map(item => (
                        <div key={item.label} className={`card border ${colorMap[item.iconColor]?.border ?? 'border-[#1a4060]'} p-5`}>
                          <div className="flex items-start gap-4">
                            <div className={`flex-shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center ${iconColorMap[item.iconColor]}`}>
                              <span className="font-mono text-[10px] font-bold">{item.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                <span className="text-white font-semibold text-sm">{item.label}</span>
                                <span className="text-slate-500 text-xs">=</span>
                                <span className={`text-xs font-medium ${
                                  item.iconColor === 'cyan' ? 'text-cyan-400' :
                                  item.iconColor === 'emerald' ? 'text-emerald-400' : 'text-amber-400'
                                }`}>{item.what}</span>
                              </div>
                              <p className="text-slate-300 text-sm leading-relaxed mb-2">{item.desc}</p>
                              <code className="text-slate-500 text-xs">{item.example}</code>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{phase.body}</p>
                )}

                {phase.note && (
                  <div className={`mt-4 border-l-2 pl-4 py-1 ${c.note}`}>
                    <p className="text-xs leading-relaxed">{phase.note}</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* まとめ */}
      <div className="max-w-2xl mx-auto mt-16 bg-cyan-900/15 border border-cyan-700/50 rounded-2xl p-8">
        <p className="text-cyan-200 text-base font-semibold mb-3">
          AI が速くなるほど、「何を作るか」の判断が問われる
        </p>
        <p className="text-slate-300 text-sm leading-relaxed">
          AI はコーディング・テスト・ドキュメント整理といった定型作業を効率化する。
          しかしその分、間違った要件に基づいて間違ったものを速く完成させるリスクも同時に増す。
          設定・エージェント・フックによる品質の構造化は、その速度を安全に使いこなすための基盤だ。
          AI が進化しても、要件を「開発する」判断は人間が担い続ける。
        </p>
      </div>
    </section>
  )
}
