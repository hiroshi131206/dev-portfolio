import { profile } from '../data/profile'

const pillars = [
  {
    icon: '⚙',
    title: 'IT開発',
    lines: ['HAL名古屋 高度IT専攻', 'OPTIMA Shift（実運用中）', 'AI Agent 活用'],
  },
  {
    icon: '🎙',
    title: 'タレント・ナレーター',
    lines: ['高校在学中にNTC事務所所属・タレントデビュー', 'ラジオCM・企業VP ナレーションを主軸に活動', '東海圏を中心に現在も並行して活動中'],
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
            私の強みは、<span className="text-cyan-300 font-semibold">逆境においても現場の課題を自ら拾い上げ、周囲を巻き込みながら技術で解決する力</span>です。
          </p>
          <p>
            当初は医師である父の意向で医学部を目指し浪人生活を送っていましたが、父が脳梗塞で倒れ、家計が急変するという事態に直面しました。この経験から、<span className="text-cyan-300 font-semibold">自らの手で価値を生み出すため</span>にHAL名古屋高度情報学科への進学を決意。現在は、AIの駆動開発によってシステム開発プロセスそのものをパッケージングすることを目指し、技術習得に励んでいます。
          </p>
          <p>
            この「自ら動く」姿勢は、JR東海リテイリング・プラスでの活動にも現れています。アルバイトの立場ながら、店長から相談された勤務調整の非効率を改善するため、支社管理部との交渉から着手。複数店舗で培った信頼関係を活かして要件定義を行い、開発した「OPTIMA Shift」は現在4店舗で試験運用されています。
          </p>
          <p>
            こうした開発活動の傍ら、プロのナレーター・父の在宅介護・学業という三つの領域を同時にこなす中で、<span className="text-cyan-300 font-semibold">限られた時間で優先順位を判断し、完遂する力</span>を磨いてきました。
          </p>
          <p>
            13年間のラグビー経験（中学・高校主将）やオープンキャンパスでのリーダー経験から、<span className="text-cyan-300 font-semibold">組織の「橋渡し役」として動くこと</span>が私の原点です。困難な状況でも最適解を見出し、技術を通じて組織や社会に貢献することに情熱を注いでいます。
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
