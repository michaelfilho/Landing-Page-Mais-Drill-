import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Bot, PawPrint, Send, ShoppingBag, Sparkles, X } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, SUBSCRIPTIONS, brl } from "@/data/products";
import { useCart } from "@/context/CartContext";

const PHASES = [
  { label: "Dias 1–3", natural: 25, racao: 75 },
  { label: "Dias 4–6", natural: 50, racao: 50 },
  { label: "Dias 7–9", natural: 75, racao: 25 },
  { label: "Dia 10 em diante", natural: 100, racao: 0 },
];

const ACTIVITY_MAP = { tranquilo: 0.85, calmo: 0.85, sedentario: 0.85, moderado: 1, normal: 1, ativo: 1.2, agitado: 1.2, energetico: 1.2 };
const PLAN_ENTRIES = Object.entries(SUBSCRIPTIONS).filter(([key]) => key !== "avulso");
const QUICK_STARTS = ["Qual a quantidade ideal pro meu pet?", "Como funciona a transição alimentar?", "Quais são os planos?"];

const gramsFor = (weight, activity) => Math.max(100, Math.round((weight * 28 * activity) / 10) * 10);
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

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

export default function AssistantBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", content: "Oi! 🐾 Eu sou o assistente da Mais Drill. Me conta o peso do seu pet (em kg) que eu calculo a quantidade ideal, ou pergunta sobre a transição alimentar e os planos." },
  ]);
  const { add, setSubscription } = useCart();
  const listRef = useRef(null);
  const weightRef = useRef(null);
  const activityRef = useRef(null);
  const awaitingActivityRef = useRef(false);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const pushBot = (content) => setMessages((m) => [...m, { from: "bot", content }]);
  const pushUser = (content) => setMessages((m) => [...m, { from: "user", content }]);

  const addPlan = (product, packs) => {
    setSubscription("mensal");
    add(product, packs, { delivery: "Quantidade ideal todo mês" });
    toast.success("Plano adicionado ao carrinho!");
  };

  const replyWithPlan = (w, act) => {
    const grams = gramsFor(w, act);
    const packs = Math.ceil((grams * 30) / 300);
    const product = PRODUCTS[0];
    const monthly = brl(product.price * packs * (1 - SUBSCRIPTIONS.mensal.discount));
    pushBot(
      <>
        <p>
          Prontinho! Pra <strong>{w}kg</strong>, a quantidade ideal é <strong>{grams}g de natural por dia</strong> — isso dá <strong>{packs} pacotes por mês</strong>, sempre a quantidade certa, todo mês.
        </p>
        <button onClick={() => addPlan(product, packs)} data-testid="bot-add-plan" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-drill px-4 py-2.5 text-xs font-black text-white shadow-hard">
          <ShoppingBag className="h-3.5 w-3.5" />
          Adicionar plano mensal ({monthly})
        </button>
        <p className="mt-2 text-xs text-stone2">
          Quer trimestral, semestral ou anual? <Link to="/assinaturas" onClick={() => setOpen(false)} className="font-bold text-leaf underline">Veja todos os planos →</Link>
        </p>
      </>
    );
  };

  const replyPlans = () => {
    const weight = weightRef.current;
    const activity = activityRef.current;
    if (weight && activity) {
      const grams = gramsFor(weight, activity);
      const packs = Math.ceil((grams * 30) / 300);
      const full = PRODUCTS[0].price * packs;
      pushBot(
        <>
          <p>Pro seu pet de {weight}kg, o Kit Alimentação Natural ({packs} un./mês) sai assim em cada plano:</p>
          <ul className="mt-2 space-y-1">
            {PLAN_ENTRIES.map(([key, plan]) => (
              <li key={key} className="flex justify-between gap-2 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold">
                <span>{plan.label.replace("Plano ", "")}</span>
                <span className="text-leaf">{brl(full * (1 - plan.discount))}</span>
              </li>
            ))}
          </ul>
          <Link to="/assinaturas" onClick={() => setOpen(false)} className="mt-2 inline-block text-xs font-bold text-leaf underline">Ver todos os planos →</Link>
        </>
      );
    } else {
      pushBot(
        <>
          <p>Temos 4 planos — em todos, sempre chega a quantidade ideal pro seu pet, todo mês:</p>
          <ul className="mt-2 space-y-1">
            {PLAN_ENTRIES.map(([key, plan]) => (
              <li key={key} className="flex justify-between gap-2 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold">
                <span>{plan.label.replace("Plano ", "")}</span>
                <span className="text-leaf">{plan.discount * 100}% off</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-stone2">Me diz o peso do seu pet que eu calculo o valor certinho, ou <Link to="/assinaturas" onClick={() => setOpen(false)} className="font-bold text-leaf underline">veja todos os planos</Link>.</p>
        </>
      );
    }
  };

  const replyTransition = () => {
    const weight = weightRef.current;
    const activity = activityRef.current;
    pushBot(
      <>
        <p>A transição ideal é gradual, em 10 dias, misturando natural com a ração:</p>
        <ul className="mt-2 space-y-1">
          {PHASES.map((p) => (
            <li key={p.label} className="flex justify-between gap-2 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold">
              <span>{p.label}</span>
              <span className="text-leaf">{p.natural}% natural</span>
              <span className="text-stone2">{p.racao}% ração</span>
            </li>
          ))}
        </ul>
        {weight ? (
          <p className="mt-2">Pro seu pet de {weight}kg, o final da transição é {gramsFor(weight, activity || 1)}g de natural por dia.</p>
        ) : (
          <p className="mt-2 text-xs text-stone2">Me diz o peso do seu pet que eu calculo a quantidade certa. <Link to="/transicao-alimentar" onClick={() => setOpen(false)} className="font-bold text-leaf underline">Saiba mais →</Link></p>
        )}
      </>
    );
  };

  const respond = (rawText) => {
    const text = norm(rawText);
    const activityWord = Object.keys(ACTIVITY_MAP).find((w) => text.includes(w));

    if (awaitingActivityRef.current && activityWord) {
      const level = ACTIVITY_MAP[activityWord];
      activityRef.current = level;
      awaitingActivityRef.current = false;
      replyWithPlan(weightRef.current, level);
      return;
    }

    const numMatch = text.match(/\d+[.,]?\d*/);
    if (numMatch && (text.includes("kg") || !awaitingActivityRef.current)) {
      const w = Math.min(80, Math.max(1, parseFloat(numMatch[0].replace(",", "."))));
      weightRef.current = w;
      awaitingActivityRef.current = true;
      pushBot(
        <>
          <p>Show! Pra um pet de <strong>{w}kg</strong>, qual o nível de atividade dele?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {[["Tranquilo", "tranquilo"], ["Moderado", "moderado"], ["Muito ativo", "ativo"]].map(([label, value]) => (
              <button key={value} onClick={() => handleSend(label, value)} className="rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-black transition-colors hover:bg-ink hover:text-white">
                {label}
              </button>
            ))}
          </div>
        </>
      );
      return;
    }

    if (/plano|assinatur|preco|valor|desconto|mensal|trimestral|semestral|anual|quanto custa/.test(text)) {
      replyPlans();
      return;
    }

    if (/transi|troca|racao|gradual|\bdias\b/.test(text)) {
      replyTransition();
      return;
    }

    if (/^(oi|ola|eae|e ai|bom dia|boa tarde|boa noite)/.test(text)) {
      pushBot("Oi! Me conta o peso do seu pet (em kg) que eu calculo a quantidade ideal, ou pergunta sobre a transição alimentar e os planos.");
      return;
    }

    pushBot("Posso te ajudar com a quantidade ideal pro seu pet (me diz o peso), a transição alimentar, ou os planos de assinatura. O que você quer saber?");
  };

  const handleSend = (text, keyword) => {
    const value = (text ?? input).trim();
    if (!value) return;
    pushUser(value);
    setInput("");
    respond(keyword ?? value);
  };

  const submit = (e) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Fechar assistente" : "Falar com o assistente Mais Drill"}
        data-testid="assistant-float"
        className="fixed bottom-6 left-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-leaf text-white shadow-hard transition-transform duration-200 hover:scale-110 active:scale-95"
      >
        {open ? <X className="h-6 w-6" /> : <Sparkles className="h-6 w-6" />}
      </button>

      {open && (
        <aside className="fixed bottom-24 left-6 z-[61] flex h-[520px] w-[min(92vw,380px)] flex-col rounded-[2rem] border-2 border-ink bg-white shadow-hard" data-testid="assistant-bot">
          <header className="flex items-center gap-3 border-b border-line px-5 py-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-leaf text-white"><Bot className="h-5 w-5" /></span>
            <div>
              <h3 className="font-display text-lg font-black leading-tight">Assistente Mais Drill</h3>
              <p className="text-xs text-stone2">Pergunta sobre pets, transição ou planos</p>
            </div>
          </header>

          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
            {messages.map((msg, i) => <Bubble key={i} from={msg.from}>{msg.content}</Bubble>)}

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2">
                {QUICK_STARTS.map((q) => (
                  <button key={q} onClick={() => handleSend(q)} className="rounded-full border border-line bg-sand px-3 py-1.5 text-xs font-bold text-ink hover:border-leaf">
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={submit} className="flex gap-2 border-t border-line p-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escreva sua pergunta..."
              aria-label="Sua pergunta pro assistente"
              data-testid="assistant-input"
              className="w-full rounded-full border-2 border-ink bg-white px-4 py-2.5 text-sm font-bold outline-none"
            />
            <button type="submit" aria-label="Enviar" data-testid="assistant-send" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink text-white">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
