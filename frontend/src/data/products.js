export const WHATSAPP = "5511999999999";
export const brl = (value) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const PRODUCTS = [
  { id: "alimentacao-natural", name: "Alimentação Natural", tag: "Refeição completa · 300g", desc: "Refeição completa, fresca e sem conservantes, inspirada na comida de verdade.", price: 24.9, badge: "100% NATURAL", color: "#F5C928", ink: "#5A3B2E", variants: [
    { id: "carne-de-panela", label: "Carne de panela", color: "#F5C928", ink: "#5A3B2E", ingredients: ["Carne bovina", "Batata-doce", "Cenoura", "Abóbora", "Ervas naturais"] },
    { id: "frango-com-legumes", label: "Frango com legumes", color: "#E3313D", ink: "#FFFFFF", ingredients: ["Carne de frango", "Arroz integral", "Cenoura", "Vagem", "Cúrcuma"] },
    { id: "suino-com-abobora", label: "Suíno com abóbora", color: "#087A47", ink: "#FFF9ED", ingredients: ["Carne suína", "Abóbora", "Batata-doce", "Couve", "Alecrim"] },
  ] },
  { id: "caldo-de-ossos", name: "Caldo de Ossos", tag: "Nutrição e hidratação · 300ml", desc: "Caldo nutritivo para complementar refeições, aumentar a palatabilidade e a hidratação.", price: 19.9, badge: "NUTRIÇÃO EXTRA", color: "#E3313D", ink: "#FFFFFF", ingredients: ["Ossos bovinos", "Água filtrada", "Vinagre de maçã"] },
  { id: "ossos", name: "Ossos Naturais", tag: "Mastigação saudável", desc: "Ossos selecionados para enriquecer a rotina, entreter e estimular a mastigação natural.", price: 29.9, badge: "DIVERSÃO NATURAL", color: "#087A47", ink: "#FFF9ED", variants: [
    { id: "osso-natural", label: "Osso natural", price: 29.9, ingredients: ["Osso bovino natural desidratado"] },
    { id: "osso-medio", label: "Osso médio", price: 39.9, ingredients: ["Osso bovino natural desidratado"] },
  ] },
];

export const productWithVariant = (product, variant) => variant ? {
  ...product,
  ...variant,
  id: `${product.id}-${variant.id}`,
  baseId: product.id,
  name: `${product.name} · ${variant.label}`,
  tag: `${variant.label} · ${product.id === "alimentacao-natural" ? "300g" : "mastigação saudável"}`,
} : product;

export const SUBSCRIPTIONS = {
  avulso: { label: "Compra única", discount: 0 },
  mensal: { label: "Plano mensal", discount: 0.1 },
  trimestral: { label: "Plano trimestral", discount: 0.13 },
  semestral: { label: "Plano semestral", discount: 0.15 },
  anual: { label: "Plano anual", discount: 0.18 },
};
