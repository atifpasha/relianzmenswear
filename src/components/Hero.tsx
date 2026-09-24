import { motion } from 'framer-motion';
import ThreadBackground from './ThreadBackground';
import ScissorsCursor from './ScissorsCursor';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-ink"
    >
      {/* Ambient animated gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gold/20 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-amber-700/10 blur-3xl"
        />
      </div>

      <ThreadBackground />
      <ScissorsCursor />

      <div className="absolute inset-0 bg-noise opacity-40" />
      {/* Scrim behind the headline/copy so the thread animation never fights with text contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_25%_35%,rgba(10,9,8,0.8),transparent_72%)] sm:bg-[radial-gradient(ellipse_55%_65%_at_28%_42%,rgba(10,9,8,0.74),transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-32 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-semibold tracking-[0.4em] text-gold-light"
        >
          RESTAURANT, HOTEL &amp; RESORT UNIFORMS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-3xl font-serif text-5xl font-medium leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Stitching Uniforms{' '}
          <span className="text-gradient-gold italic">Your Team Deserves.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 max-w-xl text-lg text-neutral-300"
        >
          Relianz Men&apos;s Wear tailors premium chef coats, staff shirts, trousers and
          aprons for restaurants, hotels and resorts — durable, comfortable and
          consistently finished, order after order.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:flex-wrap sm:items-center"
        >
          <a
            href="#collection"
            className="w-full rounded-full bg-gradient-to-r from-gold-light to-gold px-8 py-3.5 text-center font-semibold text-ink shadow-lg shadow-gold/20 transition-transform hover:scale-105 sm:w-auto"
          >
            View Our Products
          </a>
          <a
            href="#contact"
            className="w-full rounded-full border border-white/20 px-8 py-3.5 text-center font-medium text-neutral-100 transition-colors hover:border-gold hover:text-gold-light sm:w-auto"
          >
            Request a Bulk Quote
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid max-w-xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
        >
          {[
            ['25+', 'Years Stitching'],
            ['100+', 'Hospitality Clients'],
            ['50k+', 'Uniforms Delivered'],
          ].map(([stat, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold text-gradient-gold">{stat}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-neutral-400">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold-light/70"
      >
        <div className="h-9 w-6 rounded-full border border-gold-light/40 p-1">
          <div className="h-2 w-1 rounded-full bg-gold-light" />
        </div>
      </motion.div>
    </section>
  );
}
