import { useState } from "react";
import { CalendarClock, Check, CreditCard, Gift, Heart, RefreshCw, ShieldCheck, ShoppingBag, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, brl, productWithVariant } from "@/data/products";
import ProductMiniCalculator from "@/components/ProductMiniCalculator";
import { ProductPack } from "@/components/ProductPack";
import { useCart } from "@/context/CartContext";

const PLANS = [
  { key: "semanal", title: "Toda semana", detail: "Para uma rotina sempre abastecida", highlight: "12% OFF", discount: 0.12 },
  { key: "mensal", title: "Todo mês", detail: "Praticidade para o mês inteiro", highlight: "10% OFF", discount: 0.10 },
  { key: "anual", title: "Clube anual", detail: "Maior economia e cuidado contínuo", highlight: "18% OFF", discount: 0.18, best: true },
];

function SubscriptionProductCard({ product }) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id || "");
  const { add } = useCart();
  const variant = product.variants?.find((item) => item.id === variantId);
  const selected = productWithVariant(product, variant);
  const isFood = product.id === "alimentacao-natural";
  return <article className="flex flex-col rounded-[1.75rem] border border-ink/25 bg-white p-4 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-hover-drill">
    <div className="grid min-h-[104px] grid-cols-[76px_minmax(0,1fr)] items-center gap-4"><div className="flex h-24 w-[76px] items-center justify-center overflow-hidden rounded-2xl transition-colors duration-500" style={{backgroundColor:`${selected.color}18`}}><ProductPack {...selected} compact name={product.name} tag={variant?.label || product.tag} className="h-[78px] w-[54px] shadow-soft"/></div><div className="min-w-0"><span className="inline-flex rounded-full bg-sun px-2.5 py-1 text-[8px] font-black tracking-wide text-ink">ASSINATURA RECOMENDADA</span><h3 className="mt-2 font-display text-xl font-black leading-tight">{product.name}</h3><p className="mt-1 text-[11px] leading-snug text-stone2">{variant?.label || product.tag}</p></div></div>
    {product.variants && <div className="mt-3 flex flex-wrap gap-1.5">{product.variants.map((item)=><button key={item.id} onClick={()=>setVariantId(item.id)} className={`rounded-full border px-2 py-1 text-[9px] font-black ${variantId===item.id?"border-ink bg-ink text-white":"border-line bg-cream"}`}>{item.label}</button>)}</div>}
    {isFood ? <div className="mt-3"><ProductMiniCalculator product={selected}/></div> : <div className="mt-auto pt-5"><div className="flex items-center justify-between rounded-xl bg-sand/45 p-3"><div><span className="block text-[9px] font-black uppercase tracking-wide text-stone2">Assine este produto</span><strong className="font-display text-xl text-leaf">{brl(selected.price)}</strong></div><button onClick={()=>{add(selected);toast.success(`${selected.name} entrou no carrinho!`);}} className="flex h-9 items-center gap-1.5 rounded-full bg-leaf px-3 text-[10px] font-black text-white hover:bg-ink"><ShoppingBag className="h-3.5 w-3.5"/>ADICIONAR</button></div></div>}
  </article>;
}

export default function SubscriptionsPage() {
  return <main>
    <section className="relative overflow-hidden bg-leaf py-20 text-cream lg:py-28">
      <div className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 blob bg-sun/25"/>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-sun px-4 py-2 text-xs font-black text-ink shadow-hard"><Sparkles className="h-4 w-4"/>CLUBE MAIS DRILL</span>
        <h1 className="mt-7 max-w-4xl font-display text-5xl font-black leading-[0.92] tracking-tighter sm:text-7xl">Nunca deixe faltar cuidado, sabor e diversão.</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/80">Escolha a frequência, calcule a quantidade para o seu pet e receba automaticamente. Todo plano inclui um presente especial e personalizado.</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold">{["Não prende o limite do cartão", "Cobrança mensal", "Entrega personalizada", "Pause quando quiser"].map((text) => <span key={text} className="flex items-center gap-2 rounded-full border border-cream/25 bg-cream/10 px-4 py-2"><Check className="h-4 w-4 text-sun"/>{text}</span>)}</div>
      </div>
    </section>

    <section className="border-b border-line bg-white">
      <div className="mx-auto grid max-w-7xl gap-4 px-5 py-8 md:grid-cols-2 lg:px-8">
        <article className="flex gap-4 rounded-2xl bg-sand/55 p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-leaf text-white"><CreditCard className="h-5 w-5"/></span><div><h2 className="font-display text-lg font-black">Seu limite continua livre</h2><p className="mt-1 text-sm leading-relaxed text-stone2">A assinatura não compromete o valor total no limite do cartão. A cada mês, é cobrado somente o valor correspondente àquele ciclo.</p></div></article>
        <article className="flex gap-4 rounded-2xl bg-sun/20 p-5"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-drill text-white"><CalendarClock className="h-5 w-5"/></span><div><h2 className="font-display text-lg font-black">Você escolhe como receber</h2><p className="mt-1 text-sm leading-relaxed text-stone2">Receba tudo de uma vez ou defina quantas entregas deseja por dia, por semana ou por mês.</p></div></article>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
      <div className="text-center"><p className="text-xs font-black uppercase tracking-[.3em] text-drill">Escolha seu ritmo</p><h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">Planos para cada rotina</h2></div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">{PLANS.map((plan) => <article key={plan.key} className={`relative flex flex-col rounded-[2rem] border-2 p-6 ${plan.best ? "border-leaf bg-leaf text-white shadow-hard" : "border-ink bg-white"}`}>
        {plan.best && <span className="absolute -top-3 right-5 rounded-full bg-sun px-3 py-1 text-[10px] font-black text-ink">MELHOR ESCOLHA</span>}
        <span className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${plan.best ? "bg-white/15" : "bg-sand"}`}><RefreshCw className="h-5 w-5"/></span>
        <h3 className="mt-5 font-display text-2xl font-black">{plan.title}</h3><p className={`mt-1 text-sm ${plan.best ? "text-white/70" : "text-stone2"}`}>{plan.detail}</p>
        <strong className={`mt-6 block font-display text-4xl ${plan.best ? "text-sun" : "text-drill"}`}>{plan.highlight}</strong>
        <div className={`mt-4 rounded-2xl p-4 ${plan.best ? "bg-white/10" : "bg-sand/60"}`}><p className={`text-[10px] font-black uppercase tracking-[.14em] ${plan.best ? "text-white/60" : "text-stone2"}`}>A cada R$ 100 em produtos</p><div className="mt-2 flex items-end justify-between gap-3"><div><span className="block text-xs">Você economiza</span><strong className={`font-display text-2xl ${plan.best ? "text-sun" : "text-leaf"}`}>{brl(100 * plan.discount)}</strong></div><div className="text-right"><span className="block text-xs">Você paga</span><strong className="font-display text-lg">{brl(100 * (1-plan.discount))}</strong></div></div></div>
        <ul className="mt-5 space-y-2 text-sm font-bold"><li className="flex gap-2"><Gift className="h-5 w-5 shrink-0"/>Presente especial e personalizado</li><li className="flex gap-2"><ShieldCheck className="h-5 w-5 shrink-0"/>Pause ou cancele quando quiser</li><li className="flex gap-2"><Heart className="h-5 w-5 shrink-0"/>Quantidade sob medida</li></ul>
      </article>)}</div>
    </section>

    <section className="bg-sand py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="max-w-2xl"><p className="text-xs font-black uppercase tracking-[.3em] text-leaf">Calculadora por produto</p><h2 className="mt-3 font-display text-4xl font-black sm:text-5xl">Monte a assinatura certa</h2><p className="mt-4 text-stone2">Informe o peso do pet em cada produto, compare os ciclos e adicione a recomendação ao carrinho.</p></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{PRODUCTS.map((product) => <SubscriptionProductCard key={product.id} product={product}/>)}</div>
      </div>
    </section>

    <section className="mx-auto max-w-4xl px-5 py-16 text-center"><Gift className="mx-auto h-10 w-10 text-drill"/><h2 className="mt-4 font-display text-3xl font-black">Seu primeiro presente será só seu.</h2><p className="mx-auto mt-3 max-w-xl text-stone2">Depois da assinatura, nossa equipe usa as informações do seu pet para preparar uma surpresa especial e personalizada.</p><a href="/#matilha" className="mt-7 inline-flex rounded-full bg-drill px-7 py-3.5 font-black text-white shadow-hard">CADASTRAR MEU PET</a></section>
  </main>;
}
