import { CalendarCheck, CircleCheck, Quote, Stethoscope, Utensils } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import TransitionBot from "@/components/TransitionBot";

const STEPS = [
  { title: "Dias 1–3", detail: "25% natural + 75% ração. Só pra apresentar o novo cheiro e sabor.", icon: Utensils },
  { title: "Dias 4–6", detail: "50% natural + 50% ração. O organismo já começa a se adaptar.", icon: CalendarCheck },
  { title: "Dias 7–9", detail: "75% natural + 25% ração. Quase lá, de olho nas fezes e no apetite.", icon: CircleCheck },
  { title: "Dia 10+", detail: "100% natural. Transição completa, sem susto pra barriga.", icon: Stethoscope },
];

export default function TransitionPage() {
  return (
    <main>
      <div className="bg-leaf px-5 py-20 text-center text-white">
        <p className="text-xs font-black uppercase tracking-[.3em] text-sun">Transição alimentar</p>
        <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl font-black sm:text-7xl">Da ração pro natural, sem estressar o dog.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80">Um plano gradual de 10 dias pra trocar a ração pelo alimento natural sem desconforto digestivo — e um assistente ao lado pra calcular a quantidade certa pro seu pet.</p>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <Reveal>
              <p className="text-xs font-black uppercase tracking-[.3em] text-drill">Por que ir aos poucos</p>
              <h2 className="mt-3 font-display text-3xl font-black sm:text-5xl">O intestino do seu dog precisa de tempo.</h2>
              <p className="mt-4 max-w-xl text-stone2">Trocar a alimentação de uma vez pode causar diarreia, vômito e recusa. A flora intestinal do cão se adapta aos poucos a novas fontes de proteína e fibra — por isso a transição gradual é o caminho mais seguro e com mais chance de sucesso.</p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {STEPS.map(({ title, detail, icon: Icon }, i) => (
                <Reveal key={title} delay={i * 0.08}>
                  <article className="h-full rounded-[1.75rem] border-2 border-ink bg-white p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-sun text-ink"><Icon className="h-5 w-5" /></span>
                    <h3 className="mt-4 font-display text-xl font-black">{title}</h3>
                    <p className="mt-1.5 text-sm text-stone2">{detail}</p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <blockquote className="relative mt-10 rounded-[2rem] border-2 border-ink bg-sand p-7 sm:p-9" data-testid="specialist-testimonial">
                <Quote className="h-8 w-8 text-drill" />
                <p className="mt-3 font-display text-xl font-bold leading-snug sm:text-2xl">“A transição gradual é o principal fator que determina se um cão vai aceitar bem a alimentação natural. Dez dias, respeitando as proporções, evita quase todos os desconfortos digestivos que vejo no consultório.”</p>
                <footer className="mt-5 flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-leaf text-white"><Stethoscope className="h-6 w-6" /></span>
                  <div><strong className="block font-display text-base font-black">Dra. Camila Andrade</strong><span className="text-sm text-stone2">Médica-veterinária, especialista em nutrição animal</span></div>
                </footer>
              </blockquote>
            </Reveal>
          </div>

          <div className="lg:sticky lg:top-24 lg:h-[640px]">
            <TransitionBot />
          </div>
        </div>
      </section>
    </main>
  );
}
