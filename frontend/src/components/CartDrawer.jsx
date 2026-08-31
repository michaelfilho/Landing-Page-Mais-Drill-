import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Gift, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { SUBSCRIPTIONS, brl } from "@/data/products";

function OpeningGift() {
  const confetti = [
    { x: -15, y: -15, color: "bg-drill", rotate: -35 },
    { x: 0, y: -19, color: "bg-sun", rotate: 15 },
    { x: 15, y: -14, color: "bg-leaf", rotate: 45 },
    { x: -20, y: -4, color: "bg-sun", rotate: 70 },
    { x: 20, y: -2, color: "bg-drill", rotate: -60 },
  ];

  return <motion.span className="relative mr-1 inline-flex h-9 w-9 shrink-0 items-end justify-center" initial="closed" animate="open" aria-hidden="true">
    {confetti.map((piece, index) => <motion.i key={index} className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-sm ${piece.color}`} variants={{closed:{x:-3,y:2,scale:0,opacity:0},open:{x:piece.x,y:piece.y,scale:[0,1.2,1],opacity:[0,1,0]}}} transition={{duration:1.15,delay:0.42+index*0.05,ease:"easeOut"}} style={{rotate:piece.rotate}}/>)}
    <motion.span className="relative block h-5 w-7 rounded-b-md bg-leaf shadow-sm" variants={{closed:{scaleY:0.85},open:{scaleY:[0.85,1.08,1]}}} transition={{duration:0.45,delay:0.15}}>
      <span className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-sun"/>
    </motion.span>
    <motion.span className="absolute bottom-[18px] left-1/2 h-2.5 w-8 -translate-x-1/2 rounded-sm bg-leaf" variants={{closed:{y:5,rotate:0},open:{y:[5,-9,-6],rotate:[0,-14,-10]}}} transition={{duration:0.65,delay:0.18,ease:[0.22,1,0.36,1]}}>
      <span className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-sun"/>
      <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-full rotate-[-24deg] rounded-full border-2 border-sun"/>
      <span className="absolute -top-1.5 left-1/2 h-3 w-3 rotate-[24deg] rounded-full border-2 border-sun"/>
    </motion.span>
  </motion.span>;
}

export default function CartDrawer() {
  const { open, closeCart, items, setQty, remove, count, subtotal, discount, total, waUrl, subscription, setSubscription } = useCart();
  const freeShipping = 199;
  const remaining = Math.max(0, freeShipping - total);
  const progress = Math.min(100, (total / freeShipping) * 100);

  return <AnimatePresence>{open && <>
    <motion.div className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={closeCart}/>
    <motion.aside className="fixed right-0 top-0 z-[80] flex h-full w-full max-w-[520px] flex-col bg-cream shadow-2xl" initial={{x:"100%"}} animate={{x:0}} exit={{x:"100%"}} transition={{type:"spring",stiffness:280,damping:32}} role="dialog" aria-label="Carrinho de compras">
      <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf text-white"><ShoppingBag className="h-5 w-5"/></span><div><h2 className="font-display text-2xl font-black leading-tight">Seu Carrinho</h2><p className="text-sm text-stone2">{count} {count === 1 ? "item adicionado" : "itens adicionados"}</p></div></div>
        <button onClick={closeCart} className="rounded-full p-2 transition-colors hover:bg-sand" aria-label="Fechar"><X className="h-6 w-6"/></button>
      </header>

      {items.length > 0 && <div className="border-b border-line px-5 py-3.5 sm:px-6">
        <div className="flex items-center justify-between gap-3 text-sm font-bold"><span className="flex items-center gap-2">{remaining > 0 ? <><Truck className="h-5 w-5 shrink-0 text-leaf"/>Faltam <strong>{brl(remaining)}</strong> para frete grátis</> : <motion.span key="free-shipping-gift" className="flex items-center" initial={{scale:0.94,opacity:0}} animate={{scale:1,opacity:1}} transition={{duration:0.35}}><OpeningGift/><span>Você ganhou frete grátis!</span></motion.span>}</span><motion.strong className="text-leaf" animate={progress === 100 ? {scale:[1,1.18,1]} : {scale:1}} transition={{duration:0.55,delay:0.5}}>{Math.round(progress)}%</motion.strong></div>
        <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-line"><motion.div className="h-full rounded-full bg-drill" animate={{width:`${progress}%`}} transition={{duration:0.45,ease:"easeOut"}}/></div>
      </div>}

      <div className="flex-1 overflow-y-auto p-5 sm:p-6">{items.length === 0 ?
        <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag className="h-14 w-14 text-line"/><h3 className="mt-4 font-display text-xl font-black">Seu carrinho está esperando.</h3><button onClick={closeCart} className="mt-5 rounded-full bg-drill px-6 py-3 text-sm font-bold text-white">CONTINUAR COMPRANDO</button></div>
        : <>
          <ul className="space-y-3">{items.map((item) => <li key={item.id} className="grid grid-cols-[76px_minmax(0,1fr)_auto] gap-3 rounded-2xl border border-line bg-white p-3.5 shadow-soft">
            <div className="flex items-center justify-center rounded-xl" style={{backgroundColor:`${item.color}25`}}><span className="h-14 w-10 rounded-lg" style={{backgroundColor:item.color}}/></div>
            <div className="min-w-0"><h3 className="truncate font-display text-base font-black">{item.name}</h3><p className="truncate text-xs text-stone2">{item.tag}</p>{item.delivery && <p className="mt-1 truncate text-[10px] font-bold text-leaf">Entrega: {item.delivery}</p>}<div className="mt-2 inline-flex items-center rounded-full border border-line"><button onClick={() => setQty(item.id,item.qty-1)} className="p-1.5" aria-label={`Diminuir quantidade de ${item.name}`}><Minus className="h-3.5 w-3.5"/></button><strong className="w-7 text-center text-sm">{item.qty}</strong><button onClick={() => setQty(item.id,item.qty+1)} className="p-1.5" aria-label={`Aumentar quantidade de ${item.name}`}><Plus className="h-3.5 w-3.5"/></button></div></div>
            <div className="flex flex-col items-end justify-between"><button onClick={() => remove(item.id)} className="rounded-full p-1 text-stone2 transition-colors hover:bg-sand hover:text-drill" aria-label={`Remover ${item.name}`}><Trash2 className="h-4 w-4"/></button><strong className="whitespace-nowrap font-display text-base">{brl(item.price*item.qty)}</strong></div>
          </li>)}</ul>

          <section className="mt-4 rounded-2xl border-2 border-leaf bg-white p-4">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-leaf"/><h3 className="font-display text-lg font-black">Economize assinando</h3></div>
            <div className="mt-3 flex items-start gap-2 rounded-xl bg-sun/25 px-3 py-2.5 text-sm font-bold text-ink"><Gift className="mt-0.5 h-5 w-5 shrink-0 text-drill"/><p>Assine qualquer plano e ganhe um presente especial e personalizado!</p></div>
            <div className="mt-3 grid grid-cols-2 gap-2">{Object.entries(SUBSCRIPTIONS).map(([key,plan]) => <button key={key} onClick={() => setSubscription(key)} className={`rounded-xl border-2 p-2.5 text-left transition-colors ${subscription===key?"border-leaf bg-leaf text-white":"border-line hover:border-leaf"}`}><strong className="block text-sm">{plan.label}</strong>{plan.discount>0&&<span className="text-xs">Economize {plan.discount*100}%</span>}</button>)}</div>
            <p className="mt-3 text-[11px] leading-relaxed text-stone2"><strong>Sem ocupar o limite:</strong> o plano não compromete o limite anual do cartão. O valor é debitado mensalmente. Pause ou cancele quando quiser.</p>
          </section>
        </>}
      </div>

      {items.length > 0 && <footer className="border-t border-line bg-white px-5 py-4 sm:px-6">
        <div className="space-y-1.5 text-xs"><div className="flex justify-between"><span>Subtotal</span><span>{brl(subtotal)}</span></div>{discount>0&&<div className="flex justify-between font-bold text-leaf"><span>Desconto da assinatura</span><span>− {brl(discount)}</span></div>}<div className="flex justify-between"><span>Frete</span><span className="text-leaf">Calculado no checkout</span></div></div>
        <div className="mt-2.5 flex items-end justify-between border-t border-line pt-3"><strong className="font-display text-xl">Total estimado</strong><strong className="font-display text-2xl text-drill">{brl(total)}</strong></div>
        <a href={waUrl} target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-drill px-5 py-3.5 font-display text-base font-black text-white shadow-soft transition-colors hover:bg-drill-dark">FINALIZAR COMPRA <ArrowRight className="h-5 w-5"/></a>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-stone2"><ShieldCheck className="h-4 w-4 shrink-0 text-leaf"/>Compra 100% segura · Garantia de rabinho abanando</p>
      </footer>}
    </motion.aside>
  </>}</AnimatePresence>;
}
