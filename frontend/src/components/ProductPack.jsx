import { Bone, PawPrint } from "lucide-react";

const zigzag = (color) => {
  const pts = ["0,10"];
  for (let x = 0; x < 100; x += 8) pts.push(`${x + 4},0 ${x + 8},10`);
  return `0,10 ${pts.slice(1).join(" ")} 100,10`;
};

export const ProductPack = ({
  color = "#E3313D",
  ink = "#FFFFFF",
  name = "DRILL STICKS",
  tag = "petisco premium",
  weight = "150g",
  className = "",
  compact = false,
}) => (
  <div
    className={`relative flex flex-col justify-between overflow-hidden ${compact ? "rounded-xl p-2 pt-3" : "rounded-[1.4rem] p-5 pt-7"} ${className}`}
    style={{ backgroundColor: color, color: ink }}
    aria-hidden="true"
  >
    <svg
      className="absolute -top-[8px] left-0 w-full"
      height="9"
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
    >
      <polygon points={zigzag(color)} fill={color} />
    </svg>
    <div className="flex items-center justify-between gap-1">
      <span className={`font-display font-bold uppercase ${compact ? "text-[6px] tracking-[0.2em]" : "text-[10px] tracking-[0.28em]"}`}>
        Mais Drill
      </span>
      <PawPrint className={compact ? "h-2.5 w-2.5" : "h-5 w-5"} strokeWidth={2.2} />
    </div>
    <div>
      <p className={`font-display font-black uppercase leading-[0.9] tracking-tight ${compact ? "break-words text-[10px]" : name.length > 16 ? "text-xl" : "text-3xl"}`}>
        {name}
      </p>
      <p className={`${compact ? "mt-1 line-clamp-1 text-[5px] tracking-[0.08em]" : "mt-2 text-[11px] tracking-[0.2em]"} font-semibold uppercase opacity-80`}>
        {tag}
      </p>
    </div>
    <div className="flex items-center justify-between">
      <span className={`flex items-center font-bold uppercase ${compact ? "gap-0.5 text-[6px] tracking-wide" : "gap-1.5 text-[11px] tracking-widest"}`}>
        <Bone className={compact ? "h-2 w-2" : "h-4 w-4"} /> {weight}
      </span>
      <span className={`${compact ? "hidden" : "rounded-full border px-2.5 py-1 text-[9px]"} font-bold uppercase tracking-[0.2em]`}>
        100% dog approved
      </span>
    </div>
  </div>
);
