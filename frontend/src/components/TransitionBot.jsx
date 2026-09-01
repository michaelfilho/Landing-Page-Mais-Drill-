import { useState } from "react";
import { Bot, PawPrint, Send, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, brl } from "@/data/products";
import { useCart } from "@/context/CartContext";

const PHASES = [
  { label: "Dias 1–3", natural: 25, racao: 75 },
  { label: "Dias 4–6", natural: 50, racao: 50 },
  { label: "Dias 7–9", natural: 75, racao: 25 },
  { label: "Dia 10 em diante", natural: 100, racao: 0 },
];

const gramsFor = (weight, activity) => Math.max(100, Math.round((weight * 28 * activity) / 10) * 10);

function Bubble({ from, children }) {
  const bot = from === "bot";
  return (
    <div className={`flex gap-2.5 ${bot ? "" : "flex-row-reverse"}`}>
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${bot ? "bg-leaf text-white" : "bg-ink text-cream"}`}>
        {bot ? <Bot className="h-4 w-4" /> : <PawPrint className="h-4 w-4" />}
      </span>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${bot ? "rounded-tl-sm bg-sand text-ink" : "rounded-tr-sm bg-ink text-cream"}`}>
        {children}
      </div>
    </div>
  );
}

export default function TransitionBot() {
  const [step, setStep] = useState("weight");
  const [weightInput, setWeightInput] = useState("10");
  const [weight, setWeight] = useState(null);
  const [activity, setActivity] = useState(null);
  const { add, setSubscription } = useCart();

  const grams = weight && activity ? gramsFor(weight, activity) : 0;
  const product = PRODUCTS[0];

  const submitWeight = (e) => {
    e.preventDefault();
    const w = Math.min(80, Math.max(1, Number(weightInput) || 10));
    setWeight(w);
    setStep("activity");
  };

  const pickActivity = (value) => {
    setActivity(value);
    setStep("done");
  };

  const addPlan = () => {
    const packs = Math.ceil((grams * 30) / 300);
    setSubscription("mensal");
    add(product, packs);
    toast.success("Plano de transição adicionado ao carrinho!");
  };

  const restart = () => {
    setStep("weight");
    setWeight(null);
    setActivity(null);
  };

  return (
    <aside className="flex h-full flex-col rounded-[2rem] border-2 border-ink bg-white shadow-hard" data-testid="transition-bot">
      <header className="flex items-center gap-3 border-b border-line px-5 py-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf text-white"><Bot className="h-5 w-5" /></span>
        <div>
          <h3 className="font-display text-lg font-black leading-tight">Assistente de Transição</h3>
          <p className="text-xs text-stone2">Monta o plano certo pro seu dog</p>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
        <Bubble from="bot">Oi! Vou te ajudar a trocar a ração pelo natural sem estressar a barriga do seu dog. Qual o peso dele (kg)?</Bubble>

        {weight != null && <Bubble from="user">{weight} kg</Bubble>}

        {step === "activity" && (
          <Bubble from="bot">
            <p className="mb-2">E o nível de atividade dele?</p>
            <div className="flex flex-wrap gap-2">
              {[["Tranquilo", 0.85], ["Moderado", 1], ["Muito ativo", 1.2]].map(([label, value]) => (
                <button
                  key={label}
                  onClick={() => pickActivity(value)}
                  data-testid={`bot-activity-${label.toLowerCase().replace(/\s/g, "-")}`}
                  className="rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-black transition-colors hover:bg-ink hover:text-white"
                >
                  {label}
                </button>
              ))}
            </div>
          </Bubble>
        )}

        {activity != null && step === "done" && <Bubble from="user">{activity === 0.85 ? "Tranquilo" : activity === 1 ? "Moderado" : "Muito ativo"}</Bubble>}

        {step === "done" && (
          <Bubble from="bot">
            <p>
              Prontinho! Pra <strong>{weight}kg</strong>, a meta é <strong>{grams}g de natural por dia</strong>. Faça a troca aos poucos, em 10 dias, misturando com a ração atual:
            </p>
            <ul className="mt-3 space-y-1.5">
              {PHASES.map((p) => (
                <li key={p.label} className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold">
                  <span>{p.label}</span>
                  <span className="text-leaf">{p.natural}% natural</span>
                  <span className="text-stone2">{p.racao}% ração</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-stone2">Fezes mais moles nos primeiros dias são normais. Se persistir, desacelere a troca e converse com o veterinário.</p>
            <button onClick={addPlan} data-testid="bot-add-plan" className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-drill px-4 py-3 text-sm font-black text-white shadow-hard">
              <ShoppingBag className="h-4 w-4" />
              Adicionar {product.name} ({brl(product.price)})
            </button>
            <button onClick={restart} data-testid="bot-restart" className="mt-2 w-full text-xs font-bold text-stone2 underline">
              Calcular para outro pet
            </button>
          </Bubble>
        )}
      </div>

      {step === "weight" && (
        <form onSubmit={submitWeight} className="flex gap-2 border-t border-line p-4">
          <input
            type="number"
            min="1"
            max="80"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            placeholder="Peso em kg"
            aria-label="Peso do pet em kg"
            data-testid="bot-weight-input"
            className="w-full rounded-full border-2 border-ink bg-white px-4 py-2.5 text-sm font-bold outline-none"
          />
          <button type="submit" aria-label="Enviar" data-testid="bot-weight-submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <Send className="h-4 w-4" />
          </button>
        </form>
      )}
    </aside>
  );
}
