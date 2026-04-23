export type ProductFeature = {
  title: string;
  description: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Review = {
  author: string;
  rating: number; // 1–5
  comment: string;
  date: string;
};

export type Product = {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  features: ProductFeature[];
  specs: ProductSpec[];
  price: number;
  currency: string;
  availability: "in_stock" | "out_of_stock";
  sku: string;
  brand: string;
  images: {
    url: string;
    alt: string;
  }[];
  reviews: Review[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt?: string;
  relatedSlugs: string[];
};

/** In-memory catalog used by Route Handlers (`/api/products`). */
export const PRODUCTS: Product[] = [
  {
    slug: "smart-digital-meat-thermometer",
    name: "Smart Digital Meat Thermometer",
    description:
      "Wireless meat thermometer with real-time temperature tracking for perfect cooking results.",
    longDescription:
      "The Smart Digital Meat Thermometer helps you cook meat to perfection every time. With wireless connectivity and a companion mobile app, you can monitor temperatures remotely and receive alerts when your food is ready. Ideal for grilling, roasting, and sous vide cooking.",
    features: [
      {
        title: "Wireless Monitoring",
        description:
          "Track internal meat temperature from your phone without opening the oven or grill.",
      },
      {
        title: "High Precision Sensor",
        description:
          "Accurate readings within ±1°C for consistent cooking results.",
      },
      {
        title: "App Integration",
        description:
          "Receive alerts, presets, and cooking recommendations through the mobile app.",
      },
    ],
    specs: [
      { label: "Temperature Range", value: "-10°C to 300°C" },
      { label: "Battery Life", value: "24 hours" },
      { label: "Connectivity", value: "Bluetooth 5.0" },
    ],
    price: 49.99,
    currency: "USD",
    availability: "in_stock",
    sku: "KT-THERMO-001",
    brand: "CookSmart",
    images: [
      {
        url: "/images/thermometer.png",
        alt: "Wireless digital meat thermometer inserted into a steak",
      },
    ],
    reviews: [
      {
        author: "Emily",
        rating: 5,
        comment: "Game changer for grilling. Perfect steaks every time.",
        date: "2024-03-05",
      },
      {
        author: "Daniel",
        rating: 4,
        comment: "Very accurate, but app could be improved.",
        date: "2024-03-12",
      },
    ],
    rating: 4.5,
    reviewCount: 2,
    createdAt: "2024-01-10",
    updatedAt: "2024-03-18",
    relatedSlugs: ["electric-milk-frother"],
  },
  {
    slug: "electric-milk-frother",
    name: "Electric Milk Frother",
    description:
      "Create barista-quality foam at home with this compact electric milk frother.",
    longDescription:
      "This Electric Milk Frother lets you create creamy, rich foam for lattes, cappuccinos, and hot chocolate in seconds. Its compact design and one-touch operation make it perfect for everyday use in any kitchen.",
    features: [
      {
        title: "One-Touch Operation",
        description: "Easily froth milk with a single button press.",
      },
      {
        title: "Hot & Cold Frothing",
        description: "Prepare both hot and cold foam for a variety of drinks.",
      },
      {
        title: "Non-Stick Interior",
        description: "Easy to clean with a durable non-stick coating.",
      },
    ],
    specs: [
      { label: "Capacity", value: "240ml" },
      { label: "Power", value: "500W" },
      { label: "Material", value: "Stainless Steel" },
    ],
    price: 29.99,
    currency: "USD",
    availability: "in_stock",
    sku: "KT-FROTHER-002",
    brand: "BrewEase",
    images: [
      {
        url: "/images/frother.png",
        alt: "Electric milk frother creating foam for a latte",
      },
    ],
    reviews: [
      {
        author: "Sophia",
        rating: 5,
        comment: "Makes amazing foam, just like a coffee shop!",
        date: "2024-02-18",
      },
    ],
    rating: 5,
    reviewCount: 1,
    createdAt: "2024-02-01",
    relatedSlugs: ["smart-digital-meat-thermometer"],
  },
];
