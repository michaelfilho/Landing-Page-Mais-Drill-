import { PawPrint } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function About() {
  return (
    <section id="sobre" className="border-y-2 border-ink bg-sand py-24 lg:py-32" data-testid="about-section">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <Reveal>
          <div className="relative">
            <div className="absolute -right-5 -top-5 h-full w-full rounded-[2.5rem] border-2 border-ink bg-drill" aria-hidden="true" />
            <img
              src="https://images.unsplash.com/photo-1546238232-20216dec9f72?auto=format&fit=crop&w=1000&q=80"
              alt="Tutora abraçada com seu cachorro no sofá"
              loading="lazy"
              width="1000"
              height="800"
              className="relative aspect-[5/4] w-full rounded-[2.5rem] border-2 border-ink object-cover"
            />
            <span className="absolute -bottom-5 left-8 flex rotate-[-3deg] items-center gap-2 rounded-full border-2 border-ink bg-sun px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-widest shadow-hard">
              <PawPrint className="h-4 w-4" />
              feito por gente que ama dog
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-drill">
            Nossa história
          </p>
          <h2 className="font-display text-4xl font-black leading-[1.02] tracking-tighter sm:text-5xl">
            A Mais Drill nasceu de um rabinho abanando.
          </h2>
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-ink/75 md:text-lg">
            <p>
              Tudo começou na cozinha de casa, com um dog muito exigente e uma
              prateleira de petiscos que ele ignorava solenemente. A gente
              percebeu que faltava no mercado um petisco que fosse gostoso de
              verdade — e que a gente tivesse orgulho de oferecer.
            </p>
            <p>
              Então decidimos fazer o nosso: ingredientes selecionados, sabor
              em primeiro lugar e zero enrolação. O primeiro teste foi aprovado
              com latidos. O resto é história.
            </p>
          </div>
          <p className="mt-8 font-display text-2xl font-extrabold italic text-drill">
            — Equipe Mais Drill
          </p>
          <p className="mt-2 text-xs font-semibold text-stone2" data-testid="about-disclaimer">
            História provisória — será substituída pelo relato real dos fundadores.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
