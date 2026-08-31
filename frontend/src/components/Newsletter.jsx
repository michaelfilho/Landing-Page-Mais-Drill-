import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cake, Mail, PawPrint, Send, UserRound, X } from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";

const EMPTY_FORM = {
  owner_name: "",
  pet_name: "",
  owner_birth_date: "",
  pet_birth_date: "",
  phone: "",
  email: "",
  consent: false,
};

export default function Newsletter() {
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    document.body.style.overflow = formOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [formOpen]);

  const update = (field) => (event) => {
    const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
    setForm((current) => ({ ...current, [field]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    toast.info("Demonstração concluída. Nenhum dado foi enviado ou armazenado.");
    setForm(EMPTY_FORM);
    setFormOpen(false);
  };

  const inputClass = "h-12 w-full rounded-xl border-2 border-line bg-cream px-4 text-sm font-semibold text-ink outline-none transition-colors placeholder:text-stone2/60 focus:border-leaf";

  return (
    <section id="matilha" className="relative overflow-hidden bg-leaf py-24 text-cream lg:py-32" data-testid="newsletter-section">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 blob bg-sun/20" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 blob-alt bg-drill/20" aria-hidden="true" />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <span className="mx-auto mb-6 flex h-16 w-16 rotate-6 items-center justify-center rounded-3xl border-2 border-cream bg-drill shadow-hard"><Mail className="h-7 w-7" /></span>
          <h2 className="font-display text-4xl font-black tracking-tighter sm:text-5xl lg:text-6xl">Entre para a matilha.</h2>
          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-cream/80 md:text-lg">Novidades, lançamentos, dicas e benefícios exclusivos para você e seu pet.</p>
        </Reveal>

        <Reveal delay={0.12}>
          <button onClick={() => setFormOpen(true)} data-testid="newsletter-open-button" className="mx-auto mt-10 flex h-14 items-center justify-center gap-2.5 rounded-full border-2 border-ink bg-sun px-10 font-display text-base font-extrabold text-ink shadow-hard transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]">
            QUERO ENTRAR <Send className="h-4 w-4" />
          </button>
          <p className="mt-5 text-xs font-semibold text-cream/50">Prometido: só coisa boa. Você escolhe quando quer sair.</p>
        </Reveal>
      </div>

      <AnimatePresence>
        {formOpen && <>
          <motion.div className="fixed inset-0 z-[90] bg-ink/65 backdrop-blur-sm" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setFormOpen(false)} />
          <motion.div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} role="dialog" aria-modal="true" aria-labelledby="matilha-form-title">
            <motion.form onSubmit={onSubmit} onClick={(event) => event.stopPropagation()} className="relative my-auto w-full max-w-lg rounded-[2rem] bg-white p-6 text-left text-ink shadow-2xl sm:p-8" initial={{y:30,scale:0.96}} animate={{y:0,scale:1}} exit={{y:24,scale:0.97}} transition={{type:"spring",stiffness:300,damping:28}} data-testid="newsletter-form">
              <button type="button" onClick={() => setFormOpen(false)} className="absolute right-5 top-5 rounded-full p-2 text-stone2 transition-colors hover:bg-sand" aria-label="Fechar formulário"><X className="h-5 w-5" /></button>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sun text-ink"><PawPrint className="h-6 w-6" /></span>
              <h3 id="matilha-form-title" className="mt-4 pr-10 font-display text-2xl font-black">Conte mais sobre vocês</h3>
              <p className="mt-1 text-sm text-stone2">Formulário demonstrativo: nenhum dado preenchido é enviado ou armazenado.</p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5 text-sm font-bold"><span className="flex items-center gap-1.5"><UserRound className="h-4 w-4 text-leaf"/>Nome do responsável</span><input className={inputClass} required value={form.owner_name} onChange={update("owner_name")} placeholder="Seu nome" autoComplete="name" /></label>
                <label className="space-y-1.5 text-sm font-bold"><span className="flex items-center gap-1.5"><PawPrint className="h-4 w-4 text-leaf"/>Nome do pet</span><input className={inputClass} required value={form.pet_name} onChange={update("pet_name")} placeholder="Nome do pet" /></label>
                <label className="space-y-1.5 text-sm font-bold"><span className="flex items-center gap-1.5"><Cake className="h-4 w-4 text-leaf"/>Aniversário do responsável</span><input className={inputClass} type="date" required value={form.owner_birth_date} onChange={update("owner_birth_date")} /></label>
                <label className="space-y-1.5 text-sm font-bold"><span className="flex items-center gap-1.5"><Cake className="h-4 w-4 text-leaf"/>Aniversário do pet</span><input className={inputClass} type="date" required value={form.pet_birth_date} onChange={update("pet_birth_date")} /></label>
              </div>
              <label className="mt-4 block space-y-1.5 text-sm font-bold"><span>Telefone do responsável</span><input className={inputClass} type="tel" required value={form.phone} onChange={update("phone")} placeholder="(00) 00000-0000" autoComplete="tel" inputMode="tel" /></label>
              <label className="mt-4 block space-y-1.5 text-sm font-bold"><span className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-leaf"/>E-mail do responsável</span><input className={inputClass} type="email" required value={form.email} onChange={update("email")} placeholder="seuemail@exemplo.com" autoComplete="email" inputMode="email" /></label>
              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-xl bg-sand/55 p-3 text-xs leading-relaxed text-stone2"><input type="checkbox" required checked={form.consent} onChange={update("consent")} className="mt-0.5 h-4 w-4 accent-leaf" /><span>Autorizo a Mais Drill a usar meu telefone e e-mail para enviar novidades, lançamentos, benefícios e atualizações da marca. Posso cancelar quando quiser.</span></label>
              <button type="submit" className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-full bg-drill px-6 py-3.5 font-display text-base font-black text-white shadow-soft transition-colors hover:bg-drill-dark">SIMULAR CADASTRO<Send className="h-4 w-4" /></button>
            </motion.form>
          </motion.div>
        </>}
      </AnimatePresence>
    </section>
  );
}
