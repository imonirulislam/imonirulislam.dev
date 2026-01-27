"use client";

import { useHomeLogic } from "@/hooks/use-home-logic";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { TechStack } from "@/components/sections/tech-stack";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Footer } from "@/components/footer";
import { Preloader } from "@/components/preloader";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { loading, handleLoadingComplete } = useHomeLogic();

  return (
    <>
      <Preloader onComplete={handleLoadingComplete} />
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex min-h-screen flex-col"
          >
            <Navbar />
            <main className="flex-1">
              <Hero />
              <TechStack />
              <Experience />
              <Projects />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
