"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Search, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";

const CATEGORIES = ["All", "Hot Coffee", "Iced Coffee", "Espresso", "Pastries"];

const MENU_ITEMS = [
  { id: "1", name: "Classic Latte", category: "Hot Coffee", price: 4.50, description: "Smooth espresso with steamed milk and a thin layer of foam.", image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80" },
  { id: "2", name: "Caramel Macchiato", category: "Hot Coffee", price: 5.25, description: "Espresso with steamed milk, vanilla-flavored syrup, and caramel drizzle.", image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&q=80" },
  { id: "3", name: "Iced Cold Brew", category: "Iced Coffee", price: 4.75, description: "Slow-steeped for 20 hours for a super smooth, full-bodied flavor.", image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80" },
  { id: "4", name: "Double Espresso", category: "Espresso", price: 3.00, description: "Two shots of our signature blend, intense and rich.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&q=80" },
  { id: "5", name: "Almond Croissant", category: "Pastries", price: 4.25, description: "Buttery, flaky pastry filled with sweet almond cream.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80" },
  { id: "6", name: "Matcha Latte", category: "Hot Coffee", price: 5.50, description: "Premium grade matcha with creamy steamed milk.", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&q=80" },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif text-coffee-950">Our Menu</h1>
          <p className="text-coffee-800 max-w-md">
            Every cup is a story. Explore our curated selection of artisanal coffees and handcrafted pastries.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" size={18} />
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-cream-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-accent-burnt outline-none text-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-48 space-y-6">
          <h3 className="font-serif text-xl font-bold border-b border-coffee-100 pb-2">Categories</h3>
          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all text-left ${
                  activeCategory === cat
                    ? "bg-coffee-900 text-cream-50"
                    : "hover:bg-coffee-100 text-coffee-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="group overflow-hidden border-none shadow-none bg-white hover:shadow-xl transition-all duration-500 rounded-2xl">
                    <div className="aspect-square relative overflow-hidden bg-coffee-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-coffee-950/0 group-hover:bg-coffee-950/20 transition-colors duration-500" />
                      <Button
                        size="sm"
                        className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-white text-coffee-950 hover:bg-accent-burnt hover:text-white rounded-full shadow-lg"
                        onClick={() => addItem({ ...item, quantity: 1 })}
                      >
                        <ShoppingCart size={16} className="mr-2" /> Add
                      </Button>
                    </div>
                    <CardHeader className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-xl font-serif">{item.name}</CardTitle>
                        <span className="font-bold text-accent-burnt">{formatPrice(item.price)}</span>
                      </div>
                      <CardDescription className="text-coffee-700 line-clamp-2 italic">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="py-20 text-center space-y-4 opacity-50">
              <Coffee size={48} className="mx-auto" />
              <p className="font-serif text-xl">No items found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
