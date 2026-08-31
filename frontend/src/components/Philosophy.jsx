import { Check, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const IN = [
  "Proteína de verdade",
  "Ingredientes que você sabe pronunciar",
  "Sabor em primeiro lugar",
  "Carinho em cada lote",
];

const OUT = [
  "Corante artificial",
  "Conservante com nome de outro planeta",
  "Farinha de encher linguiça",
  "Enrolação no rótulo",
];

export default function Philosophy() {
  return (
    <section className="border-y-2 border-ink bg-sun py-24 lg:py-32" data-testid="philosophy-section">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-14">
          <h2 className="max-w-3xl font-display text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl">
            O que entra. <span className="text-drill">E o que a gente deixa de fora.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-ink/70 md:text-lg">
            Nossa filosofia cabe em duas listas. Se não é bom o bastante pro nosso dog,
            não é bom o bastante pro seu.
          </p>
        </Reveal>

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-[2rem] border-2 border-ink bg-cream p-8 shadow-hard lg:p-10" data-testid="philosophy-in">
              <h3 className="mb-7 font-display text-2xl font-extrabold uppercase tracking-tight">
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-leaf align-middle" />
                Pode entrar
              </h3>
              <ul className="flex flex-col gap-4">
                {IN.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-2xl bg-leaf/10 px-5 py-4 font-display text-lg font-extrabold"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-leaf">
                      <Check className="h-4 w-4 text-white" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="h-full rounded-[2rem] border-2 border-ink bg-ink p-8 text-cream shadow-hard lg:p-10" data-testid="philosophy-out">
              <h3 className="mb-7 font-display text-2xl font-extrabold uppercase tracking-tight">
                <span className="mr-2 inline-block h-3 w-3 rounded-full bg-drill align-middle" />
                Nem pensar
              </h3>
              <ul className="flex flex-col gap-4">
                {OUT.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-4 rounded-2xl bg-white/5 px-5 py-4 font-display text-lg font-extrabold text-cream/60"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-drill">
                      <X className="h-4 w-4 text-white" strokeWidth={3} />
                    </span>
                    <span className="line-through decoration-drill/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
