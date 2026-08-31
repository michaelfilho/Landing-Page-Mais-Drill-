# PRD — Mais Drill (Landing Page Premium)

## Problem statement (resumo)
Landing page/e-commerce premium para a marca brasileira de petiscos para cães **Mais Drill**, com benchmark de qualidade na The Hungry Dog (referência, nunca cópia). Objetivo: experiência de marca premium, divertida, moderna, altamente visual, responsiva e focada em conversão, com identidade própria.

## Personas
- Tutora/tutor de cão que trata o pet como família e busca petiscos premium com ingredientes confiáveis.
- Visitante mobile-first vindo de Instagram/anúncio, que decide rápido e compra por impulso emocional.

## Arquitetura
- Frontend: React 19 + Tailwind + Framer Motion + Lenis (scroll suave), Shadcn accordion, Sonner toasts. Componentes em `/app/frontend/src/components/`.
- Backend/DB: removidos. O projeto funciona como frontend estático; produtos ficam no código e o formulário da newsletter é apenas demonstrativo, sem envio ou persistência.
- Carrinho: estado client-side (CartContext) com drawer animado; checkout MOCKED via link WhatsApp (número placeholder `5511999999999` em `src/data/products.js` — substituir pelo número real).

## Design system
- Cores: cream #FDFBF7, ink #1A1918, drill #FF5A36, leaf #2A4D3E, sun #F4D06F, sand #EFEBE1.
- Tipografia: Cabinet Grotesk (display, Fontshare CDN) + Manrope (texto, Google Fonts).
- Assinaturas visuais: bordas 2px ink + sombra dura (shadow-hard), blobs orgânicos, selos rotacionados, grain overlay, marquees editoriais, reveal mascarado linha-a-linha no hero, tilt 3D (Framer Motion) nos packs e selo circular giratório.

## Implementado (26/08/2026)
- Announcement bar marquee, header sticky glass + menu mobile animado
- Hero cinético com reveal mascarado, parallax, pack 3D com tilt e badge circular
- Faixa de benefícios, vitrine de 4 produtos com dados locais, marquees editoriais
- Manifesto em 3 capítulos numerados, produto em destaque (Drill Pow!) estilo campanha
- Bento "Por que o seu dog vai amar?", galeria UGC #TimeMaisDrill, depoimentos, números animados (placeholders identificados)
- Comparativo Mais Drill x comum, filosofia "pode entrar / nem pensar", como funciona (4 passos), sobre, FAQ accordion, CTA final full-bleed, newsletter demonstrativa sem persistência, footer completo, botão flutuante WhatsApp
- SEO: title/description/OG/JSON-LD, alt texts, focus states, prefers-reduced-motion, data-testids em todos os interativos

## Conteúdo MOCKED/placeholder (substituir com dados reais)
- Número WhatsApp (5511999999999), preços, nomes/descrições de produtos, números de confiança, depoimentos, galeria UGC, respostas do FAQ, história "Sobre", cupom BEMVINDO10 — todos sinalizados como ilustrativos na página.

## Backlog priorizado
- P0: Número real do WhatsApp + fotos oficiais dos produtos/embalagens + números reais de confiança
- P0: Logo oficial Mais Drill (hoje é wordmark tipográfico + paw)
- P1: Checkout real (Stripe/Mercado Pago) e páginas de produto dedicadas
- P1: Depoimentos e fotos UGC reais; blog/conteúdo
- P2: Se necessário no futuro, integrar um serviço externo para newsletter e e-mail de boas-vindas
