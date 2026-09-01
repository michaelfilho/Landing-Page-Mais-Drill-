import { useMemo, useState } from "react";
import { Calculator, Gift, ShoppingBag } from "lucide-react";
import { PRODUCTS, SUBSCRIPTIONS, brl } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function PetCalculator() {
  const [weight, setWeight] = useState(10);
  const [activity, setActivity] = useState(1);
  const [cycle, setCycle] = useState("mensal");
  const { add, setSubscription } = useCart();
  const result = useMemo(() => {
    const grams = Math.max(100, Math.round((weight * 28 * activity) / 10) * 10);
    const packs = Math.ceil((grams * 30) / 300);
    const product = PRODUCTS[0];
    const full = packs * product.price;
    const total = full * (1 - SUBSCRIPTIONS[cycle].discount);
    return { grams, packs, product, full, total };
  }, [weight, activity, cycle]);
  const choose = () => { setSubscription(cycle); add(result.product, result.packs); };
  return <section id="calculadora" className="bg-sand py-24" data-testid="pet-calculator">
    <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
      <div><span className="flex h-14 w-14 items-center justify-center rounded-full bg-sun text-ink shadow-hard"><Calculator /></span><p className="mt-7 text-xs font-black uppercase tracking-[.3em] text-drill">Plano sob medida</p><h2 className="mt-3 font-display text-4xl font-black sm:text-6xl">Quanto seu dog precisa?</h2><p className="mt-4 max-w-lg text-stone2">Esta é uma estimativa inicial. Necessidades variam por idade, condição corporal e orientação veterinária.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="font-bold">Peso do pet (kg)<input type="number" min="1" max="80" value={weight} onChange={(e) => setWeight(Number(e.target.value) || 1)} className="mt-2 w-full rounded-2xl border-2 border-ink bg-white px-4 py-3" /></label><label className="font-bold">Nível de atividade<select value={activity} onChange={(e) => setActivity(Number(e.target.value))} className="mt-2 w-full rounded-2xl border-2 border-ink bg-white px-4 py-3"><option value="0.85">Tranquilo</option><option value="1">Moderado</option><option value="1.2">Muito ativo</option></select></label></div>
        <div className="mt-6"><p className="mb-3 font-bold">Escolha seu plano</p><div className="grid grid-cols-2 gap-2">{["mensal","trimestral","semestral","anual"].map((key) => <button key={key} onClick={() => setCycle(key)} className={`rounded-2xl border-2 px-3 py-3 text-sm font-extrabold capitalize ${cycle === key ? "border-leaf bg-leaf text-white" : "border-line bg-white"}`}>{key}</button>)}</div><p className="mt-2 text-xs text-stone2">Em qualquer plano, sempre chega a quantidade ideal pra dar por mês.</p></div>
      </div>
      <div className="rounded-[2.5rem] border-2 border-ink bg-white p-7 shadow-hard lg:p-10"><p className="text-xs font-black uppercase tracking-[.25em] text-leaf">Recomendação estimada</p><div className="mt-6 flex items-end justify-between border-b border-line pb-6"><div><strong className="font-display text-5xl font-black text-drill">{result.grams}g</strong><p className="text-stone2">por dia</p></div><div className="text-right"><strong className="font-display text-3xl font-black">{result.packs}</strong><p className="text-sm text-stone2">pacotes por ciclo</p></div></div><h3 className="mt-6 font-display text-2xl font-black">Kit Alimentação Natural</h3><p className="mt-2 text-stone2">Quantidade calculada para manter a rotina sem faltar comida.</p><div className="mt-5 rounded-2xl bg-sand p-4"><div className="flex justify-between"><span>Valor avulso</span><span className="line-through">{brl(result.full)}</span></div><div className="mt-2 flex justify-between font-black text-leaf"><span>Com assinatura</span><span>{brl(result.total)}</span></div></div><div className="mt-5 flex gap-3 rounded-2xl bg-sun/30 p-4"><Gift className="shrink-0 text-drill" /><p className="text-sm"><strong>Brinde no primeiro ciclo:</strong> assinantes recebem um osso natural surpresa.</p></div><p className="mt-4 text-xs leading-relaxed text-stone2"><strong>Importante:</strong> a assinatura não consome o limite total do cartão. O valor do ciclo é debitado uma vez por mês. Planos podem ser pausados ou cancelados.</p><button onClick={choose} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-drill px-6 py-4 font-display text-lg font-black text-white shadow-hard"><ShoppingBag className="h-5 w-5" />ADICIONAR PLANO</button></div>
    </div>
  </section>;
}
