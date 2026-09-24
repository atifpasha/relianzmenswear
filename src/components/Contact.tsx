import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

const CONTACT_EMAIL = 'relianzmenswear@gmail.com';

const gmailComposeUrl = (subject: string, body: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}&su=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;

export default function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    business: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullName = `${form.firstName} ${form.lastName}`.trim();
    const subject = `Uniform Enquiry from ${form.business || fullName || 'Website Visitor'}`;
    const body = `Name: ${fullName}\nBusiness / Property: ${form.business}\nEmail: ${form.email}\n\n${form.message}`;
    window.open(gmailComposeUrl(subject, body), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="relative bg-ink py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(201,161,90,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold tracking-[0.4em] text-gold-light">GET IN TOUCH</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-white sm:text-5xl">
            Let&apos;s Uniform <span className="text-gradient-gold italic">Your Team</span>
          </h2>
          <p className="mt-4 text-neutral-400">
            Share your property details and uniform requirement — our team replies with a
            quote within 24 hours.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              {
                icon: HiOutlineMail,
                label: 'Email',
                links: [
                  { text: CONTACT_EMAIL, href: gmailComposeUrl('Uniform Enquiry', '') },
                ] as { text: string; href?: string }[],
              },
              {
                icon: HiOutlinePhone,
                label: 'Phone',
                links: [
                  { text: '+91 98441 37547', href: 'tel:+919844137547' },
                  { text: '+91 63603 16643', href: 'tel:+916360316643' },
                ] as { text: string; href?: string }[],
              },
              {
                icon: HiOutlineLocationMarker,
                label: 'Workshop',
                links: [{ text: 'DS Max Sky City, Bangalore, India 560064' }] as { text: string; href?: string }[],
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-charcoal/60 p-5"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-xl text-gold-light">
                  <item.icon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-neutral-500">{item.label}</p>
                  <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-neutral-200">
                    {item.links.map((link, i) =>
                      link.href ? (
                        <a
                          key={link.text}
                          href={link.href}
                          target={link.href.startsWith('tel:') ? undefined : '_blank'}
                          rel={link.href.startsWith('tel:') ? undefined : 'noopener noreferrer'}
                          className="transition-colors hover:text-gold-light"
                        >
                          {link.text}
                          {i < item.links.length - 1 ? ',' : ''}
                        </a>
                      ) : (
                        <span key={link.text}>{link.text}</span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 space-y-5 rounded-2xl border border-white/10 bg-charcoal/60 p-8 backdrop-blur-sm"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm text-neutral-400">First Name</label>
                <input
                  required
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  autoComplete="given-name"
                  className="w-full rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-neutral-100 outline-none transition-colors focus:border-gold placeholder:text-neutral-600"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm text-neutral-400">Last Name</label>
                <input
                  required
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  autoComplete="family-name"
                  className="w-full rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-neutral-100 outline-none transition-colors focus:border-gold placeholder:text-neutral-600"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-neutral-400">Business / Property Name</label>
              <input
                name="business"
                value={form.business}
                onChange={handleChange}
                placeholder="The Grand Regency Hotel"
                autoComplete="organization"
                className="w-full rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-neutral-100 outline-none transition-colors focus:border-gold placeholder:text-neutral-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-neutral-400">Email</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@yourhotel.com"
                autoComplete="email"
                className="w-full rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-neutral-100 outline-none transition-colors focus:border-gold placeholder:text-neutral-600"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm text-neutral-400">Message</label>
              <textarea
                required
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                placeholder="Uniform type, approximate quantity, and timeline..."
                className="w-full resize-none rounded-lg border border-white/10 bg-ink/60 px-4 py-3 text-neutral-100 outline-none transition-colors focus:border-gold placeholder:text-neutral-600"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-gold-light to-gold px-6 py-3.5 font-semibold text-ink shadow-lg shadow-gold/20"
            >
              Request a Quote
            </motion.button>
            <p className="text-center text-xs text-neutral-500">
              This opens Gmail in a new tab with your enquiry pre-filled — just hit send.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
