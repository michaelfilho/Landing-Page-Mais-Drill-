import { Dog, Flame, Leaf, Truck } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const BENEFITS = [
  { icon: Leaf, title: "Ingredientes selecionados", sub: "Nada que você não reconheça" },
  { icon: Flame, title: "Muito mais sabor", sub: "Coisa boa se reconhece de longe" },
  { icon: Dog, title: "Feito pra cães de verdade", sub: "Textura, cheiro e tamanho certos" },
  { icon: Truck, title: "Entrega pra todo o Brasil", sub: "O rabinho não sabe esperar" },
];

export default function BenefitStrip() {
  return (
    <section
      className="border-y-2 border-ink bg-sun"
      data-testid="benefit-strip"
      aria-label="Benefícios Mais Drill"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {BENEFITS.map(({ icon: Icon, title, sub }, i) => (
          <Reveal key={title} delay={i * 0.08}>
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 -rotate-3 items-center justify-center rounded-2xl border-2 border-ink bg-cream shadow-hard">
                <Icon className="h-5.5 w-5.5 h-5 w-5 text-drill" strokeWidth={2.3} />
              </span>
              <div>
                <p className="font-display text-lg font-extrabold leading-tight">{title}</p>
                <p className="mt-1 text-sm font-medium text-ink/60">{sub}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
