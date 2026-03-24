import { profile } from '../data/profile'

const pillars = [
  {
    icon: '⚙',
    title: 'IT開発',
    lines: ['HAL名古屋 高度IT専攻', 'OPTIMA Shift（実運用中）', 'AI Agent 活用'],
  },
  {
    icon: '🎙',
    title: '声優・ナレーター',
    lines: ['HAL入学以前からプロとして活動', '薬屋のひとりごと、原神 等', '東海圏を中心に活動'],
  },
  {
    icon: '🏭',
    title: '現場マネジメント',
    lines: ['JR東海リテイリング・プラス', '時間帯責任者・複数店舗担当', '要件定義〜システム化'],
  },
]

export default function About() {
  return (
    <section id="about" className="section">
      <p className="text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">About</p>
      <h2 className="section-title">自己紹介</h2>
      <p className="section-sub">現場・技術・表現の3軸を持つエンジニア</p>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* テキスト */}
        <div className="text-slate-200 leading-relaxed space-y-5 text-left">
          <p>
            私の強みは、<span className="text-cyan-300 font-semibold">現場の課題を自ら拾い上げ、関係者を巻き込みながら技術で解決する力</span>です。
          </p>
          <p>
            JR東海リテイリング・プラスでは、勤務調整の非効率改善を求める店長の相談を受け、アルバイトの立場でありながら支社管理部との交渉から着手。
            複数店舗で培った人間関係を活かしてヒアリングと要件定義を行い、勤務管理システム「OPTIMA Shift」を開発。現在4店舗で試験運用が続いています。
          </p>
          <p>
            この経験と並行して、プロのナレーター活動・父親の在宅介護・学業を同時にこなす中で、<span className="text-cyan-300 font-semibold">限られた時間の中で優先順位を判断し動き続ける力</span>も身についています。
          </p>
          <p>
            ラグビー13年（中学・高校ともに主将）、オープンキャンパスITコースリーダーなど、<span className="text-cyan-300 font-semibold">組織の中で橋渡し役を果たすこと</span>が自分の自然な役割だと感じています。
          </p>
        </div>

        {/* 3本柱 */}
        <div className="space-y-4">
          {pillars.map((p) => (
            <div key={p.title} className="card">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{p.icon}</span>
                <span className="text-white font-semibold text-base">{p.title}</span>
              </div>
              <ul className="space-y-2">
                {p.lines.map((l) => (
                  <li key={l} className="text-slate-300 text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
