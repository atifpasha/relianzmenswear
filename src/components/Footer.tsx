import { FaPhoneAlt, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import emblem from '../assets/emblem.png';

const YEAR = new Date().getFullYear();

const SOCIAL_LINKS = [
  { Icon: FaPhoneAlt, href: 'tel:+919844137547', label: 'Call us' },
  {
    Icon: SiGmail,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=relianzmenswear@gmail.com&su=Uniform%20Enquiry',
    label: 'Email us on Gmail',
  },
  { Icon: FaWhatsapp, href: 'https://wa.me/916360316643', label: 'Message us on WhatsApp' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <img src={emblem} alt="Relianz" className="h-11 w-auto object-contain" />
              <span className="flex flex-col leading-none">
                <span className="font-serif text-xl font-semibold italic text-gradient-gold">
                  Relianz
                </span>
                <span className="text-[10px] font-medium tracking-[0.3em] text-neutral-400">
                  MEN&apos;S WEAR
                </span>
              </span>
            </a>
            <p className="mt-4 text-sm text-neutral-400">
              Stitching premium chef coats, staff uniforms and workwear for restaurants,
              hotels and resorts — precision-tailored, built to last through every shift.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('tel:') ? undefined : '_blank'}
                  rel={href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-neutral-400 transition-colors hover:border-gold hover:text-gold-light"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><a href="#about" className="hover:text-gold-light">About Us</a></li>
              <li><a href="#collection" className="hover:text-gold-light">Our Products</a></li>
              <li><a href="#testimonials" className="hover:text-gold-light">Client Reviews</a></li>
              <li><a href="#contact" className="hover:text-gold-light">Get a Quote</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              What We Stitch
            </h4>
            <ul className="space-y-2.5 text-sm text-neutral-400">
              <li><a href="#collection" className="hover:text-gold-light">Chef Coats</a></li>
              <li><a href="#collection" className="hover:text-gold-light">Staff Shirts</a></li>
              <li><a href="#collection" className="hover:text-gold-light">Trousers &amp; Pants</a></li>
              <li><a href="#collection" className="hover:text-gold-light">Aprons</a></li>
              <li><a href="#collection" className="hover:text-gold-light">Front-of-House Coats</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Bulk Order Enquiries
            </h4>
            <p className="text-sm text-neutral-400">
              Outfitting a new property or refreshing staff uniforms? Share your requirement
              and we&apos;ll get back with a custom quote.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex overflow-hidden rounded-lg border border-white/10"
            >
              <input
                type="email"
                required
                placeholder="Your business email"
                className="w-full bg-ink/60 px-4 py-2.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-600"
              />
              <button
                type="submit"
                className="shrink-0 bg-gold px-4 text-sm font-semibold text-ink transition-colors hover:bg-gold-light"
              >
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row">
          <p>© {YEAR} Relianz Men&apos;s Wear. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-light">Privacy Policy</a>
            <a href="#" className="hover:text-gold-light">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
