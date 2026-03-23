import { profile } from '../data/profile'

const links = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: 'GitHub',
    value: 'hiroshi131206',
    href: profile.github,
  },
  {
    label: '声優ポートフォリオ',
    value: 'hiroshi131206.github.io',
    href: profile.voicePortfolio,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="section">
      <p className="text-violet-400 text-xs font-mono tracking-widest uppercase mb-2">Contact</p>
      <h2 className="section-title">連絡先</h2>
      <p className="section-sub">お気軽にご連絡ください</p>

      <div className="max-w-lg mx-auto space-y-4">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target={l.href.startsWith('http') ? '_blank' : undefined}
            rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center justify-between bg-slate-900/50 border border-slate-800 rounded-xl px-6 py-4 hover:border-violet-700 hover:bg-slate-900 transition-all group"
          >
            <div>
              <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{l.label}</p>
              <p className="text-slate-200 text-sm">{l.value}</p>
            </div>
            <span className="text-slate-600 group-hover:text-violet-500 transition-colors">→</span>
          </a>
        ))}
      </div>

      <p className="text-center text-slate-600 text-sm mt-16">
        © 2025 Hayashi Hiroshi. Built with React + Three.js
      </p>
    </section>
  )
}
