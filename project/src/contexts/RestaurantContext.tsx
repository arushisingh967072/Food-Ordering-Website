import React, { createContext, useContext, useState } from 'react';

interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  description: string;
  address: string;
  phone: string;
  isOpen: boolean;
  menu: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVegetarian: boolean;
  isSpicy: boolean;
  customizations?: string[];
}

interface RestaurantContextType {
  restaurants: Restaurant[];
  searchQuery: string;
  selectedCuisine: string;
  sortBy: string;
  setSearchQuery: (query: string) => void;
  setSelectedCuisine: (cuisine: string) => void;
  setSortBy: (sort: string) => void;
  getRestaurantById: (id: string) => Restaurant | undefined;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

// Mock data
const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Palace',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: '25-35 min',
    deliveryFee: 2.99,
    minimumOrder: 15,
    description: 'Authentic Italian pizza with fresh ingredients',
    address: '123 Main St, Downtown',
    phone: '+1-555-0123',
    isOpen: true,
    menu: [
      {
        id: '1',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, basil',
        price: 12.99,
        image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
        category: 'Pizza',
        isVegetarian: true,
        isSpicy: false,
        customizations: ['Extra cheese', 'Thin crust', 'Gluten-free']
      },
      {
        id: '2',
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, tomato sauce',
        price: 14.99,
        image: 'https://images.pexels.com/photos/845808/pexels-photo-845808.jpeg',
        category: 'Pizza',
        isVegetarian: false,
        isSpicy: false
      }
    ]
  },
  {
    id: '2',
    name: 'Burger House',
    image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg',
    cuisine: 'American',
    rating: 4.2,
    deliveryTime: '20-30 min',
    deliveryFee: 1.99,
    minimumOrder: 12,
    description: 'Gourmet burgers and fries',
    address: '456 Oak Ave, Midtown',
    phone: '+1-555-0456',
    isOpen: true,
    menu: [
      {
        id: '3',
        name: 'Classic Cheeseburger',
        description: 'Beef patty, cheddar cheese, lettuce, tomato',
        price: 9.99,
        image: 'https://images.pexels.com/photos/1639565/pexels-photo-1639565.jpeg',
        category: 'Burgers',
        isVegetarian: false,
        isSpicy: false
      }
    ]
  },
  {
    id: '3',
    name: 'Sushi Zen',
    image: 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: '30-45 min',
    deliveryFee: 3.99,
    minimumOrder: 20,
    description: 'Fresh sushi and Japanese cuisine',
    address: '789 Cherry Blossom St',
    phone: '+1-555-0789',
    isOpen: true,
    menu: [
      {
        id: '4',
        name: 'California Roll',
        description: 'Crab, avocado, cucumber, sesame seeds',
        price: 8.99,
        image: 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg',
        category: 'Sushi',
        isVegetarian: false,
        isSpicy: false
      }
    ]
  }
];

export function RestaurantProvider({ children }: { children: React.ReactNode }) {
  const [restaurants] = useState<Restaurant[]>(mockRestaurants);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  const getRestaurantById = (id: string) => {
    return restaurants.find(restaurant => restaurant.id === id);
  };

  return (
    <RestaurantContext.Provider value={{
      restaurants,
      searchQuery,
      selectedCuisine,
      sortBy,
      setSearchQuery,
      setSelectedCuisine,
      setSortBy,
      getRestaurantById
    }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurants() {
  const context = useContext(RestaurantContext);
  if (context === undefined) {
    throw new Error('useRestaurants must be used within a RestaurantProvider');
  }
  return context;
}