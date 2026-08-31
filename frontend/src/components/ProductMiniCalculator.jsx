import { useMemo, useState } from "react";
import { Calculator, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { SUBSCRIPTIONS, brl } from "@/data/products";
import { useCart } from "@/context/CartContext";

const CYCLES = { semanal: 7, mensal: 30, anual: 30 };

function calculate(product, weight, cycle) {
  const days = CYCLES[cycle];
  const productType = product.baseId || product.id;
  if (productType === "alimentacao-natural") {
    const daily = Math.max(100, Math.round((weight * 28) / 10) * 10);
    return { quantity: Math.ceil((daily * days) / 300), detail: `${daily}g por dia` };
  }
  if (productType === "caldo-de-ossos") {
    const serving = Math.max(30, Math.round((weight * 4) / 10) * 10);
    return { quantity: Math.ceil((serving * days) / 300), detail: `${serving}ml por dia` };
  }
  const weekly = weight < 10 ? 2 : weight <= 25 ? 3 : 4;
  return { quantity: Math.ceil(weekly * (days / 7)), detail: `${weekly} unidades por semana` };
}

export default function ProductMiniCalculator({ product, featured = false }) {
  const [weight, setWeight] = useState(10);
  const [cycle, setCycle] = useState("mensal");
  const [deliveryMode, setDeliveryMode] = useState("all");
  const [deliveryCount, setDeliveryCount] = useState(1);
  const { add, setSubscription } = useCart();
  const result = useMemo(() => calculate(product, weight, cycle), [product, weight, cycle]);
  const full = result.quantity * product.price;
  const total = full * (1 - SUBSCRIPTIONS[cycle].discount);
  const delivery = deliveryMode === "all" ? "Tudo de uma vez" : `${deliveryCount}x por ${deliveryMode === "day" ? "dia" : deliveryMode === "week" ? "semana" : "mês"}`;

  const choose = () => {
    setSubscription(cycle);
    add(product, result.quantity, { delivery });
    toast.success(`${result.quantity} unidades adicionadas no ${SUBSCRIPTIONS[cycle].label.toLowerCase()}!`);
  };

  return <div className={`${featured ? "rounded-2xl p-5" : "rounded-xl p-3"} border transition-colors duration-500`} style={{backgroundColor:product.color,color:product.ink,borderColor:product.ink,backgroundImage:"linear-gradient(135deg, rgba(255,255,255,.16), transparent 65%)",boxShadow:featured?`5px 5px 0 ${product.ink}`:"none"}}>
    <div className="flex items-center justify-between gap-2"><p className={`flex items-center gap-1.5 font-black uppercase tracking-[0.14em] ${featured ? "text-sm" : "text-[10px]"}`}><Calculator className={featured?"h-5 w-5":"h-3.5 w-3.5"}/>Calcule seu plano</p><span className={`${featured ? "px-3 py-1 text-[10px]" : "px-2 py-0.5 text-[8px]"} rounded-full font-black`} style={{backgroundColor:product.ink,color:product.color}}>ATÉ 18% OFF</span></div>
    <div className="mt-2 flex gap-2">
      <label className={`flex ${featured ? "h-11 w-[112px] px-3 text-xs" : "h-9 w-[92px] px-2 text-[10px]"} shrink-0 items-center rounded-lg border border-line bg-white font-bold text-stone2`}><input type="number" min="1" max="80" value={weight} onChange={(event) => setWeight(Number(event.target.value) || 1)} className={`${featured?"w-12 text-base":"w-9 text-sm"} bg-transparent text-center font-black text-ink outline-none`} aria-label={`Peso do pet para ${product.name}`}/>kg</label>
      <select value={cycle} onChange={(event) => setCycle(event.target.value)} className={`${featured?"h-11 px-3 text-sm":"h-9 px-2 text-xs"} min-w-0 flex-1 rounded-lg border border-line bg-white font-bold text-ink outline-none focus:border-leaf`} aria-label={`Plano para ${product.name}`}><option value="semanal">Semanal · 12%</option><option value="mensal">Mensal · 10%</option><option value="anual">Anual · 18%</option></select>
    </div>
    <div className="mt-2 flex gap-2">
      <select value={deliveryMode} onChange={(event) => setDeliveryMode(event.target.value)} className={`${featured?"h-10 px-3 text-xs":"h-8 px-2 text-[10px]"} min-w-0 flex-1 rounded-lg border border-line bg-white font-bold text-ink outline-none focus:border-leaf`} aria-label={`Forma de entrega para ${product.name}`}><option value="all">Receber tudo de uma vez</option><option value="day">Receber por dia</option><option value="week">Receber por semana</option><option value="month">Receber por mês</option></select>
      {deliveryMode !== "all" && <label className="flex h-8 w-[72px] items-center rounded-lg border border-line bg-white px-2 text-[9px] font-bold text-stone2"><input type="number" min="1" max="30" value={deliveryCount} onChange={(event) => setDeliveryCount(Math.max(1, Number(event.target.value) || 1))} className="w-8 bg-transparent text-center text-xs font-black text-ink outline-none" aria-label="Quantidade de entregas"/>vezes</label>}
    </div>
    <div className={`${featured?"p-4":"p-2.5"} mt-2 flex items-center gap-2 rounded-xl bg-white text-ink shadow-sm`}>
      <div className="min-w-0 flex-1"><div className="flex items-baseline gap-1.5"><strong className={`font-display leading-none text-drill ${featured?"text-2xl":"text-lg"}`}>{result.quantity} un.</strong><span className={`${featured?"text-xs":"text-[9px]"} truncate text-stone2`}>{result.detail}</span></div><div className={`${featured?"text-xs":"text-[10px]"} mt-1 flex items-center gap-2`}><span className="text-stone2 line-through">{brl(full)}</span><strong className={featured?"text-base text-leaf":"text-xs text-leaf"}>{brl(total)}</strong></div></div>
      <button onClick={choose} className={`${featured?"h-11 px-5 text-xs":"h-9 px-3 text-[10px]"} flex shrink-0 items-center gap-1.5 rounded-full font-black transition-all hover:scale-[1.03] active:scale-95`} style={{backgroundColor:product.ink,color:product.color}}><ShoppingBag className={featured?"h-4 w-4":"h-3.5 w-3.5"}/>ASSINAR</button>
    </div>
    <p className={`${featured?"mt-3 text-[10px]":"mt-1.5 text-[8px]"} text-center leading-tight opacity-75`}>Estimativa inicial · confirme com seu veterinário.</p>
  </div>;
}
