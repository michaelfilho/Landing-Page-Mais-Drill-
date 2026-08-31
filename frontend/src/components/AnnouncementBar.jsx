import { Bone, Heart, Sparkles, Star, Truck } from "lucide-react";

const ITEMS = [
  { icon: Truck, text: "ENVIO PARA TODO O BRASIL" },
  { icon: Sparkles, text: "CUPOM BEMVINDO10 · 10% OFF NA PRIMEIRA COMPRA" },
  { icon: Bone, text: "PETISCOS FEITOS COM CARINHO" },
  { icon: Star, text: "NOVIDADE: DRILL POW! CHEGOU" },
  { icon: Heart, text: "APROVAÇÃO EM FORMA DE RABINHO ABANANDO" },
];

export default function AnnouncementBar() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="overflow-hidden bg-leaf py-2 text-cream"
      data-testid="announcement-bar"
      aria-label="Avisos e promoções"
    >
      <div className="marquee-track items-center gap-10">
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-10 pr-10" aria-hidden={half === 1}>
            {row.map(({ icon: Icon, text }, i) => (
              <span
                key={`${half}-${i}`}
                className="flex items-center gap-2.5 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.22em]"
              >
                <Icon className="h-3.5 w-3.5 text-sun" strokeWidth={2.5} />
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
