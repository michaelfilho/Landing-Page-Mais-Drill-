import { MessageCircle } from "lucide-react";
import { WHATSAPP } from "@/data/products";

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Olá! Quero saber mais sobre a Mais Drill.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Mais Drill no WhatsApp"
      data-testid="whatsapp-float"
      className="fixed bottom-6 right-6 z-[60] flex h-14 w-14 animate-float items-center justify-center rounded-full border-2 border-ink bg-[#25D366] text-white shadow-hard transition-transform duration-200 hover:scale-110 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2.4} />
    </a>
  );
}
