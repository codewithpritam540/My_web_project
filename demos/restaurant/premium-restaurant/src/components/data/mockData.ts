export interface Dish {
  id: string;
  name: string;
  category: 'Salad' | 'Bowl' | 'Vegan' | 'Detox' | 'Main';
  image: string;
  description: string;
  price: number;
  calories?: number;
  tags?: string[];
}

export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface HeroContent {
  headline: string;
  subtext: string;
  image: string;
  ctaText: string;
}

export const heroContent: HeroContent = {
  headline: "Where every ingredient tells a story",
  subtext: "Experience the art of clean eating with chef-curated organic dishes sourced from local farms",
  image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1920&q=80",
  ctaText: "Explore Our Menus"
};

export const dishes: Dish[] = [
  {
    id: "1",
    name: "Tuscan Harvest Bowl",
    category: "Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    description: "Ancient grains, roasted vegetables, tahini drizzle, and fresh herbs",
    price: 18,
    calories: 520,
    tags: ["GF", "Vegan"]
  },
  {
    id: "2",
    name: "Mediterranean Greens",
    category: "Salad",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
    description: "Baby kale, cucumber, tomatoes, olives, feta, lemon vinaigrette",
    price: 16,
    calories: 340,
    tags: ["GF", "Vegetarian"]
  },
  {
    id: "3",
    name: "Golden Glow Detox",
    category: "Detox",
    image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=800&q=80",
    description: "Turmeric quinoa, golden beets, citrus segments, ginger dressing",
    price: 20,
    calories: 380,
    tags: ["GF", "Vegan", "Detox"]
  },
  {
    id: "4",
    name: "Forest Mushroom Risotto",
    category: "Main",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
    description: "Wild mushrooms, arborio rice, truffle oil, parmesan crisp",
    price: 24,
    calories: 580,
    tags: ["GF", "Vegetarian"]
  },
  {
    id: "5",
    name: "Ocean's Bounty Poke",
    category: "Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    description: "Sustainably caught tuna, avocado, edamame, pickled ginger",
    price: 22,
    calories: 450,
    tags: ["GF", "Dairy-Free"]
  },
  {
    id: "6",
    name: "Roasted Root Symphony",
    category: "Vegan",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=800&q=80",
    description: "Seasonal root vegetables, herb-roasted, cashew cream",
    price: 19,
    calories: 420,
    tags: ["GF", "Vegan"]
  },
  {
    id: "7",
    name: "Citrus & Avocado Zen",
    category: "Salad",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&q=80",
    description: "Grapefruit, orange, avocado, watercress, citrus vinaigrette",
    price: 15,
    calories: 290,
    tags: ["GF", "Vegan"]
  },
  {
    id: "8",
    name: "Green Vitality Bowl",
    category: "Bowl",
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80",
    description: "Spinach, kale, green apple, walnuts, hemp seeds, matcha dressing",
    price: 17,
    calories: 360,
    tags: ["GF", "Vegan", "Detox"]
  }
];

export const reservations: Reservation[] = [
  {
    id: "res-1",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+1 555-0123",
    date: "2025-02-15",
    time: "19:00",
    guests: 4,
    status: "confirmed",
    specialRequests: "Window table preferred",
    createdAt: "2025-02-10T10:30:00Z"
  },
  {
    id: "res-2",
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+1 555-0456",
    date: "2025-02-16",
    time: "20:00",
    guests: 2,
    status: "pending",
    createdAt: "2025-02-11T14:20:00Z"
  },
  {
    id: "res-3",
    name: "Emma Williams",
    email: "emma.w@email.com",
    phone: "+1 555-0789",
    date: "2025-02-14",
    time: "18:30",
    guests: 6,
    status: "confirmed",
    specialRequests: "Celebration dinner - birthday cake",
    createdAt: "2025-02-09T09:15:00Z"
  }
];

export const brandContent = {
  philosophy: {
    headline: "Clean Food. Real Ingredients. No Compromise.",
    pillars: [
      {
        title: "Organic Sourcing",
        description: "We partner with local organic farms within 100 miles to ensure the freshest produce reaches your plate within 24 hours of harvest."
      },
      {
        title: "Farm-to-Table",
        description: "Our direct relationships with farmers eliminate middlemen, ensuring fair prices for growers and the highest quality for you."
      },
      {
        title: "No Preservatives",
        description: "Every dish is prepared fresh daily. No artificial additives, no shortcuts, no compromises on quality."
      },
      {
        title: "Chef Curated",
        description: "Our Michelin-trained chefs craft each menu item with intention, balancing nutrition and exceptional flavor."
      }
    ]
  },
  stats: {
    organicIngredients: "100%",
    localFarms: "25+",
    yearsExperience: "15",
    happyGuests: "50K+"
  }
};