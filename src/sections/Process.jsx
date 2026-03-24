const agents = [
  {
    name: 'Claude Code',
    vendor: 'Anthropic',
    color: 'cyan',
    role: '実装・設計の主軸',
    tasks: ['要件定義書・設計ドキュメント生成', 'コード実装・レビュー・リファクタリング', 'autoresearch 自律改善ループ', 'セキュリティ監査（OWASP Top 10）'],
    token: '複雑な判断・アーキテクチャ決定に集中。定型作業は他モデルに委譲してトークンを節約。',
  },
  {
    name: 'Gemini',
    vendor: 'Google',
    color: 'blue',
    role: '長文コンテキスト処理',
    tasks: ['長大なログ・仕様書の一括解析', 'コードベース全体の俯瞰的レビュー', '複数ファイルにまたがる依存関係の追跡', '大量データからのパターン抽出'],
    token: '100万トークン超のコンテキストを活用。Claude に渡す前に長文を整理・要約。',
  },
  {
    name: 'NotebookLM',
    vendor: 'Google',
    color: 'violet',
    role: '知識ベース・要件整理',
    tasks: ['業界論文・資料のナレッジベース化', '現場ヒアリング記録の構造化', '類似事例・ベストプラクティスの検索', '要件定義の「材料」を事前に消化'],
    token: '大量の参考資料を事前に処理。Claude のコンテキストに持ち込む情報量を最小化。',
  },
  {
    name: 'Codex / GPT-4o',
    vendor: 'OpenAI',
    color: 'emerald',
    role: 'セカンドオピニオン',
    tasks: ['Claude の実装案に対する代替案の提示', '小規模な補完・スニペット生成', 'アルゴリズム選定の比較検討', '特定ライブラリの詳細な使い方確認'],
    token: '定型的な補完・短いタスクに限定。高コストなモデルの使用を必要な場面に絞る。',
  },
]

const infraItems = [
  {
    label: '設定 (Settings)',
    color: 'cyan',
    what: 'AI の「行動規範」',
    desc: 'コーディングスタイル・セキュリティルール・git 規約など、AI がどう振る舞うかを定義するルールファイル群。CLAUDE.md に書くことで、会話をまたいで一貫した品質を維持できる。',
    example: ['coding-style.md', 'security.md', 'testing.md', 'git.md'],
  },
  {
    label: 'エージェント (Agents)',
    color: 'emerald',
    what: '専門特化した AI の役割',
    desc: 'code-reviewer・tdd-guide・security-reviewer など、特定タスクに特化した AI の「役」。それぞれが独自のコンテキストと指示を持ち、コードレビュー・TDD・セキュリティ監査を専門家として担当する。',
    example: ['code-reviewer', 'tdd-guide', 'security-reviewer'],
  },
  {
    label: 'フック (Hooks)',
    color: 'amber',
    what: 'ツール実行前後の自動チェック',
    desc: 'AI がコマンドやファイル操作を実行する前後に自動で走る安全装置。危険なコマンドの阻止・セキュリティパターンの警告をコードなしで追加できる。設定ミスや事故をシステムレベルで防ぐ。',
    example: ['block: rm -rf', 'warn: eval()', 'warn: dangerouslySetInnerHTML'],
  },
]

const colorCls = {
  cyan:    { num: 'text-cyan-800',    badge: 'bg-cyan-900/30 border-cyan-700 text-cyan-300',       dot: 'bg-cyan-400',    accent: 'text-cyan-400',    tag: 'bg-cyan-900/20 text-cyan-400 border-cyan-800',    note: 'border-cyan-800 text-cyan-300/70' },
  blue:    { num: 'text-blue-800',    badge: 'bg-blue-900/30 border-blue-700 text-blue-300',        dot: 'bg-blue-400',    accent: 'text-blue-400',    tag: 'bg-blue-900/20 text-blue-400 border-blue-800',    note: 'border-blue-800 text-blue-300/70' },
  violet:  { num: 'text-violet-800',  badge: 'bg-violet-900/30 border-violet-700 text-violet-300',  dot: 'bg-violet-400',  accent: 'text-violet-400',  tag: 'bg-violet-900/20 text-violet-400 border-violet-800', note: 'border-violet-800 text-violet-300/70' },
  emerald: { num: 'text-emerald-800', badge: 'bg-emerald-900/30 border-emerald-700 text-emerald-300', dot: 'bg-emerald-400', accent: 'text-emerald-400', tag: 'bg-emerald-900/20 text-emerald-400 border-emerald-800', note: 'border-emerald-800 text-emerald-300/70' },
  amber:   { num: 'text-amber-800',   badge: 'bg-amber-900/20 border-amber-700 text-amber-300',    dot: 'bg-amber-400',   accent: 'text-amber-400',   tag: 'bg-amber-900/20 text-amber-400 border-amber-800',  note: 'border-amber-800 text-amber-300/70' },
}

function PhaseHeader({ num, title, color = 'cyan' }) {
  const c = colorCls[color]
  return (
    <div className="flex items-center gap-4 mb-6">
      <span className={`font-mono text-5xl font-bold leading-none select-none ${c.num}`}>{num}</span>
      <h3 className="text-white font-bold text-lg leading-snug">{title}</h3>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Process</p>
      <h2 className="section-title">開発プロセス</h2>
      <p className="section-sub">要件を「開発」し、AI と品質を構造化する</p>

      <div className="space-y-20">

        {/* ========== PHASE 01 ========== */}
        <div>
          <PhaseHeader num="01" title='要件は「聞き取る」のではなく「開発する」' color="cyan" />
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* 図 */}
            <div className="rounded-xl border border-[#1a4060] bg-[#050f1c] p-6 space-y-4 text-sm font-mono">
              <p className="text-slate-600 text-xs uppercase tracking-wider">一般的な誤解</p>
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-red-500/50 flex-shrink-0" />
                  <span>依頼者の言葉</span>
                  <span>→</span>
                  <span className="line-through decoration-red-500/60">要件定義書</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <span className="w-2 h-2 rounded-full bg-red-500/50 flex-shrink-0" />
                  <span>現場担当者の話</span>
                  <span>→</span>
                  <span className="line-through decoration-red-500/60">全体把握</span>
                </div>
              </div>
              <div className="border-t border-[#1a4060] pt-4 space-y-2.5">
                <p className="text-slate-600 text-xs uppercase tracking-wider">実際のアプローチ</p>
                <div className="flex items-start gap-3 text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 mt-1.5" />
                  <span>自ら現場を体験・観察・調査</span>
                </div>
                <div className="flex items-start gap-3 text-cyan-300 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />
                  <span>「あるべき姿」を開発者が構築する</span>
                </div>
              </div>
            </div>
            {/* テキスト */}
            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                依頼者は要件を知らない。現場担当者も全体を把握していない。「正しく聞き取る」という前提が、そもそも現実に即していない。
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                だから私はヒアリングを出発点にしない。複数店舗のシフト運用を自ら体験し、業務の流れを観察し、「今やっていることの電子化」ではなく<span className="text-cyan-300 font-semibold">「本来あるべき姿」を自分で構築する</span>。これが萩本順三氏の言う「要求開発」の本質であり、私の開発の出発点だ。
              </p>
              <div className="border-l-2 border-cyan-900 pl-4">
                <p className="text-cyan-300/60 text-xs leading-relaxed">現状の非効率をシステムで固定化しない。「追加仕様が無限に発生する」罠を避けるために。</p>
              </div>
            </div>
          </div>
        </div>

        {/* ========== PHASE 02 ========== */}
        <div>
          <PhaseHeader num="02" title='AI を「役割分担」させてプロトタイプを最速で作る' color="emerald" />
          <div className="grid md:grid-cols-2 gap-6 items-start mb-6">
            {/* 図: トークン配分 */}
            <div className="rounded-xl border border-[#1a4060] bg-[#050f1c] p-6 space-y-3 text-xs">
              <p className="text-slate-600 font-mono uppercase tracking-wider mb-1">Token Efficiency — コンテキスト配分</p>
              {[
                { label: 'Claude Code', pct: 35, color: 'bg-cyan-500' },
                { label: 'Gemini',      pct: 30, color: 'bg-blue-500' },
                { label: 'NotebookLM', pct: 25, color: 'bg-violet-500' },
                { label: 'Codex',      pct: 10, color: 'bg-emerald-500' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono w-24 flex-shrink-0">{b.label}</span>
                  <div className="flex-1 h-2 bg-[#0a1f30] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${b.color} opacity-70`} style={{ width: `${b.pct}%` }} />
                  </div>
                  <span className="text-slate-600 w-7 text-right font-mono">{b.pct}%</span>
                </div>
              ))}
              <p className="text-slate-700 text-[10px] pt-1">各 AI の得意領域で分担し、Claude のコンテキストを節約</p>
            </div>
            {/* テキスト */}
            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                遷移図や画面モックでは依頼者の意見が出ない。実務に近いデータを使った<span className="text-emerald-300 font-semibold">動作するプロトタイプを触ってもらって初めて「スイッチが入り」</span>、本当の要件定義が始まる。
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                AI を1つだけ使うのではなく、それぞれの得意領域で役割分担させることで、コンテキストを分散させてトークン消費を最適化しながら、プロトタイプの完成速度を大幅に上げている。
              </p>
              <div className="border-l-2 border-emerald-900 pl-4">
                <p className="text-emerald-300/60 text-xs leading-relaxed">AI が速くなるほど、間違ったものを速く完成させるリスクも増す。正しい「スイッチの入れ方」がより重要になる。</p>
              </div>
            </div>
          </div>
          {/* エージェント4枚グリッド */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {agents.map(a => {
              const c = colorCls[a.color]
              return (
                <div key={a.name} className="card flex flex-col gap-3">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className="text-white font-bold text-sm">{a.name}</p>
                    </div>
                    <p className="text-slate-500 text-xs">{a.vendor}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border w-fit ${c.badge}`}>{a.role}</span>
                  <ul className="space-y-1.5 flex-1">
                    {a.tasks.map(t => (
                      <li key={t} className="flex items-start gap-2 text-slate-400 text-xs leading-relaxed">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className={`text-[11px] leading-relaxed pt-2 border-t border-[#1a4060] ${c.accent}`}>{a.token}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* ========== PHASE 03 ========== */}
        <div>
          <PhaseHeader num="03" title="設定・エージェント・フックで品質を構造化する" color="cyan" />
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* 図: 3層スタック */}
            <div className="rounded-xl border border-[#1a4060] bg-[#050f1c] p-6 text-sm font-mono space-y-1">
              <p className="text-slate-600 text-xs uppercase tracking-wider mb-4">claude-universal-config の構造</p>
              {[
                { label: 'Hooks',    sub: '安全装置',  color: 'border-amber-700/60   bg-amber-900/20   text-amber-300'   },
                { label: 'Agents',   sub: '専門の役割', color: 'border-emerald-700/60 bg-emerald-900/20 text-emerald-300' },
                { label: 'Settings', sub: '行動規範',  color: 'border-cyan-700/60    bg-cyan-900/20    text-cyan-300'    },
              ].map((row, i) => (
                <div key={row.label}>
                  <div className={`rounded-lg border px-4 py-3 flex items-center justify-between ${row.color}`}>
                    <span className="font-bold">{row.label}</span>
                    <span className="text-xs opacity-70">{row.sub}</span>
                  </div>
                  {i < 2 && (
                    <div className="flex justify-center">
                      <div className="w-px h-3 bg-[#1a4060]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* 3つのカード */}
            <div className="space-y-3">
              {infraItems.map(item => {
                const c = colorCls[item.color]
                return (
                  <div key={item.label} className="card p-4">
                    <div className="flex flex-wrap items-baseline gap-1.5 mb-1.5">
                      <span className="text-white font-semibold text-sm">{item.label}</span>
                      <span className="text-slate-600 text-xs">=</span>
                      <span className={`text-xs font-medium ${c.accent}`}>{item.what}</span>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed mb-2">{item.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.example.map(e => (
                        <code key={e} className={`text-[11px] px-2 py-0.5 rounded border ${c.tag}`}>{e}</code>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ========== PHASE 04 ========== */}
        <div>
          <PhaseHeader num="04" title="現場フィードバック → 自律改善ループ" color="emerald" />
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* 図: ループフロー */}
            <div className="rounded-xl border border-[#1a4060] bg-[#050f1c] p-6 text-xs font-mono">
              <p className="text-slate-600 uppercase tracking-wider mb-4">autoresearch loop</p>
              <div className="space-y-0">
                {[
                  { label: '目標・検証方法を定義', who: '人間', color: 'text-cyan-400',    bg: 'bg-cyan-900/40 border-cyan-700' },
                  { label: '変更 → commit',        who: 'AI',   color: 'text-emerald-400', bg: 'bg-emerald-900/30 border-emerald-800' },
                  { label: '検証コマンド実行',      who: 'AI',   color: 'text-emerald-400', bg: 'bg-emerald-900/30 border-emerald-800' },
                  { label: 'KEEP or REVERT',        who: 'AI',   color: 'text-emerald-400', bg: 'bg-emerald-900/30 border-emerald-800' },
                  { label: 'ログ記録 → 繰り返し',   who: 'AI',   color: 'text-emerald-400', bg: 'bg-emerald-900/30 border-emerald-800' },
                ].map((row, i, arr) => (
                  <div key={row.label} className="flex items-stretch gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 ${row.bg}`}>
                        <span className={`text-[10px] font-bold ${row.color}`}>{i + 1}</span>
                      </div>
                      {i < arr.length - 1 && <div className="w-px flex-1 bg-[#1a4060] my-1" />}
                    </div>
                    <div className="pb-3">
                      <span className={row.color}>{row.label}</span>
                      <span className="text-slate-700 ml-2">({row.who})</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 border-t border-[#1a4060] pt-3 text-center text-emerald-400/50">
                66.7% → 100%（5 rounds 自動実行）
              </div>
            </div>
            {/* テキスト */}
            <div className="space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                実際に店舗スタッフが触ったプロトタイプから「スイッチが入り」、本当の要件が浮かび上がる。そのフィードバックをもとに <code className="text-emerald-400 bg-[#071828] px-1.5 py-0.5 rounded text-xs">/autoresearch</code> ループが「修正 → 検証 → 採用 / 棄却」を自律的に繰り返す。
              </p>
              <p className="text-slate-300 text-sm leading-relaxed">
                人間がすべきことは、改善の「目標」と「検証方法」を定義することだけ。変更・コミット・検証・リバートはエージェントが実行し、失敗も含めてすべてログに残る。
              </p>
              <div className="border-l-2 border-emerald-900 pl-4">
                <p className="text-emerald-300/60 text-xs leading-relaxed">実績: 品質チェック通過率 66.7% → 100%（5ラウンド自動実行）</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* まとめ */}
      <div className="mt-20 bg-cyan-900/15 border border-cyan-700/50 rounded-2xl p-8 md:p-10">
        <p className="text-cyan-200 text-base font-semibold mb-3">
          AI が速くなるほど、「何を作るか」の判断が問われる
        </p>
        <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
          AI はコーディング・テスト・ドキュメント整理といった定型作業を効率化する。しかしその分、間違った要件に基づいて間違ったものを速く完成させるリスクも同時に増す。
          設定・エージェント・フックによる品質の構造化と、複数 AI の役割分担によるトークン最適化は、その速度を安全に使いこなすための基盤だ。
          <span className="text-cyan-300 font-semibold"> AI が進化しても、要件を「開発する」判断は人間が担い続ける。</span>
        </p>
      </div>
    </section>
  )
}
