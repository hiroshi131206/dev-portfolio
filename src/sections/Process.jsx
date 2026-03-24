const agents = [
  {
    id: 'code-reviewer',
    name: 'code-reviewer',
    role: 'コードレビュー',
    desc: 'Python・TypeScript・Django・React を横断してコード品質を自動チェック。プロジェクト固有の権限パターン違反も検出。',
    tags: ['Python', 'TypeScript', 'Django', 'React'],
  },
  {
    id: 'tdd-guide',
    name: 'tdd-guide',
    role: 'TDD ガイド',
    desc: 'テスト駆動開発のサイクルをAIがナビゲート。テストケース設計から実装・リファクタリングまで並走。',
    tags: ['Python', 'TypeScript'],
  },
  {
    id: 'security-reviewer',
    name: 'security-reviewer',
    role: 'セキュリティ監査',
    desc: 'OWASP Top 10・STRIDE モデルに基づく自律セキュリティ監査。SQL injection・XSS・認証脆弱性を自動検出。',
    tags: ['OWASP', 'STRIDE', 'Web Security'],
  },
]

const autoresearchCommands = [
  { cmd: '/autoresearch:fix',      desc: 'エラーゼロになるまで自動修正ループ' },
  { cmd: '/autoresearch:debug',    desc: '科学的仮説検証によるバグ自動発見' },
  { cmd: '/autoresearch:security', desc: 'STRIDE + OWASP Top10 自律監査' },
  { cmd: '/autoresearch:ship',     desc: 'コード・コンテンツを自動シッピング' },
  { cmd: '/autoresearch:learn',    desc: 'コードベース自動解析 → ドキュメント生成' },
  { cmd: '/autoresearch:plan',     desc: '目標から Scope / Metric / Verify を自動設計' },
]

const hookifyRules = [
  { pattern: 'rm -rf',                   action: 'block', desc: '危険な削除コマンドを阻止' },
  { pattern: 'eval() / new Function()',  action: 'block', desc: 'JS コードインジェクション検出' },
  { pattern: 'dangerouslySetInnerHTML',  action: 'warn',  desc: 'XSS リスクを警告' },
  { pattern: 'os.system / pickle',       action: 'warn',  desc: 'Python セキュリティパターン警告' },
]

const loop = [
  { phase: 'P0', label: 'git 状態チェック', detail: 'clean / dirty を確認' },
  { phase: 'P1', label: '履歴学習',         detail: '過去の成功 / 失敗を読み込み' },
  { phase: 'P2', label: '実験選択',         detail: '次の変更を仮説として設定' },
  { phase: 'P3', label: 'アトミック変更',   detail: '1変更 / 1イテレーション' },
  { phase: 'P4', label: 'git commit',       detail: '検証前にコミット（ロールバック可）' },
  { phase: 'P5', label: '検証実行',         detail: '指標コマンドで改善量を計測' },
  { phase: 'P6', label: 'KEEP / REVERT',   detail: '改善 → 採用 / 悪化 → 自動リバート' },
  { phase: 'P7', label: 'ログ記録',         detail: 'results.tsv に全イテレーション記録' },
]

export default function Process() {
  return (
    <section id="process" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">Process</p>
      <h2 className="section-title">開発プロセス</h2>
      <p className="section-sub">claude-universal-config — AI エージェント駆動の開発基盤</p>

      {/* 概要 */}
      <div className="max-w-3xl mx-auto mb-16">
        <div className="card p-6 md:p-8">
          <p className="text-slate-300 leading-relaxed text-sm md:text-base">
            <span className="text-cyan-300 font-semibold">claude-universal-config</span> は、言語・フレームワークを横断して
            Claude Code の設定を一元管理するオープンソースライブラリです。OPTIMA Shift の開発で蓄積した
            設定・エージェント・フックを汎用化し、どのプロジェクトにも即適用できる仕組みとして公開しています。
            コードレビュー・TDD・セキュリティ監査・自律改善ループを AI エージェントに委譲することで、
            <span className="text-cyan-300 font-semibold">一人でも組織的な品質管理</span>を実現します。
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Python', 'TypeScript', 'Django', 'React', 'Go', 'Rust', 'Docker', 'AWS'].map(t => (
              <span key={t} className="text-xs bg-[#071828] text-slate-300 border border-[#1a4060] px-3 py-1 rounded-full">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* AI エージェント */}
      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-5">AI Agents</p>
        <div className="space-y-4">
          {agents.map((a) => (
            <div key={a.id} className="card flex gap-5 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-900/40 border border-cyan-700 flex items-center justify-center">
                <span className="text-cyan-300 font-mono text-xs font-bold">AG</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <code className="text-cyan-300 text-sm font-mono">{a.name}</code>
                  <span className="text-slate-500 text-xs">/</span>
                  <span className="text-white text-sm font-semibold">{a.role}</span>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-2">{a.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {a.tags.map(t => (
                    <span key={t} className="text-xs bg-[#071828] text-cyan-400 border border-cyan-900 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* autoresearch 自律改善ループ */}
      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-5">Autonomous Improvement Loop</p>
        <div className="card p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-900/40 border border-emerald-700 flex items-center justify-center">
              <span className="text-emerald-300 font-mono text-xs font-bold">AR</span>
            </div>
            <div>
              <code className="text-emerald-300 text-sm font-mono">/autoresearch</code>
              <p className="text-slate-300 text-sm mt-1 leading-relaxed">
                「修正 → 検証 → 採用 / 棄却 → 繰り返し」を自律的に実行するエージェントループ。
                測定可能な指標があれば何にでも適用可能。
                <span className="text-emerald-300 font-semibold"> 実績: 品質チェック通過率 66.7% → 100%（5ラウンド自動実行）</span>
              </p>
            </div>
          </div>

          {/* サブコマンド */}
          <div className="grid sm:grid-cols-2 gap-2 mb-6">
            {autoresearchCommands.map(c => (
              <div key={c.cmd} className="flex flex-col gap-1 bg-[#050f1c] rounded-lg px-4 py-3 border border-[#1a4060]">
                <code className="text-emerald-400 text-xs font-mono">{c.cmd}</code>
                <span className="text-slate-400 text-xs">{c.desc}</span>
              </div>
            ))}
          </div>

          {/* ループフロー */}
          <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-3">Loop Flow</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {loop.map((l, i) => (
              <div key={l.phase} className="relative bg-[#050f1c] border border-[#1a4060] rounded-lg p-3">
                <span className="text-cyan-700 text-xs font-mono">{l.phase}</span>
                <p className="text-white text-xs font-semibold mt-1 leading-tight">{l.label}</p>
                <p className="text-slate-500 text-xs mt-0.5 leading-tight">{l.detail}</p>
              </div>
            ))}
          </div>

          {/* セキュリティ設計 */}
          <div className="mt-5 flex flex-wrap gap-3">
            {[
              'git add -A 禁止（明示的ファイル指定のみ）',
              '--no-verify 禁止（フック経由で品質保護）',
              'テスト・ガードファイルの変更禁止',
              'git revert 優先（失敗も履歴として記録）',
            ].map(s => (
              <span key={s} className="text-xs text-slate-400 bg-[#071828] border border-slate-700 px-3 py-1 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* hookify */}
      <div className="max-w-3xl mx-auto mb-16">
        <p className="text-cyan-500 text-xs font-mono uppercase tracking-wider mb-5">Safety Hooks — hookify</p>
        <div className="card p-6">
          <p className="text-slate-300 text-sm leading-relaxed mb-5">
            Markdown ルールファイルからカスタム Claude Code フックを自動生成するプラグイン。
            コード不要でフックを追加・無効化でき、全フックイベント（PreToolUse / PostToolUse / Stop / UserPromptSubmit）をカバー。
          </p>
          <div className="space-y-2">
            {hookifyRules.map(r => (
              <div key={r.pattern} className="flex items-center gap-4 bg-[#050f1c] border border-[#1a4060] rounded-lg px-4 py-3">
                <span className={`text-xs font-mono px-2 py-0.5 rounded flex-shrink-0 ${
                  r.action === 'block'
                    ? 'bg-red-900/40 text-red-300 border border-red-800'
                    : 'bg-yellow-900/30 text-yellow-300 border border-yellow-800'
                }`}>
                  {r.action}
                </span>
                <code className="text-slate-400 text-xs font-mono flex-shrink-0">{r.pattern}</code>
                <span className="text-slate-500 text-xs hidden sm:block">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* まとめ */}
      <div className="max-w-3xl mx-auto bg-cyan-900/15 border border-cyan-700/50 rounded-2xl p-8 text-center">
        <p className="text-cyan-200 text-lg font-semibold mb-2">
          AI エージェントを「使いこなす側」のエンジニアとして
        </p>
        <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
          ツールとして AI を呼び出すだけでなく、コードレビュー・セキュリティ監査・自律改善ループを
          エージェントに委譲し、設定ライブラリとして汎用化・公開。開発・品質・安全を
          AI エージェント同士が自律的に回す仕組みを実践しています。
        </p>
        <a
          href="https://github.com/hiroshi131206/claude-universal-config"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 text-cyan-400 hover:text-cyan-300 text-sm font-medium border border-cyan-800/60 hover:border-cyan-600 rounded-lg px-5 py-2.5 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
          </svg>
          claude-universal-config を GitHub で見る
        </a>
      </div>
    </section>
  )
}
