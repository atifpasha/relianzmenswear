import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Collection from './components/Collection';
import Testimonials from './components/Testimonials';
import Clients from './components/Clients';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Collection />
        <Clients />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
