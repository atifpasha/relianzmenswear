import { motion } from 'framer-motion';
import { GiLabCoat, GiShirtButton, GiTrousers, GiChefToque, GiPirateCoat } from 'react-icons/gi';

const PRODUCTS = [
  {
    name: 'Chef Coats',
    tag: 'Kitchen Wear',
    desc: 'Double-breasted, heat-resistant coats built for long service hours.',
    icon: GiLabCoat,
    color: 'from-neutral-800 to-neutral-950',
  },
  {
    name: 'Staff Shirts',
    tag: 'Front & Back of House',
    desc: 'Crisp, breathable shirts tailored for all-day comfort on the floor.',
    icon: GiShirtButton,
    color: 'from-amber-900/60 to-neutral-950',
  },
  {
    name: 'Trousers & Pants',
    tag: 'Everyday Essentials',
    desc: 'Durable, stain-resistant fabrics that hold shape shift after shift.',
    icon: GiTrousers,
    color: 'from-slate-800 to-neutral-950',
  },
  {
    name: 'Aprons',
    tag: 'Kitchen & Service',
    desc: 'Reinforced stitching and adjustable straps for every kitchen station.',
    icon: GiChefToque,
    color: 'from-stone-800 to-neutral-950',
  },
  {
    name: 'Front-of-House Coats',
    tag: 'Hospitality Uniforms',
    desc: 'Sharp, branded coats that keep your front-of-house team guest-ready.',
    icon: GiPirateCoat,
    color: 'from-zinc-800 to-neutral-950',
  },
];

export default function Collection() {
  return (
    <section id="collection" className="relative bg-charcoal py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold tracking-[0.4em] text-gold-light">WHAT WE STITCH</p>
          <h2 className="mt-4 font-serif text-4xl font-medium text-white sm:text-5xl">
            Uniforms Built for <span className="text-gradient-gold italic">Every Shift</span>
          </h2>
          <p className="mt-4 text-neutral-400">
            Restaurant, hotel and resort workwear — tailored in-house and delivered in
            consistent quality, whatever the order size.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className={`group relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br ${item.color} p-6 shadow-xl`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,161,90,0.15),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-0 rounded-2xl border border-white/10 transition-colors group-hover:border-gold/50" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-3xl text-gold-light transition-transform group-hover:scale-110">
                  <item.icon />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold-light">{item.tag}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{item.desc}</p>
                  <span className="mt-4 inline-block w-fit border-b border-transparent text-sm text-neutral-300 transition-all group-hover:border-gold-light group-hover:text-gold-light">
                    Enquire for Bulk Order →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="group flex h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-gold/30 bg-ink/40 p-6 text-center transition-colors hover:border-gold"
          >
            <p className="text-lg font-semibold text-white">Need a Custom Uniform?</p>
            <p className="mt-2 text-sm text-neutral-400">
              We tailor colours, embroidery and fits to match your brand.
            </p>
            <span className="mt-4 font-semibold text-gold-light transition-colors group-hover:text-gold">
              Talk to Us →
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
