"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useFadeIn } from "@/hooks/use-fade-in";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Coffee, Leaf, ShieldCheck } from "lucide-react";

const FEATURED_COFFEE = [
  {
    id: "1",
    name: "Ethiopian Yirgacheffe",
    description: "Floral notes with a hint of citrus and a tea-like body.",
    price: 24.00,
    origin: "Ethiopia",
  },
  {
    id: "2",
    name: "Colombian Supremo",
    description: "Well-balanced with notes of caramel and red apple.",
    price: 19.50,
    origin: "Colombia",
  },
  {
    id: "3",
    name: "Sumatra Mandheling",
    description: "Earthy, full-bodied with a smooth, heavy finish.",
    price: 22.00,
    origin: "Indonesia",
  },
];

export default function Home() {
  const heroFade = useFadeIn(0.2);
  const featureFade = useFadeIn(0.4);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-coffee-950 text-cream-50">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <motion.div 
          ref={heroFade.ref}
          initial={heroFade.initial}
          animate={heroFade.animate}
          variants={heroFade.variants}
          className="relative z-10 text-center space-y-6 px-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif">Rizcaya Coffee</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-coffee-200">
            Artisanal roasts for the modern connoisseur. Hand-selected, small-batch, and delivered to your doorstep.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-accent-burnt hover:bg-opacity-90">
              Shop Collections
            </Button>
            <Button size="lg" variant="outline" className="text-cream-50 border-cream-50 hover:bg-cream-50 hover:text-coffee-950">
              Our Story
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto text-coffee-900">
              <Leaf size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold">Ethically Sourced</h3>
            <p className="text-coffee-800">We work directly with farmers to ensure fair wages and sustainable practices.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto text-coffee-900">
              <Coffee size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold">Small Batch Roasting</h3>
            <p className="text-coffee-800">Every bean is roasted to perfection in our artisanal roastery in Seattle.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-coffee-100 rounded-full flex items-center justify-center mx-auto text-coffee-900">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-serif font-bold">Guaranteed Freshness</h3>
            <p className="text-coffee-800">Roasted on order and shipped within 24 hours for maximum flavor preservation.</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-serif">Seasonal Selections</h2>
            <p className="text-coffee-800">Explore our current favorites, chosen for their unique flavor profiles.</p>
          </div>
          <Button variant="link" className="text-accent-burnt">View All Products</Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {FEATURED_COFFEE.map((coffee, index) => (
            <motion.div
              key={coffee.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-none shadow-none bg-transparent group">
                <div className="aspect-[4/5] bg-coffee-100 relative mb-4 overflow-hidden rounded-lg">
                   {/* Placeholder for coffee image */}
                   <div className="absolute inset-0 flex items-center justify-center text-coffee-300">
                      <Coffee size={64} strokeWidth={1} />
                   </div>
                   <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                     <Button size="sm" className="rounded-full shadow-lg">
                        <ShoppingCart size={16} className="mr-2" /> Add to Cart
                     </Button>
                   </div>
                </div>
                <CardHeader className="p-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-1">{coffee.name}</CardTitle>
                      <CardDescription className="uppercase tracking-widest text-xs">{coffee.origin}</CardDescription>
                    </div>
                    <p className="font-semibold text-coffee-900">{formatPrice(coffee.price)}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <p className="text-sm text-coffee-700 leading-relaxed italic">
                    "{coffee.description}"
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-coffee-900 text-cream-50 mt-20">
        <div className="max-w-2xl mx-auto text-center px-4 space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif">Join the Brew Club</h2>
          <p className="text-coffee-200">
            Subscribe to receive brewing tips, exclusive early access to limited roasts, and stories from the farm.
          </p>
          <form className="flex gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-coffee-800 border-none rounded-md px-4 py-2 text-cream-50 focus:ring-2 focus:ring-accent-burnt outline-none"
            />
            <Button className="bg-accent-burnt hover:bg-opacity-90">Join</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-coffee-200 text-coffee-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif text-2xl text-coffee-950">Rizcaya Coffee</div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-coffee-950 transition-colors">Shop</a>
            <a href="#" className="hover:text-coffee-950 transition-colors">Wholesale</a>
            <a href="#" className="hover:text-coffee-950 transition-colors">About Us</a>
            <a href="#" className="hover:text-coffee-950 transition-colors">Brew Guide</a>
          </div>
          <p className="text-xs">© 2026 Rizcaya Coffee. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
