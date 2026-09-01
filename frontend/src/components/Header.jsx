import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { label: "Início", href: "/" },
  { label: "Nosso Propósito", href: "/nosso-proposito" },
  { label: "Alimentação Natural", href: "/produtos/alimentacao-natural" },
  { label: "Transição Alimentar", href: "/transicao-alimentar" },
  { label: "Caldo de Ossos", href: "/produtos/caldo-de-ossos" },
  { label: "Ossos", href: "/produtos/ossos" },
  { label: "Assinaturas", href: "/assinaturas" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const navigate = useNavigate();
  const { count, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    navigate(href);
  };

  return (
    <header
      data-testid="header"
      className={`sticky top-0 z-50 border-b border-cream/15 bg-ink/95 text-cream backdrop-blur-xl transition-shadow duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      <div className="mx-auto flex max-w-[1840px] items-center justify-between gap-6 px-5 py-4 lg:px-10">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.location.assign("/");
          }}
          className="flex items-center"
          data-testid="header-logo"
          aria-label="Mais Drill — voltar ao topo"
        >
          <img src="/mais-drill-logo.png" alt="Mais Drill Dog" className="h-20 w-auto object-contain md:h-24" />
        </a>

        <nav className="hidden items-center gap-4 xl:gap-6 lg:flex" aria-label="Navegação principal">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => go(e, l.href)}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              className="group relative whitespace-nowrap text-xs font-bold text-cream/85 transition-colors hover:text-white xl:text-sm"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2.5px] w-0 rounded-full bg-sun transition-[width] duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={openCart}
            data-testid="header-cart-button"
            aria-label={`Abrir carrinho, ${count} itens`}
            className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-cream bg-cream text-ink transition-transform duration-200 hover:scale-105 active:scale-95"
          >
            <ShoppingBag className="h-5 w-5" strokeWidth={2.2} />
            {count > 0 && (
              <span
                data-testid="cart-count-badge"
                className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-drill px-1 text-[11px] font-black text-white"
              >
                {count}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            data-testid="mobile-menu-button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream/70 text-cream lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-cream/15 bg-ink lg:hidden"
            data-testid="mobile-menu"
            aria-label="Menu mobile"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s/g, "-")}`}
                  className="rounded-2xl px-4 py-3.5 font-display text-2xl font-extrabold tracking-tight text-cream transition-colors hover:bg-white/10"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

