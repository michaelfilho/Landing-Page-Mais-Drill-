import { Play, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const stories = [
  ["Luna", "A tigela ficou limpa em minutos.", "photo-1552053831-71594a27632d"],
  ["Bento", "Finalmente uma comida que ele ama.", "photo-1517849845537-4d257902454a"],
  ["Mel", "Mais energia e um pelo lindo.", "photo-1583337130417-3346a1be7dee"],
  ["Thor", "O caldo virou o momento favorito do dia.", "photo-1477884213360-7e9d7dcc1e48"],
];

export default function CustomerStories() {
  return <section className="bg-leaf py-24 text-white" data-testid="customer-stories">
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      <Reveal><p className="text-xs font-black uppercase tracking-[.3em] text-sun">Histórias reais</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-black tracking-tight sm:text-6xl">Quem experimenta, conta.</h2></Reveal>
      <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-5">
        {stories.map(([name, quote, photo], index) => <article key={name} className="relative min-w-[240px] snap-start overflow-hidden rounded-[2rem] border-2 border-white/70 bg-ink sm:min-w-[280px]">
          <img src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=600&q=80`} alt={`Cliente ${name}`} className="aspect-[9/14] w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
          <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-drill text-white"><Play className="h-5 w-5 fill-current" /></span>
          <div className="absolute inset-x-0 bottom-0 p-5"><div className="mb-2 flex text-sun">{[0,1,2,3,4].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-current" />)}</div><h3 className="font-display text-2xl font-black">{name}</h3><p className="mt-1 text-sm text-white/80">“{quote}”</p><span className="mt-3 inline-block rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest">Ver story</span></div>
        </article>)}
      </div>
    </div>
  </section>;
}
