"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useFadeIn } from "@/hooks/use-fade-in";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Coffee, Leaf, ShieldCheck, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";

const FEATURED_COFFEE = [
  {
    id: "1",
    name: "Classic Latte",
    description: "Smooth espresso with steamed milk and a thin layer of foam.",
    price: 4.50,
    origin: "Signature Blend",
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&q=80"
  },
  {
    id: "3",
    name: "Iced Cold Brew",
    description: "Slow-steeped for 20 hours for a super smooth, full-bodied flavor.",
    price: 4.75,
    origin: "Single Origin",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80"
  },
  {
    id: "5",
    name: "Almond Croissant",
    description: "Buttery, flaky pastry filled with sweet almond cream.",
    price: 4.25,
    origin: "Fresh Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80"
  },
];

export default function Home() {
  const heroFade = useFadeIn(0.2);
  const addItem = useCartStore((state) => state.addItem);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-coffee-950 text-cream-50">
        <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80')] bg-cover bg-center" />
        <motion.div 
          ref={heroFade.ref}
          initial={heroFade.initial}
          animate={heroFade.animate}
          variants={heroFade.variants}
          className="relative z-10 text-center space-y-8 px-4"
        >
          <div className="space-y-4">
            <span className="text-accent-burnt font-bold tracking-[0.3em] uppercase text-sm block">Established 2026</span>
            <h1 className="text-6xl md:text-8xl font-serif">Rizcaya Coffee</h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto text-coffee-100">
              Crafted Coffee, Curated Moments. Experience the art of small-batch roasting in every sip.
            </p>
          </div>
          <div className="flex gap-6 justify-center">
            <Link href="/menu">
              <Button size="lg" className="bg-accent-burnt hover:bg-opacity-90 h-14 px-10 text-lg">
                Explore Menu
              </Button>
            </Link>
            <Link href="/blog">
              <Button size="lg" variant="outline" className="text-cream-50 border-cream-50 hover:bg-cream-50 hover:text-coffee-950 h-14 px-10 text-lg">
                The Journal
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-coffee-200"
        >
          <div className="w-px h-12 bg-gradient-to-b from-coffee-200 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Featured Menu Preview */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-coffee-950">Featured Selections</h2>
            <p className="text-coffee-800 max-w-md italic">
              A glimpse into our seasonal favorites, handcrafted daily by our expert baristas and bakers.
            </p>
          </div>
          <Link href="/menu">
            <Button variant="link" className="text-accent-burnt text-lg group">
              View Full Menu <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {FEATURED_COFFEE.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="overflow-hidden border-none shadow-none bg-transparent">
                <div className="aspect-[4/5] bg-coffee-100 relative mb-6 overflow-hidden rounded-2xl">
                   <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-coffee-950/0 group-hover:bg-coffee-950/20 transition-colors duration-500" />
                   <div className="absolute bottom-6 right-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     <Button 
                        onClick={() => addItem({ ...item, quantity: 1 })}
                        className="rounded-full shadow-2xl bg-white text-coffee-950 hover:bg-accent-burnt hover:text-white h-12 w-12 p-0"
                      >
                        <ShoppingCart size={20} />
                     </Button>
                   </div>
                </div>
                <CardHeader className="p-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-serif mb-1">{item.name}</CardTitle>
                      <CardDescription className="uppercase tracking-[0.2em] text-[10px] font-bold text-coffee-400">
                        {item.origin}
                      </CardDescription>
                    </div>
                    <p className="font-bold text-lg text-coffee-950">{formatPrice(item.price)}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-0 mt-4">
                  <p className="text-coffee-700 leading-relaxed font-light italic">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-cream-100">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-center">
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-accent-burnt shadow-sm">
              <Leaf size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-coffee-950">Pure Origin</h3>
            <p className="text-coffee-700 font-light leading-relaxed">
              We source only the highest quality, single-origin beans from sustainable farms worldwide.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-accent-burnt shadow-sm">
              <Coffee size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-coffee-950">Artisan Roast</h3>
            <p className="text-coffee-700 font-light leading-relaxed">
              Small-batch roasted in Seattle to unlock the unique flavor profile inherent in every bean.
            </p>
          </div>
          <div className="space-y-6">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto text-accent-burnt shadow-sm">
              <ShieldCheck size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-serif text-coffee-950">Daily Fresh</h3>
            <p className="text-coffee-700 font-light leading-relaxed">
              Our pastries are baked before dawn and our coffee is roasted fresh weekly for peak flavor.
            </p>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 bg-coffee-950 text-cream-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80')] bg-cover bg-fixed" />
        <div className="max-w-2xl mx-auto text-center px-6 space-y-10 relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif">Join the Brew Club</h2>
          <p className="text-xl text-coffee-200 font-light">
            Subscribe to receive brewing tips, exclusive early access to limited roasts, and stories from the farm.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md px-6 py-4 text-cream-50 focus:ring-2 focus:ring-accent-burnt outline-none transition-all"
            />
            <Button className="bg-accent-burnt hover:bg-opacity-90 h-14 px-8 text-lg font-bold">Join</Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-coffee-100 bg-cream-50 text-coffee-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-6 col-span-1 md:col-span-2">
            <div className="font-serif text-3xl text-coffee-950 font-bold">Rizcaya Coffee</div>
            <p className="max-w-xs text-coffee-600 font-light leading-relaxed">
              Crafting premium coffee experiences since 2026. Every cup is a commitment to quality and community.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-serif text-xl text-coffee-950 font-bold">Navigation</h4>
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link href="/" className="hover:text-accent-burnt transition-colors">Home</Link>
              <Link href="/menu" className="hover:text-coffee-950 transition-colors">Menu</Link>
              <Link href="/blog" className="hover:text-coffee-950 transition-colors">Journal</Link>
              <Link href="/about" className="hover:text-coffee-950 transition-colors">About Us</Link>
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-serif text-xl text-coffee-950 font-bold">Visit Us</h4>
            <p className="text-sm font-light leading-relaxed">
              123 Artisan Alley<br />
              Seattle, WA 98101<br />
              Mon - Sun: 7am - 7pm
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-coffee-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-widest uppercase text-coffee-400">
          <p>© 2026 Rizcaya Coffee. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-coffee-950 transition-colors">Privacy</a>
            <a href="#" className="hover:text-coffee-950 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
