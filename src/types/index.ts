export interface MenuItem {
  id: string;
  name: string;
  category: 'crispy-chicken' | 'chicken-burgers' | 'zinger-burgers' | 'nuggets' | 'fries' | 'family-deals' | 'combos' | 'beverages';
  price: number; // in PKR
  originalPrice?: number;
  description: string;
  image: string;
  spicyLevel?: 'Mild' | 'Spicy' | 'Extra Spicy';
  pieceCount?: number;
  popular?: boolean;
  isNew?: boolean;
  options?: {
    flavors?: string[];
    drinkChoice?: string[];
  };
}

export interface DealItem {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discountBadge: string;
  itemsIncluded: string[];
  serves: string;
  image: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedFlavor?: string;
  selectedDrink?: string;
  specialInstructions?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  area: string;
  phone: string;
  timing: string;
  dineIn: boolean;
  takeaway: boolean;
  delivery: boolean;
  mapQuery: string;
}
