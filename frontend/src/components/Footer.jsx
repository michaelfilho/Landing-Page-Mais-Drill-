import { Instagram, Lock, PawPrint, Youtube } from "lucide-react";
import { scrollToId } from "@/lib/smooth";
import { useNavigate } from "react-router-dom";

const COLS = [
  {
    title: "Produtos",
    links: [
      { label: "Drill Sticks", href: "#produtos" },
      { label: "Drill Bites", href: "#produtos" },
      { label: "Drill Pow!", href: "#drillpow" },
      { label: "Drill Box", href: "#produtos" },
      { label: "Assinaturas", href: "/assinaturas" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Nossa história", href: "#sobre" },
      { label: "Benefícios", href: "#beneficios" },
      { label: "#TimeMaisDrill", href: "#time" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Dúvidas frequentes", href: "#duvidas" },
      { label: "Entregas", href: "#duvidas" },
      { label: "Fale conosco", href: "#matilha" },
    ],
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const go = (e, href) => {
    e.preventDefault();
    if (href.startsWith("/")) {
      navigate(href);
      return;
    }
    scrollToId(href);
  };

  return (
    <footer className="overflow-hidden bg-ink pt-20 text-cream" data-testid="footer">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 pb-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src="/mais-drill-logo.png" alt="Mais Drill Dog" className="h-24 w-auto object-contain" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/60">
              Petiscos premium pra quem late de felicidade. Mais sabor. Mais
              diversão. Mais Drill.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, label: "Instagram da Mais Drill", id: "social-instagram" },
                { icon: Youtube, label: "YouTube da Mais Drill", id: "social-youtube" },
                { icon: PawPrint, label: "Comunidade Mais Drill", id: "social-community" },
              ].map(({ icon: Icon, label, id }) => (
                <a
                  key={id}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  data-testid={id}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition-all duration-200 hover:border-drill hover:bg-drill"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <nav key={col.title} className="md:col-span-2" aria-label={col.title}>
              <h3 className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-cream/40">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => go(e, l.href)}
                      data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="text-sm font-semibold text-cream/70 transition-colors hover:text-sun"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="md:col-span-3">
            <h3 className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-cream/40">
              Pagamento & segurança
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Pix", "Visa", "Mastercard", "Boleto", "Amex"].map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-cream/20 px-3.5 py-1.5 text-xs font-bold text-cream/70"
                >
                  {p}
                </span>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs font-semibold text-cream/50">
              <Lock className="h-3.5 w-3.5 text-leaf" strokeWidth={2.5} />
              Compra protegida · conexão segura SSL
            </p>
          </div>
        </div>
      </div>

      <div className="select-none overflow-hidden" aria-hidden="true">
        <p className="text-stroke-cream -mb-6 whitespace-nowrap text-center font-display text-[16.5vw] font-black leading-none tracking-tighter lg:-mb-10">
          MAIS DRILL
        </p>
      </div>

      <div className="relative border-t border-cream/10 bg-ink">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs font-semibold text-cream/40 sm:flex-row lg:px-8">
          <p data-testid="footer-copyright">
            © {new Date().getFullYear()} Mais Drill. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" onClick={(e) => e.preventDefault()} data-testid="footer-privacy" className="transition-colors hover:text-sun">
              Privacidade
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} data-testid="footer-terms" className="transition-colors hover:text-sun">
              Termos de uso
            </a>
            <a href="#" onClick={(e) => e.preventDefault()} data-testid="footer-returns" className="transition-colors hover:text-sun">
              Trocas e devoluções
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
