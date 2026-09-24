# Relianz Men's Wear

Landing page for Relianz Men's Wear — a B2B tailoring business that stitches
chef coats, staff shirts, trousers and aprons for restaurants, hotels and
resorts. Built as a single-page site with an animated hero, brand story,
product showcase, client logos, customer reviews and a bulk-order enquiry form.

## Stack

- [Vite](https://vite.dev/) + React + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for scroll/entrance animations
- [tsParticles](https://particles.js.org/) for the interactive animated hero background
- [react-icons](https://react-icons.github.io/react-icons/) for iconography

## Getting Started

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173/ by default.

## Building for Production

```bash
npm run build
```

Output is generated in `dist/`.

## Project Structure

```
src/
  components/
    Navbar.tsx            Sticky nav with mobile menu
    Hero.tsx               Animated hero with particle background & stats
    ParticleBackground.tsx Interactive tsParticles field used behind the hero
    About.tsx               Brand story + feature cards
    Collection.tsx          Signature product showcase
    Clients.tsx             Scrolling "trusted by" marquee
    Testimonials.tsx        Auto-rotating customer review carousel
    Contact.tsx             Contact form (opens the user's email client via mailto)
    Footer.tsx              Site footer with links & newsletter signup
  App.tsx                  Composes all sections
  main.tsx                 App entry, wraps the tree in ParticlesProvider
  index.css                Tailwind import + theme tokens
```

## Notes

- The contact form currently opens the visitor's email client via a `mailto:`
  link (no backend yet). Update the `CONTACT_EMAIL` constant in
  `src/components/Contact.tsx` with your real inbox address. When a backend
  is added later, swap the `handleSubmit` logic for an API call.
- Update the placeholder phone/address/social links in `Contact.tsx` and
  `Footer.tsx` with real business details before launch.
