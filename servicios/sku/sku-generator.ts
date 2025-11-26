import crypto from "crypto";

interface ProductInput {
  category: string;
  subcategory?: string;
  brand?: string;
  attributes: Record<string, any>;
}

const CATEGORY_MAP: Record<string, string> = {
  laptop: "LAP",
  monitor: "MON",
  silla: "SIL",
  teclado: "KEY",
  mouse: "MOU"
};

const SUBCATEGORY_MAP: Record<string, string> = {
  notebook: "NTB",
  gamer: "GMR",
  oficina: "OFC"
};

const ATTRIBUTE_ENCODERS: Record<
  string,
  (v: any) => string
> = {
  ram: v => `${v}R`,
  ssd: v => `${v}S`,
  color: v => v.slice(0, 3).toUpperCase(),
  pulgadas: v => `${String(v).replace(".", "")}P`
};

function normalizeBrand(brand?: string) {
  if (!brand) return "NON";
  return brand.replace(/[^a-zA-Z]/g, "")
              .slice(0, 3)
              .toUpperCase();
}

export function generateSKU(product: ProductInput): string {
  const cat = CATEGORY_MAP[product.category.toLowerCase()] || "UNK";
  const sub = product.subcategory
    ? SUBCATEGORY_MAP[product.subcategory.toLowerCase()] || "XXX"
    : "XXX";

  const attrParts = Object.entries(product.attributes)
    .map(([key, val]) => {
      const encoder = ATTRIBUTE_ENCODERS[key.toLowerCase()];
      return encoder ? encoder(val) : null;
    })
    .filter(Boolean)
    .join("-");

  const brand = normalizeBrand(product.brand);

  const raw = `${cat}-${sub}-${attrParts}-${brand}`;
  const hash = crypto
    .createHash("sha1")
    .update(raw)
    .digest("hex")
    .slice(0, 4)
    .toUpperCase();

  return `${raw}-${hash}`;
}
