const goals = [
  {
    icon: '☁',
    title: 'インフラ・クラウド',
    desc: 'AWSをはじめとするクラウド技術・インフラ構築の習得。CG制作パイプラインのクラウド化や大容量データ転送の最適化に興味がある。',
    tags: ['AWS', 'クラウド', 'ネットワーク'],
  },
  {
    icon: '🖥',
    title: '自宅サーバ・NAS構築',
    desc: '自宅にNASやゲーム・Webサーバを構築中。ガジェット好きとしてハードウェアから触れるインフラ環境を整えたい。',
    tags: ['NAS', 'Webサーバ', 'ホームラボ'],
  },
  {
    icon: '🏠',
    title: 'スマートホーム（Matter）',
    desc: 'Matterプロトコルを活用した自宅のスマート化を検討中。IoTと介護の掛け合わせにも引き続き取り組みたい。',
    tags: ['Matter', 'IoT', 'スマートホーム'],
  },
  {
    icon: '🎬',
    title: 'CG制作 × IT',
    desc: '趣味のBlender・UE5で培ったCG制作の知識と、ITエンジニアとしてのスキルを掛け合わせ、制作現場を技術で支える人材を目指す。',
    tags: ['Blender', 'UE5', 'パイプライン'],
  },
]

export default function Goals() {
  return (
    <section id="goals" className="section">
      <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-2">Goals</p>
      <h2 className="section-title">これからやりたいこと</h2>
      <p className="section-sub">技術領域を広げながら、制作現場を支えるエンジニアへ</p>

      <div className="grid sm:grid-cols-2 gap-5">
        {goals.map((g) => (
          <div
            key={g.title}
            className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-violet-800 transition-colors"
          >
            <div className="text-3xl mb-3">{g.icon}</div>
            <h3 className="text-white font-semibold mb-2">{g.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">{g.desc}</p>
            <div className="flex flex-wrap gap-1.5">
              {g.tags.map((t) => (
                <span key={t} className="text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
