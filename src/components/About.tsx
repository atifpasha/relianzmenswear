import { motion, type Variants } from 'framer-motion';
import { GiSewingMachine, GiClothes, GiFactory } from 'react-icons/gi';

const FEATURES = [
  {
    icon: GiSewingMachine,
    title: 'In-House Stitching',
    text: 'Our own tailoring unit hand-finishes every chef coat and uniform to consistent, factory-grade quality.',
  },
  {
    icon: GiClothes,
    title: 'Kitchen-Ready Fabrics',
    text: 'Heat-resistant, breathable and easy-care fabrics chosen for long shifts in demanding kitchens and floors.',
  },
  {
    icon: GiFactory,
    title: 'Bulk & Repeat Orders',
    text: 'From a 20-piece pilot to a 500-piece rollout across properties, sizing and finish stay identical every time.',
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
};

export default function About() {
  return (
    <section id="about" className="relative bg-ink py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold tracking-[0.4em] text-gold-light">OUR STORY</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-white sm:text-5xl">
            Uniform Stitching, <span className="text-gradient-gold italic">Built on Trust</span>
          </h2>
          <p className="mt-6 text-neutral-400">
            Established in 2005, Relianz Men&apos;s Wear has spent over 25 years stitching
            chef coats and staff uniforms for restaurants, hotels and resorts — combining
            tailoring precision with the durability hospitality teams need, shift after shift.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              whileHover={{ y: -8 }}
              className="group rounded-2xl border border-white/10 bg-charcoal/60 p-8 backdrop-blur-sm transition-colors hover:border-gold/40"
            >
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-3xl text-gold-light transition-transform group-hover:scale-110">
                <f.icon />
              </div>
              <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-neutral-400">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
