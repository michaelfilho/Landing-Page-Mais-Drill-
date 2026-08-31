import { INGREDIENT_SPRITES } from "@/data/productIngredients";

export function FallingIngredient({ type, index }) {
  const sprite = INGREDIENT_SPRITES[type] || INGREDIENT_SPRITES.herbs;
  return <span className={`falling-ingredient ingredient-${type}`} data-ingredient data-index={index} aria-hidden="true" style={{
    "--sprite-x": `${sprite.column * 33.333}%`,
    "--sprite-y": `${sprite.row * 33.333}%`,
    "--ingredient-scale": 0.82 + (index % 4) * 0.08,
  }}/>;
}
