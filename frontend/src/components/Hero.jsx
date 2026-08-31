import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Bone, Sparkles } from "lucide-react";
import { Tilt } from "@/components/Tilt";
import { ProductPack } from "@/components/ProductPack";
import { scrollToId } from "@/lib/smooth";

const HERO_IMG =
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=80";

const LINES = ["Mais Sabor.", "Mais Diversão.", "Mais Drill."];

const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const packY = useTransform(scrollYProgress, [0, 1], [0, -70]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      data-testid="hero-section"
      aria-label="Apresentação Mais Drill"
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-[30rem] w-[30rem] blob bg-sun/70" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 blob-alt bg-sand" aria-hidden="true" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-24 pt-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pb-32 lg:pt-20">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-6">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-7 inline-flex w-fit -rotate-2 items-center gap-2 rounded-full border-2 border-ink bg-sun px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] shadow-hard"
            data-testid="hero-eyebrow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Natural de verdade · feito com carinho
          </motion.span>

          <h1 className="font-display text-[17vw] font-black leading-[0.92] tracking-tighter sm:text-7xl lg:text-[5.6rem]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1.5">
                <motion.span
                  className="block"
                  initial={{ y: "115%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.95, delay: 0.18 + i * 0.14, ease: EASE }}
                >
                  {i === 2 ? <span className="text-drill">{line}</span> : line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: EASE }}
            className="mt-6 max-w-md text-base font-medium leading-relaxed text-stone2 md:text-lg"
            data-testid="hero-subtitle"
          >
            Alimentação natural completa, caldo de ossos e ossos selecionados
            para uma rotina mais saudável, saborosa e feliz.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.86, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => scrollToId("#produtos")}
              data-testid="hero-cta-primary"
              className="group flex items-center gap-3 rounded-full bg-drill px-8 py-4.5 font-display text-lg font-extrabold text-white shadow-hard transition-all duration-200 hover:-translate-y-0.5 hover:bg-drill-dark active:scale-[0.97] py-4"
            >
              QUERO PRO MEU DOG
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
            <button
              onClick={() => scrollToId("#calculadora")}
              data-testid="hero-cta-secondary"
              className="rounded-full border-2 border-ink px-8 py-4 font-display text-lg font-extrabold transition-colors duration-200 hover:bg-ink hover:text-cream active:scale-[0.97]"
            >
              CALCULAR QUANTIDADE
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="mt-7 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-stone2"
          >
            <Bone className="h-4 w-4 text-drill" />
            A aprovação vem em forma de rabinho abanando
          </motion.p>
        </div>

        <div className="relative lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="relative mx-auto max-w-lg"
          >
            <motion.div style={{ y: imgY }} className="relative">
              <img
                src={HERO_IMG}
                alt="Cachorro feliz saltando para pegar um petisco Mais Drill"
                className="aspect-[4/5] w-full rounded-[3rem] rounded-tr-[7rem] border-2 border-ink object-cover shadow-hard"
                fetchPriority="high"
                loading="eager"
                width="1200"
                height="1500"
                data-testid="hero-image"
              />
            </motion.div>

            <motion.div
              style={{ y: packY }}
              className="absolute -bottom-8 -left-6 sm:-left-12"
            >
              <Tilt className="animate-float">
                <ProductPack
                  color="#E3313D"
                  ink="#FFFFFF"
                  name={"CARNE DE\nPANELA"}
                  tag="alimentação natural"
                  weight="300g"
                  className="h-60 w-44 shadow-hard"
                />
              </Tilt>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200, damping: 14 }}
              className="absolute -right-5 -top-7 sm:-right-8"
              data-testid="hero-rotating-badge"
            >
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-cream shadow-soft sm:h-32 sm:w-32">
                <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
                  <defs>
                    <path id="circlePath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                  </defs>
                  <text className="fill-ink font-display text-[10.5px] font-bold" style={{ letterSpacing: "0.22em" }}>
                    <textPath href="#circlePath">MAIS DRILL · MAIS SABOR · MAIS DIVERSÃO ·</textPath>
                  </text>
                </svg>
                <Bone className="h-8 w-8 text-drill" strokeWidth={2.2} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
