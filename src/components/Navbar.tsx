import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import emblem from '../assets/emblem.png';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#collection' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md shadow-[0_1px_0_0_rgba(201,161,90,0.2)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#home" className="flex items-center gap-2.5">
          <img src={emblem} alt="Relianz" className="h-10 w-auto object-contain sm:h-12" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold italic text-gradient-gold sm:text-2xl">
              Relianz
            </span>
            <span className="text-[10px] font-medium tracking-[0.3em] text-neutral-300 sm:text-xs">
              MEN&apos;S WEAR
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-sm font-medium tracking-wide text-neutral-200 transition-colors hover:text-gold-light"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden rounded-full border border-gold/60 px-5 py-2 text-sm font-medium text-gold-light transition-all hover:bg-gold hover:text-ink lg:inline-block"
        >
          Get in Touch
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="text-2xl text-gold-light lg:hidden"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-neutral-200 transition-colors hover:bg-white/5 hover:text-gold-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-6">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="block w-full rounded-full border border-gold/60 px-5 py-3 text-center text-sm font-medium text-gold-light transition-all hover:bg-gold hover:text-ink"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
