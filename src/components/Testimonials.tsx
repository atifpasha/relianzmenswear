import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';

const REVIEWS = [
  {
    name: 'Arjun Mehta',
    role: 'F&B Manager, The Grand Regency Hotel',
    review:
      'Our chef coats used to wear out within months. Relianz stitched a batch that has held up perfectly through daily service — the fit and finish are consistently spot on.',
    rating: 5,
  },
  {
    name: 'Daniel Cho',
    role: 'Executive Chef, Coastline Resort',
    review:
      'They understood exactly what a working kitchen needs — breathable fabric, reinforced stitching, and sizing that stayed accurate across the whole brigade.',
    rating: 5,
  },
  {
    name: 'Rohan Kapoor',
    role: 'Owner, Kapoor Restaurant Group',
    review:
      'We reordered staff uniforms for three outlets and every batch matched the first, down to the stitching. Reliable quality at scale is rare to find.',
    rating: 5,
  },
  {
    name: 'Michael Fernandes',
    role: 'General Manager, Cliffside Hotel & Spa',
    review:
      'From measurements to delivery, the process was smooth and professional. Our front-of-house team finally has uniforms that look as sharp as they feel.',
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % REVIEWS.length), 6000);
    return () => clearInterval(t);
  }, []);

  const next = () => setIndex((i) => (i + 1) % REVIEWS.length);
  const prev = () => setIndex((i) => (i - 1 + REVIEWS.length) % REVIEWS.length);
  const active = REVIEWS[index];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-ink py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,161,90,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold tracking-[0.4em] text-gold-light">CLIENT VOICES</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-white sm:text-5xl">
            What Our <span className="text-gradient-gold italic">Clients Say</span>
          </h2>
        </motion.div>

        <div className="relative mt-16 rounded-3xl border border-white/10 bg-charcoal/50 p-10 backdrop-blur-sm sm:p-14">
          <FaQuoteLeft className="mb-6 text-3xl text-gold/40" />

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-xl leading-relaxed text-neutral-200 sm:text-2xl">
                “{active.review}”
              </p>

              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">{active.name}</p>
                  <p className="text-sm text-neutral-400">{active.role}</p>
                </div>
                <div className="flex gap-1 text-gold-light">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-gold hover:text-gold-light"
            >
              <FaChevronLeft />
            </button>
            <div className="flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-gold' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-gold hover:text-gold-light"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
