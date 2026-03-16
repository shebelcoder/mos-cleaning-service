export const SERVICE_PRICES: Record<string, number> = {
  residential: 120,
  commercial: 180,
  "move-in-out": 200,
  deep: 160,
  "post-construction": 250,
};

export const BEDROOM_MULTIPLIER: Record<number, number> = {
  1: 1.0,
  2: 1.2,
  3: 1.4,
  4: 1.6,
  5: 1.8,
};

export const EXTRAS_PRICES: Record<string, number> = {
  fridge: 35,
  oven: 35,
  windows: 50,
  laundry: 25,
  dishes: 20,
  "wall-washing": 60,
  "garage-cleaning": 80,
  "basement-cleaning": 70,
};

export const EXTRAS_LIST = [
  { id: "fridge", label: "Inside Fridge Cleaning", price: 35 },
  { id: "oven", label: "Inside Oven Cleaning", price: 35 },
  { id: "windows", label: "Interior Window Cleaning", price: 50 },
  { id: "laundry", label: "Laundry (Wash & Dry)", price: 25 },
  { id: "dishes", label: "Dishes", price: 20 },
  { id: "wall-washing", label: "Wall Washing", price: 60 },
  { id: "garage-cleaning", label: "Garage Cleaning", price: 80 },
  { id: "basement-cleaning", label: "Basement Cleaning", price: 70 },
];

export function calculatePrice(
  serviceType: string,
  bedrooms: number | null,
  extras: string[]
): number {
  const base = SERVICE_PRICES[serviceType] ?? 120;
  const bedroomMultiplier =
    bedrooms && BEDROOM_MULTIPLIER[bedrooms]
      ? BEDROOM_MULTIPLIER[bedrooms]
      : bedrooms && bedrooms > 5
      ? 2.0
      : 1.0;
  const extrasTotal = extras.reduce(
    (sum, extra) => sum + (EXTRAS_PRICES[extra] ?? 0),
    0
  );
  return Math.round(base * bedroomMultiplier + extrasTotal);
}
