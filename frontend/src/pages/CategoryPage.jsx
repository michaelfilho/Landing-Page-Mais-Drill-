import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BadgePercent, Leaf, ShoppingBag } from "lucide-react";
import {
  PRODUCTS,
  SUBSCRIPTIONS,
  brl,
  productWithVariant,
} from "@/data/products";
import { ProductPack } from "@/components/ProductPack";
import { useCart } from "@/context/CartContext";
import ProductMiniCalculator from "@/components/ProductMiniCalculator";
import { SubscriptionSeal } from "@/components/SubscriptionSeal";
import IngredientsStory from "@/components/product/IngredientsStory";

const PRODUCT_PLANS = [
  { key: "semanal", name: "Semanal", discount: 0.12 },
  { key: "mensal", name: "Mensal", discount: 0.1 },
  { key: "anual", name: "Anual", discount: 0.18, best: true },
];

export default function CategoryPage() {
  const { slug } = useParams();
  const product = PRODUCTS.find((item) => item.id === slug) || PRODUCTS[0];
  const [variantId, setVariantId] = useState(product.variants?.[0]?.id || "");
  const [selectedPlan, setSelectedPlan] = useState("anual");
  const { add, setSubscription } = useCart();
  const variant = product.variants?.find((item) => item.id === variantId);
  const selected = productWithVariant(product, variant);
  const isFood = product.id === "alimentacao-natural";
  const activePlan = PRODUCT_PLANS.find((plan) => plan.key === selectedPlan);

  useEffect(() => {
    setVariantId(product.variants?.[0]?.id || "");
  }, [product]);

  return (
    <main>
      <section className="bg-sand py-12 lg:py-14">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[.3em] text-drill">
              Mais Drill Dog
            </p>
            <div className="mt-4">
              <SubscriptionSeal />
            </div>
            <h1 className="mt-5 font-display text-5xl font-black tracking-tight sm:text-7xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone2">
              {product.desc}
            </p>
            {product.variants && (
              <div className="mt-6">
                <p className="mb-2 text-xs font-black uppercase tracking-wider text-stone2">
                  {isFood ? "Escolha o sabor" : "Escolha o tamanho"}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setVariantId(item.id)}
                      className={`rounded-full border-2 px-4 py-2 text-sm font-black transition-all ${variantId === item.id ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink"}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {isFood && (
              <div className="mt-6 max-w-xl">
                <ProductMiniCalculator product={selected} />
              </div>
            )}
            {!isFood && (
              <div className="mt-6 max-w-xl rounded-2xl border-2 border-leaf bg-white p-4 shadow-soft">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sun text-ink">
                    <BadgePercent className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-black text-leaf">
                      Escolha seu plano
                    </h2>
                    <p className="text-xs text-stone2">
                      Compare a economia deste produto em cada assinatura.
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {PRODUCT_PLANS.map((plan) => {
                    const planPrice = selected.price * (1 - plan.discount);
                    return (
                      <button
                        key={plan.key}
                        onClick={() => setSelectedPlan(plan.key)}
                        className={`relative rounded-xl border-2 p-2.5 text-left transition-all ${selectedPlan === plan.key ? "border-leaf bg-leaf text-white shadow-sm" : "border-line bg-cream hover:border-leaf"}`}
                      >
                        {plan.best && (
                          <span className="absolute -right-1.5 -top-2 rounded-full bg-sun px-1.5 py-0.5 text-[7px] font-black text-ink">
                            MELHOR
                          </span>
                        )}
                        <strong className="block text-xs">{plan.name}</strong>
                        <span
                          className={`mt-1 block text-[9px] font-black ${selectedPlan === plan.key ? "text-sun" : "text-leaf"}`}
                        >
                          {plan.discount * 100}% OFF
                        </span>
                        <strong className="mt-1 block font-display text-base">
                          {brl(planPrice)}
                        </strong>
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-line pt-3">
                  <p className="text-[10px] leading-relaxed text-stone2">
                    Você economiza{" "}
                    <strong className="text-leaf">
                      {brl(selected.price * activePlan.discount)}
                    </strong>{" "}
                    por unidade.
                  </p>
                  <button
                    onClick={() => {
                      setSubscription(selectedPlan);
                      add(selected);
                    }}
                    className="shrink-0 rounded-full bg-leaf px-4 py-2.5 text-[10px] font-black text-white transition-colors hover:bg-ink"
                  >
                    ASSINAR{" "}
                    {SUBSCRIPTIONS[selectedPlan].label
                      .replace("Plano ", "")
                      .toUpperCase()}
                  </button>
                </div>
              </div>
            )}
            <div className="mt-4 flex items-center gap-6">
              <span className="font-display text-4xl font-black">
                {brl(selected.price)}
              </span>
              <button
                onClick={() => add(selected)}
                className="flex items-center gap-2 rounded-full bg-ink px-7 py-4 font-black text-white"
              >
                <ShoppingBag className="h-5 w-5" />
                ADICIONAR
              </button>
            </div>
          </div>
          <div>
            <div
              className="flex min-h-[400px] items-center justify-center rounded-[3rem] bg-white transition-colors duration-500"
              style={{ backgroundColor: `${selected.color}18` }}
            >
              <ProductPack
                {...selected}
                name={product.name.toUpperCase()}
                tag={variant?.label || product.tag}
                className="h-72 w-56 shadow-hard transition-colors duration-500"
              />
            </div>
            <article className="mt-4 rounded-[2rem] border border-line bg-white p-6 shadow-soft">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors duration-500"
                  style={{
                    backgroundColor: selected.color,
                    color: selected.ink,
                  }}
                >
                  <Leaf className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.2em] text-stone2">
                    Composição do produto
                  </p>
                  <h2 className="font-display text-2xl font-black">
                    Ingredientes
                  </h2>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {(selected.ingredients || []).map((ingredient) => (
                  <span
                    key={ingredient}
                    className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-bold text-ink"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-stone2">
                Consulte o rótulo para informações completas, composição
                garantida e possíveis restrições alimentares.
              </p>
            </article>
          </div>
        </div>
      </section>
      {isFood && (
        <IngredientsStory
          flavor={variant?.id}
          color={selected.color}
          ink={selected.ink}
        />
      )}
      <section className="mx-auto max-w-5xl px-5 py-20">
        <h2 className="font-display text-4xl font-black">
          Comida de verdade, rotina mais simples.
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {["Natural", "Prático", "Feito com carinho"].map((title) => (
            <article
              key={title}
              className="rounded-3xl border-2 border-ink p-6"
            >
              <h3 className="font-display text-2xl font-black text-leaf">
                {title}
              </h3>
              <p className="mt-3 text-stone2">
                Informação clara para você escolher com segurança e servir com
                tranquilidade.
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
