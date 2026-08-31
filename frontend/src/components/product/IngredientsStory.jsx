import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductPack } from "@/components/ProductPack";
import { FallingIngredient } from "@/components/product/FallingIngredient";
import { DEFAULT_FLAVOR, INGREDIENTS_BY_FLAVOR } from "@/data/productIngredients";
import "@/components/product/IngredientsStory.css";

gsap.registerPlugin(ScrollTrigger);
const signed = (index, amount) => (index % 2 ? 1 : -1) * amount;

export default function IngredientsStory({ flavor = DEFAULT_FLAVOR, color = "#F5C928", ink = "#5A3B2E" }) {
  const sectionRef = useRef(null);
  const packRef = useRef(null);
  const bowlRef = useRef(null);
  const story = INGREDIENTS_BY_FLAVOR[flavor] || INGREDIENTS_BY_FLAVOR[DEFAULT_FLAVOR];
  const pieces = useMemo(() => story.pieces, [story]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    let mm;
    const ctx = gsap.context(() => {
      const ingredients = gsap.utils.toArray("[data-ingredient]", section);
      mm = gsap.matchMedia();

      const buildTimeline = ({ mobile = false, tablet = false } = {}) => {
        const visibleCount = mobile ? 9 : tablet ? Math.min(13, ingredients.length) : ingredients.length;
        const active = ingredients.slice(0, visibleCount);
        gsap.set(ingredients.slice(visibleCount), { display: "none" });
        gsap.set(active, { display: "block", autoAlpha: 0, xPercent: -50, yPercent: -50, scale: 0.55 });
        const origin = section.querySelector(".ingredient-origin");
        const originRect = origin.getBoundingClientRect();
        const bowlRect = bowlRef.current.getBoundingClientRect();
        const bowlMouthY = bowlRect.top + bowlRect.height * 0.39;
        const measuredFall = Math.max(190, bowlMouthY - originRect.top);
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: mobile ? "+=1150" : tablet ? "+=1500" : "+=1800", scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true },
        });

        tl.fromTo("[data-story-copy='intro']", { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 1.15 })
          .fromTo(packRef.current, { autoAlpha: 0, y: 24, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.15 }, 0)
          .to(packRef.current, { y: mobile ? -18 : -44, rotation: mobile ? -4 : -6, scale: 1.025, duration: 1.2 }, 1.35)
          .to("[data-pack-shadow]", { scaleX: 0.82, x: mobile ? -8 : -20, opacity: 0.28, duration: 1.2 }, 1.35)
          .fromTo(bowlRef.current, { autoAlpha: 0, y: 70, scale: 0.93 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2 }, 2.15);

        active.forEach((element, index) => {
          const spread = mobile ? 42 : tablet ? 78 : 118;
          const midX = signed(index, 16 + (index * 19) % spread);
          const finalX = signed(index + 1, 8 + (index * 13) % (mobile ? 35 : 74));
          const fall = measuredFall + (index % 3) * (mobile ? 3 : 5);
          const rotation = signed(index, 95 + (index * 37) % 170);
          const start = 2.65 + index * (mobile ? 0.12 : 0.09) + (index % 3) * 0.045;
          tl.to(element, { autoAlpha: 1, keyframes: [
            { y: mobile ? 36 : 55, x: signed(index, 8 + index % 17), rotation: signed(index, 16), scale: 0.82, duration: 0.18 },
            { y: fall * 0.48, x: midX, rotation: rotation * 0.58, scale: 1, duration: 0.42, ease: "power1.in" },
            { y: fall, x: finalX, rotation, scaleX: 1.06, scaleY: 0.9, duration: 0.32, ease: "power2.in" },
            { y: fall - (mobile ? 8 : 13), x: finalX * 0.92, scaleX: 1, scaleY: 1, duration: 0.1, ease: "power1.out" },
          ] }, start);
          if (index % 4 === 0) tl.to(bowlRef.current, { scale: 1.014, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.out" }, start + 0.84);
        });

        tl.to("[data-story-copy='intro']", { autoAlpha: 0, y: -24, duration: 0.7 }, 6.5)
          .fromTo("[data-story-copy='final']", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 6.8)
          .to(packRef.current, { rotation: -1.5, y: mobile ? -32 : -68, x: mobile ? 46 : 105, scale: 0.9, duration: 1.2 }, 7)
          .to([bowlRef.current, ...active], { scale: 0.96, autoAlpha: 0, duration: 0.75 }, 9.25)
          .to("[data-story-copy='final']", { autoAlpha: 0, y: -18, duration: 0.55 }, 9.3);
      };

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => buildTimeline());
      mm.add("(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => buildTimeline({ tablet: true }));
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => buildTimeline({ mobile: true }));
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const originRect = section.querySelector(".ingredient-origin").getBoundingClientRect();
        const bowlRect = bowlRef.current.getBoundingClientRect();
        const restingY = Math.max(190, bowlRect.top + bowlRect.height * 0.39 - originRect.top);
        gsap.set([packRef.current, bowlRef.current], { autoAlpha: 1 });
        gsap.set(ingredients, { display: "block", autoAlpha: 1, xPercent: -50, yPercent: -50, y: restingY, x: (index) => signed(index, 10 + (index * 11) % 62), scale: 0.78 });
      });
    }, section);
    return () => {
      mm?.revert();
      ctx.revert();
    };
  }, [flavor, pieces]);

  return <section id="ingredientes-reais" ref={sectionRef} className="ingredients-story" aria-labelledby="ingredients-story-title">
    <div className="ingredients-stage">
      <div className="story-glow" aria-hidden="true" />
      <div className="story-copy story-copy-intro" data-story-copy="intro">
        <p className="story-eyebrow">{story.label} · por dentro</p>
        <h2 id="ingredients-story-title">Comida de verdade.<br/><span>Você vê o que ele come.</span></h2>
        <p>Ingredientes selecionados, preparados e servidos de um jeito simples.</p>
      </div>
      <div className="story-pack-wrap">
        <div ref={packRef} className="story-pack"><ProductPack color={color} ink={ink} name="ALIMENTAÇÃO NATURAL" tag={story.label} className="h-full w-full" /></div>
        <span data-pack-shadow className="story-pack-shadow" aria-hidden="true" />
      </div>
      <div className="ingredient-origin" aria-hidden="true">{pieces.map((type, index) => <FallingIngredient key={`${flavor}-${type}-${index}`} type={type} index={index}/>)}</div>
      <div ref={bowlRef} className="story-bowl" aria-hidden="true">
        <div className="bowl-back"/><div className="bowl-content"/>
        <img src="/images/bowl/ceramic-bowl.png" width="1536" height="1024" alt="" loading="lazy"/>
        <div className="bowl-front"/>
      </div>
      <div className="story-copy story-copy-final" data-story-copy="final">
        <p className="story-eyebrow">Transparência de verdade</p>
        <h2>O que está no rótulo<br/><span>é o que vai para a cumbuca.</span></h2>
        <p>{story.list}</p>
      </div>
      <p className="story-scroll-cue" aria-hidden="true"><span/> Continue para servir</p>
    </div>
  </section>;
}
