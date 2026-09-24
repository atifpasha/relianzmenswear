import { motion } from 'framer-motion';
import { FaHotel } from 'react-icons/fa';

const CLIENTS = [
  'Evory Tower Ebony',
  'Balal Residency',
  'Zoin Hotel',
  'Hotel ABM International',
  'Once Upon A Rooftop',
  'Vanya Luxury Boutique Resort',
  'DHA 6566 Resto Pub',
  "Gilly's Restobar",
  'The Terminal Restaurant',
  'SRS Springs Hotel and Spa',
];

export default function Clients() {
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    <section className="border-y border-white/10 bg-charcoal py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="mb-10 text-center text-sm font-semibold tracking-[0.4em] text-neutral-500">
          TRUSTED BY HOTELS, RESORTS &amp; RESTAURANTS
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-charcoal to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-charcoal to-transparent" />

        <motion.div
          className="flex w-max gap-16"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          {loop.map((client, i) => (
            <span
              key={`${client}-${i}`}
              className="flex items-center gap-3 whitespace-nowrap text-2xl font-semibold tracking-wide text-neutral-500 transition-colors hover:text-gold-light"
            >
              <FaHotel className="text-lg text-gold/60" />
              {client}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
