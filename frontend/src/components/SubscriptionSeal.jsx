import { Gift, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export function SubscriptionSeal({ compact = false }) {
  return <Link to="/assinaturas" className={`group/seal inline-flex items-center gap-2 rounded-full border-2 border-ink bg-sun font-black text-ink shadow-hard transition-transform hover:-translate-y-0.5 ${compact ? "px-3 py-1.5 text-[10px]" : "px-4 py-2 text-xs"}`} aria-label="Conhecer planos de assinatura">
    <Sparkles className={compact ? "h-3.5 w-3.5" : "h-4 w-4"}/>
    ASSINE E ECONOMIZE ATÉ 18%
    {!compact && <><span className="h-4 w-px bg-ink/30"/><Gift className="h-4 w-4"/><span>GANHE UM PRESENTE</span></>}
  </Link>;
}
