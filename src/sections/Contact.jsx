import { profile } from '../data/profile'

const links = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: '✉',
  },
  {
    label: 'GitHub',
    value: 'hiroshi131206',
    href: profile.github,
    icon: '⌥',
  },
  {
    label: '声優ポートフォリオ',
    value: 'hiroshi131206.github.io',
    href: profile.voicePortfolio,
    icon: '🎙',
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
            className="flex items-center gap-5 card hover:border-violet-500 group"
          >
            <span className="text-2xl w-10 text-center flex-shrink-0">{l.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-violet-400 text-xs font-mono uppercase tracking-wider mb-0.5">{l.label}</p>
              <p className="text-slate-100 text-sm font-medium truncate">{l.value}</p>
            </div>
            <span className="text-slate-500 group-hover:text-violet-400 transition-colors text-lg flex-shrink-0">→</span>
          </a>
        ))}
      </div>

      <p className="text-center text-slate-600 text-sm mt-16">
        © 2025 Hayashi Hiroshi. Built with React + Three.js
      </p>
    </section>
  )
}
