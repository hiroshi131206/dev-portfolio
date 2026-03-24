import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Process', href: '#process' },
  { label: 'Skills', href: '#skills' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Other', href: '#voice' },
  { label: 'Goals', href: '#goals' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#040e1a]/95 backdrop-blur border-b border-cyan-900/40' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="text-white font-bold tracking-tight">HH.</span>

        {/* Desktop */}
        <ul className="hidden md:flex gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          <div className="w-5 flex flex-col gap-1">
            <span className={`block h-0.5 bg-current transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block h-0.5 bg-current transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#040e1a]/95 border-b border-cyan-900/40 px-6 pb-4">
          <ul className="flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-slate-300 hover:text-white text-sm"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
