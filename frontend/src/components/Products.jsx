import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, brl, productWithVariant } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Reveal } from "@/components/Reveal";
import { Tilt } from "@/components/Tilt";
import { ProductPack } from "@/components/ProductPack";
import ProductMiniCalculator from "@/components/ProductMiniCalculator";
import { SubscriptionSeal } from "@/components/SubscriptionSeal";

function ProductCard({ product }) {
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id || "");
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const { add } = useCart();
  const variant = product.variants?.find((item) => item.id === variantId);
  const selected = productWithVariant(product, variant);
  const hasChoices = Boolean(product.variants?.length);
  const hasCalculator = product.id === "alimentacao-natural";

  return <><Tilt max={5} className="group h-full"><article className="flex h-full flex-col rounded-[2rem] border-2 border-ink bg-white p-5 transition-shadow duration-300 group-hover:shadow-hover-drill" data-testid={`product-card-${product.id}`}>
    <div className="relative mb-5 flex h-72 items-center justify-center overflow-hidden rounded-[1.6rem] transition-colors duration-500" style={{backgroundColor:`${selected.color}22`}}>
      <span className="absolute left-3 top-3 z-10 -rotate-6 rounded-full border-2 border-ink px-3 py-1 text-[10px] font-black uppercase tracking-widest shadow-hard transition-colors duration-500" style={{backgroundColor:selected.color,color:selected.ink}}>{product.badge}</span>
      <ProductPack color={selected.color} ink={selected.ink} name={product.name.toUpperCase()} tag={variant?.label || product.tag} className="h-52 w-40 transition-all duration-500 group-hover:-rotate-2 group-hover:scale-[1.03]"/>
      <span className="absolute bottom-3 right-3"><SubscriptionSeal compact/></span>
    </div>
    <h3 className="font-display text-2xl font-extrabold tracking-tight">{product.name}</h3>
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-drill">{variant?.label || product.tag}</p>
    <p className="mt-2.5 text-sm leading-relaxed text-stone2">{product.desc}</p>
    {hasChoices && <div className="mt-4"><p className="mb-2 text-[10px] font-black uppercase tracking-[.16em] text-stone2">{hasCalculator ? "Escolha o sabor" : "Escolha o tamanho"}</p><div className="grid grid-cols-2 gap-2">{product.variants.map((item,index) => <button key={item.id} onClick={() => setVariantId(item.id)} className={`flex min-h-9 items-center justify-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-center text-[10px] font-black transition-all ${product.variants.length%2===1&&index===product.variants.length-1?"col-span-2":""} ${variantId===item.id?"border-ink bg-ink text-white shadow-sm":"border-line bg-cream hover:border-ink"}`}><span className="h-2.5 w-2.5 shrink-0 rounded-full border border-current" style={{backgroundColor:item.color || product.color}}/>{item.label}</button>)}</div></div>}
    {hasCalculator && <button type="button" onClick={() => setCalculatorOpen(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-ink bg-cream px-4 py-2.5 text-xs font-black uppercase tracking-wider text-ink transition-all hover:-translate-y-0.5 hover:bg-sun active:translate-y-0" data-testid="open-product-calculator"><Calculator className="h-4 w-4"/>Calcular quantidade</button>}
    <div className="mt-auto flex items-center justify-between border-t border-line pt-4"><span className="font-display text-2xl font-black" data-testid={`product-price-${product.id}`}>{brl(selected.price)}</span><button onClick={() => {add(selected);toast.success(`${selected.name} entrou pro carrinho!`);}} data-testid={`product-add-${product.id}`} aria-label={`Adicionar ${selected.name} ao carrinho`} className="flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-cream transition-all duration-200 hover:bg-drill active:scale-95"><ShoppingBag className="h-4 w-4"/>Adicionar</button></div>
  </article></Tilt>
    <AnimatePresence>
      {calculatorOpen && <>
        <motion.button type="button" aria-label="Fechar calculadora" className="fixed inset-0 z-[90] cursor-default bg-ink/65 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setCalculatorOpen(false)}/>
        <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none" initial={{opacity:0,scale:.94,y:18}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.96,y:12}} transition={{duration:.2}}>
          <div role="dialog" aria-modal="true" aria-labelledby="calculator-title" className="pointer-events-auto w-full max-w-xl rounded-[2rem] border-2 border-ink bg-cream p-4 shadow-2xl sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div><p className="text-[10px] font-black uppercase tracking-[.2em] text-drill">Alimentação natural</p><h3 id="calculator-title" className="font-display text-2xl font-black text-ink">Calcule a quantidade ideal</h3><p className="mt-1 text-sm text-stone2">Ajuste o plano para {variant?.label || product.tag}.</p></div>
              <button type="button" onClick={() => setCalculatorOpen(false)} aria-label="Fechar calculadora" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-ink bg-white text-ink transition-colors hover:bg-sun"><X className="h-5 w-5"/></button>
            </div>
            <ProductMiniCalculator product={selected} featured/>
          </div>
        </motion.div>
      </>}
    </AnimatePresence>
  </>;
}

export default function Products() {
  return <section id="produtos" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32" data-testid="products-section">
    <Reveal><p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-drill">Comida de verdade</p><h2 className="max-w-2xl font-display text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl">Três formas de cuidar <span className="text-drill">do seu dog</span></h2><p className="mt-5 max-w-xl text-base leading-relaxed text-stone2 md:text-lg">Alimentação Natural, Caldo de Ossos e Ossos: uma rotina completa, do prato à diversão.</p></Reveal>
    <div className="mt-14 grid items-stretch gap-7 sm:grid-cols-2 lg:grid-cols-3">{PRODUCTS.map((product,index)=><Reveal key={product.id} delay={index*0.09} className="h-full"><ProductCard product={product}/></Reveal>)}</div>
  </section>;
}
