import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { scrollToId } from "@/lib/smooth";

const CHAPTERS = [
  {
    n: "01",
    title: "Ele não é só um cachorro.",
    text: "É o alarme que não precisa de pilha. O melhor amigo que comemora até quando você só foi ali buscar água.",
  },
  {
    n: "02",
    title: "E você sabe disso.",
    text: "Por isso cada agrado importa. Não é sobre petisco — é sobre os cinco segundos de pura alegria que ele devolve multiplicado.",
  },
  {
    n: "03",
    title: "A gente leva isso a sério.",
    text: "A Mais Drill existe pra transformar qualquer terça-feira comum no melhor dia da vida dele. De novo. E de novo.",
  },
];

export default function Manifesto() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32" data-testid="manifesto-section">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal className="lg:sticky lg:top-32">
            <div className="relative">
              <div className="absolute -left-6 -top-6 h-full w-full blob bg-sun" aria-hidden="true" />
              <img
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1000&q=80"
                alt="Mão do tutor tocando a patinha do cachorro"
                className="relative aspect-[4/5] w-full rotate-[-2deg] rounded-[2.5rem] rounded-bl-[6rem] border-2 border-ink object-cover shadow-hard"
                loading="lazy"
                width="1000"
                height="1250"
              />
              <span className="absolute -bottom-5 right-6 rotate-6 rounded-full border-2 border-ink bg-drill px-5 py-2.5 font-display text-sm font-extrabold uppercase tracking-widest text-white shadow-hard">
                família de 4 patas
              </span>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col justify-center gap-14 lg:col-span-7 lg:pl-8">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.1}>
              <div className="flex gap-6 border-b border-line pb-12 last:border-0 last:pb-0">
                <span className="text-stroke-drill font-display text-6xl font-black leading-none md:text-7xl">
                  {c.n}
                </span>
                <div>
                  <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-stone2 md:text-lg">
                    {c.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <button
              onClick={() => scrollToId("#sobre")}
              data-testid="manifesto-cta"
              className="group mt-2 inline-flex w-fit items-center gap-3 font-display text-lg font-extrabold text-drill"
            >
              Conheça a nossa história
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-drill transition-all duration-300 group-hover:bg-drill group-hover:text-white">
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
