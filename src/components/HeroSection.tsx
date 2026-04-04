import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <div className="relative z-10 text-center px-6 max-w-3xl mt-32">
        <motion.p
          initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 200,
            damping: 12,
          }}
          className="font-beach-day text-white font-normal text-6xl md:text-8xl tracking-wider uppercase mb-4"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="inline-block"
          >
            {"Happy Bornday Rohini".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.span>
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-beach-day text-orange-300text-7xl md:text-5xl font-bold leading-tight mb-6"
        >
          Our Journey
          <br />
          <span className="italic font-normal">and the memories we shared</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-beach-day text-black text-xl md:text-2xl max-w-xl mx-auto mb-10"
        >
          Edho naaku vachinantha try chesa bro. I hope it makes your day a little brighter 😊❤️
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="animate-bounce"
        >
          <svg
            className="w-8 h-8 mx-auto text-white/60"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
