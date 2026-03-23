export const profile = {
  name: '林 寛',
  nameEn: 'Hayashi Hiroshi',
  tagline: '現場を知るエンジニア。課題を聞き、設計し、動かす。',
  school: 'HAL名古屋 高度情報学科 高度IT専攻',
  graduationYear: '2027年3月卒業予定',
  email: 'hayashi1312068@gmail.com',
  github: 'https://github.com/hiroshi131206',
  voicePortfolio: 'https://hiroshi131206.github.io/.github.io/',
  location: '愛知県名古屋市',
}

export const works = [
  {
    id: 'optima-shift',
    title: 'OPTIMA Shift',
    subtitle: '勤務管理システム',
    badge: '実運用中',
    badgeColor: 'green',
    description: 'JR東海リテイリング・プラスの名古屋駅3店舗・在来線1店舗で現在も試験運用中の勤務管理システム。アルバイトの立場から現場課題を拾い上げ、要件定義から開発まで一貫して担当。',
    motivation: '複数店舗で勤務する中で、店長から「勤務調整が非効率で困っている」という相談を受けたことがきっかけ。アルバイトの立場でありながら支社管理部との交渉から着手した。',
    features: [
      '店長・エリアマネージャー・現場スタッフへのヒアリングによる要件定義',
      '複数業種・複数店舗の業務フローを横断した設計',
      'AI（Claude Code）活用による開発工期短縮',
    ],
    status: '名古屋駅3店舗・在来線1店舗で試験運用継続中',
    tags: ['要件定義', 'システム開発', 'AI活用', 'Claude Code'],
    github: 'https://github.com/hiroshi131206/optima-shift-project',
  },
  {
    id: 'script-analyzer',
    title: '台本解析アプリ',
    subtitle: '俳優・声優のためのセリフ暗記支援',
    badge: '個人開発',
    badgeColor: 'blue',
    description: 'プロの声優として自分が欲しかったツール。台本をAIが読み上げ、自分のターンで自動停止。通勤中でも練習できる。',
    motivation: 'プロの声優として現場で感じた「相手役なしに練習できない」という課題を技術で解決したかった。',
    features: [
      'テキスト・PDF・画像（β）から台本取り込み',
      'AIによる役ごとの音声自動生成',
      'NHKアクセント辞典準拠のアクセント指示',
      '自分のターンで自動停止 / バックグラウンド再生対応',
      '共有コードで仲間の声を取り込み可能',
    ],
    tags: ['AI', '音声合成', 'React', '声優'],
  },
  {
    id: 'family-schedule',
    title: '家族予定共有システム',
    subtitle: '介護×IT で家族の日常をサポート',
    badge: '個人開発',
    badgeColor: 'blue',
    description: '自営業の母・介護中の父がいる環境で、バラバラな家族の送迎・食事分担を管理。リビングと玄関にタッチパネルモニターを設置し、スマホ・PCからも入力可能。',
    motivation: '父親の在宅介護と母親の不規則な勤務シフトにより、家族間での情報共有が困難だった課題を解決するために開発。',
    features: [
      'タッチパネルモニター（リビング・玄関）での確認',
      'スマホ・PCから予定入力',
      'リアルタイム同期',
    ],
    tags: ['IoT', 'タッチパネル', '介護', 'リアルタイム'],
  },
  {
    id: 'meal-management',
    title: '父親食事管理システム',
    subtitle: '介護の現場課題をシステムで解決',
    badge: '個人開発',
    badgeColor: 'blue',
    description: '介護状態の父が食べ物を無断で食べてしまう問題をセンシングと通知で解決するシステム。',
    motivation: '介護の現場で直面した具体的な課題をエンジニアとして解決しようとした試み。',
    features: [
      '食品へのアクセス検知',
      '家族へのリアルタイム通知',
    ],
    tags: ['IoT', '介護', 'センシング'],
  },
  {
    id: 'cg-works',
    title: 'CG・3D制作',
    subtitle: 'Blender / UE5 / CAD',
    badge: '趣味制作',
    badgeColor: 'purple',
    description: 'UE5やBlenderでのCG映像制作、デスク環境構築のための小物をCADで設計・3Dプリント出力。',
    motivation: 'ガジェット好き・DIY好きの延長として、デジタルとフィジカルをつなぐものづくりに取り組んでいる。',
    features: [
      'Blender でのモデリング・アニメーション',
      'Unreal Engine 5 でのシーン制作',
      'CAD設計 → 3Dプリント出力（マイクアクセサリー・収納パーツ等）',
    ],
    tags: ['Blender', 'UE5', 'CAD', '3Dプリント'],
  },
]

export const skills = {
  dev: [
    { name: 'Figma', level: 4 },
    { name: 'Google Stitch', level: 3 },
    { name: 'React', level: 3 },
    { name: 'Three.js / R3F', level: 2 },
    { name: 'AI Agent 活用', level: 4 },
    { name: 'Claude Code', level: 4 },
  ],
  cg: [
    { name: 'Blender', level: 3 },
    { name: 'Unreal Engine 5', level: 2 },
    { name: 'CAD設計', level: 3 },
    { name: '3Dプリント', level: 3 },
  ],
  audio: [
    { name: 'Pro Tools', level: 4 },
    { name: 'Cubase 13 Pro', level: 4 },
    { name: 'Adobe Audition', level: 3 },
  ],
  infra: [
    { name: 'AWS / クラウド', level: 1, note: '学習中' },
    { name: 'NAS / Webサーバ', level: 2, note: '構築中' },
    { name: 'Matter / スマートホーム', level: 2, note: '検討中' },
  ],
}

export const voiceWorks = [
  { category: 'アニメ', title: '薬屋のひとりごと', role: '宦官役' },
  { category: 'ゲーム', title: '原神', role: 'NPC役' },
  { category: 'CM', title: '東芝 ZABOON', role: 'ナレーション' },
  { category: 'CM', title: '日本特殊陶業', role: 'ナレーション' },
  { category: 'VP', title: 'トヨタ自動車', role: 'ナレーション' },
  { category: 'VP', title: '名古屋大学', role: 'ナレーション' },
]

export const timeline = [
  { year: '2001', event: '愛知県名古屋市生まれ' },
  { year: '中学', event: 'ラグビー部 主将' },
  { year: '高校', event: 'ラグビー部 主将 / 声優活動を開始' },
  { year: '〜2023', event: 'プロ声優・ナレーターとして活動開始（薬屋のひとりごと、原神、東芝ZABOON 等）' },
  { year: '2023', event: 'HAL名古屋 高度情報学科 高度IT専攻 入学' },
  { year: '2023〜', event: 'JR東海リテイリング・プラス 時間帯責任者（複数業種・複数店舗）' },
  { year: '2024', event: 'OPTIMA Shift 開発開始（要件定義〜実装）' },
  { year: '2024〜', event: 'OPTIMA Shift、名古屋駅3店舗・在来線1店舗で試験運用中' },
  { year: '2025〜', event: 'オープンキャンパス ITコースリーダー / HEW2026 音響・演技指導アドバイザー' },
  { year: '2027.3', event: '卒業予定', future: true },
]
