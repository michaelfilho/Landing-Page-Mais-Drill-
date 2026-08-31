const cell = (column, row) => ({ column, row });

export const INGREDIENT_SPRITES = {
  beef: cell(0, 0), chicken: cell(0, 1), pork: cell(2, 1), carrot: cell(0, 2),
  sweetPotato: cell(2, 2), pumpkin: cell(0, 3), greenBean: cell(1, 3),
  kale: cell(2, 3), herbs: cell(3, 3),
};

export const INGREDIENTS_BY_FLAVOR = {
  "carne-de-panela": {
    label: "Carne de panela",
    list: "Carne bovina · Batata-doce · Cenoura · Abóbora · Ervas naturais",
    pieces: ["beef", "carrot", "sweetPotato", "beef", "pumpkin", "herbs", "carrot", "beef", "sweetPotato", "pumpkin", "herbs", "beef", "carrot", "sweetPotato", "herbs", "pumpkin"],
  },
  "frango-com-legumes": {
    label: "Frango com legumes",
    list: "Frango · Arroz integral · Cenoura · Vagem · Cúrcuma",
    pieces: ["chicken", "carrot", "greenBean", "chicken", "sweetPotato", "herbs", "carrot", "greenBean", "chicken", "carrot", "herbs", "greenBean", "chicken", "sweetPotato"],
  },
  "suino-com-abobora": {
    label: "Suíno com abóbora",
    list: "Carne suína · Abóbora · Batata-doce · Couve · Alecrim",
    pieces: ["pork", "pumpkin", "sweetPotato", "pork", "kale", "herbs", "pumpkin", "pork", "sweetPotato", "kale", "pork", "pumpkin", "herbs", "sweetPotato"],
  },
};

export const DEFAULT_FLAVOR = "carne-de-panela";
