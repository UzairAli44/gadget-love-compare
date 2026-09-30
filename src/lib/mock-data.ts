import phoneGraphite from "@/assets/phone-graphite.png";
import phoneMint from "@/assets/phone-mint.png";
import laptopSilver from "@/assets/laptop-silver.png";
import laptopGaming from "@/assets/laptop-gaming.png";

export type Product = {
  name: string;
  variant: string;
  price: number;
  shops: number;
  saving?: number;
  image: string;
  category: "phone" | "laptop";
  tint: "mint" | "blue" | "coral" | "gold";
};

export const products: Product[] = [
  { name: "Samsung Galaxy S25 Ultra", variant: "12/256 GB", price: 389999, shops: 7, saving: 62000, image: phoneGraphite, category: "phone", tint: "blue" },
  { name: "Apple iPhone 16 Pro", variant: "256 GB", price: 424999, shops: 6, saving: 74500, image: phoneGraphite, category: "phone", tint: "gold" },
  { name: "Google Pixel 9 Pro", variant: "16/256 GB", price: 289999, shops: 5, saving: 58000, image: phoneMint, category: "phone", tint: "mint" },
  { name: "Xiaomi 15", variant: "12/512 GB", price: 249999, shops: 8, saving: 41000, image: phoneMint, category: "phone", tint: "coral" },
  { name: "Infinix Note 50 Pro", variant: "12/256 GB", price: 84999, shops: 6, image: phoneMint, category: "phone", tint: "mint" },
  { name: "Samsung Galaxy A56", variant: "8/256 GB", price: 137999, shops: 8, saving: 18500, image: phoneMint, category: "phone", tint: "blue" },
  { name: "Apple MacBook Air M4", variant: "16/256 GB", price: 319999, shops: 5, saving: 53500, image: laptopSilver, category: "laptop", tint: "blue" },
  { name: "HP Victus 15", variant: "Core i7 · RTX 4050", price: 284999, shops: 4, image: laptopGaming, category: "laptop", tint: "coral" },
  { name: "Lenovo IdeaPad Slim 5", variant: "Core Ultra 5 · 16 GB", price: 189999, shops: 5, saving: 22000, image: laptopSilver, category: "laptop", tint: "gold" },
  { name: "ASUS TUF Gaming A15", variant: "Ryzen 7 · RTX 4060", price: 329999, shops: 4, saving: 36000, image: laptopGaming, category: "laptop", tint: "blue" },
];

export const worldwideDeals = [
  { name: "iPhone 16 Pro 256 GB", local: 424999, country: "🇦🇪 UAE", global: 350499, saving: 74500, percent: 18 },
  { name: "Galaxy S25 Ultra 256 GB", local: 389999, country: "🇺🇸 USA", global: 327999, saving: 62000, percent: 16 },
  { name: "MacBook Air M4 16/256", local: 319999, country: "🇲🇾 Malaysia", global: 266499, saving: 53500, percent: 17 },
  { name: "Google Pixel 9 Pro", local: 289999, country: "🇯🇵 Japan", global: 231999, saving: 58000, percent: 20 },
];

export const quickFilters = ["Phones under 50k", "Phones under 100k", "Laptops under 150k", "Gaming laptops", "iPhones", "Samsung"];
export const brands = ["Samsung", "Apple", "Xiaomi", "Infinix", "Tecno", "Vivo", "Oppo", "Realme", "HP", "Dell", "Lenovo", "ASUS"];
export const phoneBudgets = ["Under 30k", "30–60k", "60–100k", "100–200k", "200k+"];
export const laptopBudgets = ["Under 100k", "100–150k", "150–250k", "250k+"];

export const formatPKR = (value: number) => `PKR ${value.toLocaleString("en-PK")}`;