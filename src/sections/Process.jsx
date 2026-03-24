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
    label: '設定',
    sub: 'Settings',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'cyan',
    what: 'AI の「行動規範」',
    desc: 'コーディングスタイル・セキュリティルール・git 規約など、AI がどう振る舞うかを定義するルールファイル群。CLAUDE.md に書くことで、会話をまたいで一貫した品質を維持できる。',
    example: ['coding-style.md', 'security.md', 'testing.md', 'git.md'],
  },
  {
    label: 'エージェント',
    sub: 'Agents',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: 'emerald',
    what: '専門特化した AI の役割',
    desc: 'code-reviewer・tdd-guide・security-reviewer など、特定タスクに特化した AI の「役」。それぞれが独自のコンテキストと指示を持ち、コードレビューや TDD・セキュリティ監査を専門家として担当する。',
    example: ['code-reviewer', 'tdd-guide', 'security-reviewer'],
  },
  {
    label: 'フック',
    sub: 'Hooks',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: 'amber',
    what: 'ツール実行前後の自動チェック',
    desc: 'AI がコマンドやファイル操作を実行する前後に自動で走る安全装置。危険なコマンドの阻止・セキュリティパターンの警告をコードなしで追加できる。設定ミスや事故をシステムレベルで防ぐ。',
    example: ['block: rm -rf', 'warn: eval()', 'warn: dangerouslySetInnerHTML'],
  },
]

const colorCls = {
  cyan:    { badge: 'bg-cyan-900/30 border-cyan-700 text-cyan-300',    dot: 'bg-cyan-400',    icon: 'text-cyan-400', tag: 'bg-cyan-900/20 text-cyan-400 border-cyan-800' },
  blue:    { badge: 'bg-blue-900/30 border-blue-700 text-blue-300',    dot: 'bg-blue-400',    icon: 'text-blue-400', tag: 'bg-blue-900/20 text-blue-400 border-blue-800' },
  violet:  { badge: 'bg-violet-900/30 border-violet-700 text-violet-300', dot: 'bg-violet-400', icon: 'text-violet-400', tag: 'bg-violet-900/20 text-violet-400 border-violet-800' },
  emerald: { badge: 'bg-emerald-900/30 border-emerald-700 text-emerald-300', dot: 'bg-emerald-400', icon: 'text-emerald-400', tag: 'bg-emerald-900/20 text-emerald-400 border-emerald-800' },
  amber:   { badge: 'bg-amber-900/20 border-amber-700 text-amber-300', dot: 'bg-amber-400',  icon: 'text-amber-400', tag: 'bg-amber-900/20 text-amber-400 border-amber-800' },
}

function PhaseLabel({ num, title, color = 'cyan' }) {
  return (
    <div>
      <span className={`font-mono text-4xl font-bold leading-none ${colorCls[color].icon} opacity-30 select-none`}>{num}</span>
      <h3 className="text-white font-bold text-lg leading-snug mt-2">{title}</h3>
    </div>
  )
}

export default function Process() {
  return (
    <section id="process" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Process</p>
      <h2 className="section-title">開発プロセス</h2>
      <p className="section-sub">要件を「開発」し、AI と品質を構造化する</p>

      {/* ======================================================
          PHASE 01 — 要件開発
      ====================================================== */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start mb-20">
        <div>
          <PhaseLabel num="01" title='要件は「聞き取る」のではなく「開発する」' color="cyan" />
          {/* 図: ヒアリング ≠ 要件定義 */}
          <div className="mt-6 rounded-xl border border-[#1a4060] bg-[#050f1c] p-5 space-y-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-red-400/70">
              <span className="w-2 h-2 rounded-full bg-red-500/60 flex-shrink-0" />
              <span>依頼者の言葉</span>
              <span className="text-slate-600">→</span>
              <span className="line-through text-slate-600">要件定義書</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-slate-700 flex-shrink-0" />
              <span>現場担当者の話</span>
              <span>→</span>
              <span className="line-through">全体把握</span>
            </div>
            <div className="border-t border-[#1a4060] pt-3 flex items-start gap-2 text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 mt-1" />
              <span>観察 + 体験 + 調査<br /><span className="text-cyan-300">→ あるべき姿を構築</span></span>
            </div>
          </div>
        </div>
        <div className="space-y-4 pt-2 md:pt-14">
          <p className="text-slate-300 text-sm leading-relaxed">
            依頼者は要件を知らない。現場担当者も全体を把握していない。「正しく聞き取る」という前提が、そもそも現実に即していない。
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            だから私はヒアリングを出発点にしない。複数店舗のシフト運用を自ら体験し、業務の流れを観察し、「今やっていることの電子化」ではなく<span className="text-cyan-300 font-semibold">「本来あるべき姿」を自分で構築する</span>。これが萩本順三氏の言う「要求開発」の本質であり、私の開発の出発点だ。
          </p>
          <div className="border-l-2 border-cyan-900/60 pl-4 py-1">
            <p className="text-cyan-300/70 text-xs leading-relaxed">現状の非効率をシステムで固定化しない。「追加仕様が無限に発生する」罠を避けるために。</p>
          </div>
        </div>
      </div>

      {/* ======================================================
          PHASE 02 — マルチエージェント連携
      ====================================================== */}
      <div className="mb-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start mb-8">
          <div>
            <PhaseLabel num="02" title="AI を「役割分担」させてプロトタイプを最速で作る" color="emerald" />
            {/* 図: トークン節約イメージ */}
            <div className="mt-6 rounded-xl border border-[#1a4060] bg-[#050f1c] p-5 space-y-2 text-xs">
              <p className="text-slate-600 font-mono uppercase tracking-wider mb-3">Token Efficiency</p>
              {[
                { label: 'Claude Code', pct: 35, color: 'bg-cyan-500' },
                { label: 'Gemini',      pct: 30, color: 'bg-blue-500' },
                { label: 'NotebookLM', pct: 25, color: 'bg-violet-500' },
                { label: 'Codex',      pct: 10, color: 'bg-emerald-500' },
              ].map(b => (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="text-slate-500 w-20 flex-shrink-0">{b.label}</span>
                  <div className="flex-1 h-2 bg-[#0a1f30] rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${b.color} opacity-70`} style={{ width: `${b.pct}%` }} />
                  </div>
                  <span className="text-slate-600 w-8 text-right">{b.pct}%</span>
                </div>
              ))}
              <p className="text-slate-600 text-[10px] pt-1">コンテキスト使用量の概算配分</p>
            </div>
          </div>
          <div className="space-y-4 pt-2 md:pt-14">
            <p className="text-slate-300 text-sm leading-relaxed">
              遷移図や画面モックでは依頼者の意見が出ない。実務に近いデータを使った<span className="text-emerald-300 font-semibold">動作するプロトタイプを触ってもらって初めて「スイッチが入り」</span>、本当の要件定義が始まる。
            </p>
            <p className="text-slate-300 text-sm leading-relaxed">
              AI を 1 つだけ使うのではなく、それぞれの得意領域で役割分担させることで、コンテキストを分散させてトークン消費を最適化しながら、プロトタイプの完成速度を大幅に上げている。
            </p>
            <div className="border-l-2 border-emerald-900/60 pl-4 py-1">
              <p className="text-emerald-300/70 text-xs leading-relaxed">AI が速くなるほど、間違ったものを速く完成させるリスクも増す。正しい「スイッチの入れ方」がより重要になる。</p>
            </div>
          </div>
        </div>

        {/* エージェント連携グリッド */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {agents.map(a => {
            const c = colorCls[a.color]
            return (
              <div key={a.name} className="card flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-white font-bold text-sm">{a.name}</p>
                    <p className="text-slate-500 text-xs">{a.vendor}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${c.badge}`}>{a.role}</span>
                </div>
                <ul className="space-y-1.5 flex-1">
                  {a.tasks.map(t => (
                    <li key={t} className="flex items-start gap-2 text-slate-400 text-xs leading-relaxed">
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className={`rounded-lg border p-2.5 text-[11px] leading-relaxed ${c.tag}`}>
                  {a.token}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ======================================================
          PHASE 03 — 設定・エージェント・フック
      ====================================================== */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start mb-20">
        <div>
          <PhaseLabel num="03" title="設定・エージェント・フックで品質を構造化する" color="cyan" />
          {/* 図: 3層構造 */}
          <div className="mt-6 rounded-xl border border-[#1a4060] bg-[#050f1c] p-5 space-y-2 text-xs font-mono">
            <div className="flex items-center gap-3 text-amber-400/80">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              <span>Hooks — 安全装置</span>
            </div>
            <div className="ml-3 w-px h-3 bg-[#1a4060]" />
            <div className="flex items-center gap-3 text-emerald-400/80">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>Agents — 専門の役割</span>
            </div>
            <div className="ml-3 w-px h-3 bg-[#1a4060]" />
            <div className="flex items-center gap-3 text-cyan-400/80">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>Settings — 行動規範</span>
            </div>
            <div className="border-t border-[#1a4060] pt-3 text-center text-slate-600">claude-universal-config</div>
          </div>
        </div>

        <div className="pt-2 md:pt-14 space-y-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            プロトタイプを速く作ることと品質を保つことは矛盾しない。3つの仕組みが AI の動作を構造化し、一人でも組織的な品質管理を実現する。
          </p>
          <div className="space-y-3">
            {infraItems.map(item => {
              const c = colorCls[item.color]
              return (
                <div key={item.label} className="card p-4">
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-[#050f1c] border border-[#1a4060] flex items-center justify-center ${c.icon}`}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-baseline gap-1.5 mb-1">
                        <span className="text-white font-semibold text-sm">{item.label}</span>
                        <span className="text-slate-600 text-xs">({item.sub})</span>
                        <span className="text-slate-600 text-xs">=</span>
                        <span className={`text-xs font-medium ${c.icon}`}>{item.what}</span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed mb-2">{item.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.example.map(e => (
                          <code key={e} className={`text-[11px] px-2 py-0.5 rounded border ${c.tag}`}>{e}</code>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ======================================================
          PHASE 04 — 自律改善ループ
      ====================================================== */}
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start mb-16">
        <div>
          <PhaseLabel num="04" title="現場フィードバック → 自律改善ループ" color="emerald" />
          {/* 図: ループ */}
          <div className="mt-6 rounded-xl border border-[#1a4060] bg-[#050f1c] p-5 text-xs font-mono">
            {[
              { label: '目標・検証方法を定義', who: '人間', color: 'text-cyan-400' },
              { label: '変更 → commit',        who: 'AI',   color: 'text-emerald-400' },
              { label: '検証コマンド実行',      who: 'AI',   color: 'text-emerald-400' },
              { label: 'KEEP or REVERT',        who: 'AI',   color: 'text-emerald-400' },
              { label: 'ログ記録 → 繰り返し',   who: 'AI',   color: 'text-emerald-400' },
            ].map((row, i, arr) => (
              <div key={row.label} className="flex items-start gap-2">
                <div className="flex flex-col items-center">
                  <div className={`w-5 h-5 rounded-full border border-[#1a4060] flex items-center justify-center flex-shrink-0 ${row.who === '人間' ? 'bg-cyan-900/40' : 'bg-emerald-900/30'}`}>
                    <span className={`text-[9px] font-bold ${row.color}`}>{i + 1}</span>
                  </div>
                  {i < arr.length - 1 && <div className="w-px h-4 bg-[#1a4060]" />}
                </div>
                <div className="pb-1">
                  <span className={`${row.color}`}>{row.label}</span>
                  <span className="text-slate-700 ml-2">({row.who})</span>
                </div>
              </div>
            ))}
            <div className="mt-3 border-t border-[#1a4060] pt-3 text-emerald-400/60 text-center">
              66.7% → 100% (5 rounds)
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-2 md:pt-14">
          <p className="text-slate-300 text-sm leading-relaxed">
            実際に店舗スタッフが触ったプロトタイプから「スイッチが入り」、本当の要件が浮かび上がる。そのフィードバックをもとに <code className="text-emerald-400 bg-[#071828] px-1.5 py-0.5 rounded text-xs">/autoresearch</code> ループが「修正 → 検証 → 採用 / 棄却」を自律的に繰り返す。
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            人間がすべきことは、改善の「目標」と「検証方法」を定義することだけ。変更・コミット・検証・リバートはエージェントが実行し、失敗も含めてすべてログに残る。
          </p>
          <div className="border-l-2 border-emerald-900/60 pl-4 py-1">
            <p className="text-emerald-300/70 text-xs leading-relaxed">実績: 品質チェック通過率 66.7% → 100%（5ラウンド自動実行）</p>
          </div>
        </div>
      </div>

      {/* まとめ */}
      <div className="bg-cyan-900/15 border border-cyan-700/50 rounded-2xl p-8 md:p-10">
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
