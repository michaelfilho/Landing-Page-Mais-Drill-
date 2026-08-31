import { createContext, useContext, useMemo, useState } from "react";
import { WHATSAPP, brl, SUBSCRIPTIONS } from "@/data/products";

const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [subscription, setSubscription] = useState("avulso");
  const add = (product, qty = 1, options = {}) => {
    setItems((current) => {
      const found = current.find((item) => item.id === product.id);
      return found ? current.map((item) => item.id === product.id ? { ...item, qty: item.qty + qty, ...options } : item) : [...current, { ...product, qty, ...options }];
    });
    setOpen(true);
  };
  const setQty = (id, qty) => setItems((current) => qty <= 0 ? current.filter((item) => item.id !== id) : current.map((item) => item.id === id ? { ...item, qty } : item));
  const remove = (id) => setItems((current) => current.filter((item) => item.id !== id));
  const summary = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);
    const discount = subtotal * SUBSCRIPTIONS[subscription].discount;
    const total = subtotal - discount;
    const lines = ["Olá! Quero fechar meu pedido Mais Drill:", ...items.flatMap((item) => [`• ${item.qty}x ${item.name} — ${brl(item.price)}`, ...(item.delivery ? [`  Entrega: ${item.delivery}`] : [])]), `Modalidade: ${SUBSCRIPTIONS[subscription].label}`, `Total estimado: ${brl(total)}`];
    return { count, subtotal, discount, total, waUrl: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(lines.join("\n"))}` };
  }, [items, subscription]);
  return <CartContext.Provider value={{ items, add, setQty, remove, ...summary, open, openCart: () => setOpen(true), closeCart: () => setOpen(false), subscription, setSubscription }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
