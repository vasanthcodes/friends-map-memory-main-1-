import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import HeroSection from "@/components/HeroSection";
import PlaceCard from "@/components/PlaceCard";
import Footer from "@/components/Footer";
import { places } from "@/data/places";
import CountdownPage from "@/pages/CountdownPage";
import wishesBackground from "@/assets/Goa/wishes page background.mp4";

const TARGET_DATE = new Date("2026-04-18T00:00:00+08:00");

const fireConfetti = () => {
  const duration = 2000;
  const end = Date.now() + duration;

  const burst = () => {
    confetti({ particleCount: 40, spread: 80, origin: { x: Math.random(), y: Math.random() * 0.6 }, colors: ["#ff69b4", "#ffd700", "#ff6347", "#7b68ee", "#00ced1"] });
    if (Date.now() < end) requestAnimationFrame(burst);
  };
  burst();

  // Big side cannons
  confetti({ particleCount: 80, angle: 60, spread: 50, origin: { x: 0, y: 0.7 }, colors: ["#ff69b4", "#ffd700", "#ff6347"] });
  confetti({ particleCount: 80, angle: 120, spread: 50, origin: { x: 1, y: 0.7 }, colors: ["#7b68ee", "#00ced1", "#ffd700"] });
};

const Index = () => {
  const [revealed, setRevealed] = useState(() => new Date() >= TARGET_DATE);
  const handleComplete = useCallback(() => {
    setRevealed(true);
    setTimeout(fireConfetti, 300);
  }, []);

  // Initialize audio for wishes page
  useEffect(() => {
    if (revealed) {
      const audio = new Audio("/audio/Iris - The Goo Goo Dolls.mp3");
      audio.loop = true;
      audio.volume = 0.3;

      // Play audio on user interaction
      const playAudio = () => {
        audio.play().catch(() => { });
        document.removeEventListener('click', playAudio);
        document.removeEventListener('touchstart', playAudio);
      };

      document.addEventListener('click', playAudio);
      document.addEventListener('touchstart', playAudio);

      return () => {
        audio.pause();
        document.removeEventListener('click', playAudio);
        document.removeEventListener('touchstart', playAudio);
      };
    }
  }, [revealed]);

  return (
    <AnimatePresence mode="wait">
      {!revealed ? (
        <motion.div key="countdown" exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.5 }}>
          <CountdownPage onComplete={handleComplete} />
        </motion.div>
      ) : (
        <motion.main
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen relative"
        >
          {/* Video Background */}
          <div className="fixed inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={wishesBackground} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Content with blur backdrop */}
          <div className="relative z-10 backdrop-blur-sm">
            <HeroSection />
            <div className="flex items-center justify-center py-12">
              <div className="h-px w-16 bg-white/30" />
              <span className="px-4 font-display text-lg italic text-white/90">
                Our Stops
              </span>
              <div className="h-px w-16 bg-white/30" />
            </div>
            <section className="px-6 pb-20">
              <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {places.map((place, index) => (
                  <PlaceCard key={place.id} place={place} index={index} />
                ))}
              </div>
            </section>
            <Footer />
          </div>
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Index;
