"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BLOG_POSTS = [
  {
    id: "1",
    slug: "art-of-the-perfect-pour-over",
    title: "The Art of the Perfect Pour Over",
    excerpt: "Discover the meditative process and precise techniques behind brewing the cleanest cup of coffee.",
    date: "April 12, 2026",
    author: "Elena Rivers",
    category: "Brewing Guides",
    image: "https://images.unsplash.com/photo-1544787210-2213d2499f7b?auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    slug: "sourcing-ethically-why-it-matters",
    title: "Sourcing Ethically: Why It Matters",
    excerpt: "A deep dive into our direct-trade relationships and how they support sustainable farming communities.",
    date: "April 8, 2026",
    author: "Marcus Thorne",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    slug: "espresso-vs-filter-understanding-the-roast",
    title: "Espresso vs Filter: Understanding the Roast",
    excerpt: "Learn how different roasting profiles unlock unique flavor notes for your favorite brewing methods.",
    date: "April 5, 2026",
    author: "Elena Rivers",
    category: "Coffee Science",
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80",
  },
];

export default function BlogPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="max-w-3xl mb-16 space-y-4">
        <h1 className="text-4xl md:text-6xl font-serif text-coffee-950">The Journal</h1>
        <p className="text-lg text-coffee-800 font-light">
          Stories from the farm, brewing techniques, and the culture of craft coffee.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Main Feed */}
        <div className="flex-1 space-y-12">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="grid md:grid-cols-2 gap-8 items-center">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-coffee-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent-burnt font-bold">
                    {post.category}
                  </span>
                  <h2 className="text-3xl font-serif text-coffee-950 group-hover:text-accent-burnt transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-coffee-700 font-light line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-coffee-500 pt-2">
                    <span className="flex items-center gap-2">
                      <Calendar size={14} /> {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <User size={14} /> {post.author}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-12">
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Search Journal</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-coffee-400" size={16} />
              <input
                type="text"
                placeholder="Find a topic..."
                className="w-full bg-cream-100 border-none rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-accent-burnt outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Categories</h3>
            <nav className="flex flex-wrap gap-2">
              {["Brewing", "Sustainability", "Culture", "Roasting", "Recipes"].map((cat) => (
                <button
                  key={cat}
                  className="px-4 py-1.5 rounded-full border border-coffee-200 text-xs font-medium hover:border-accent-burnt hover:text-accent-burnt transition-all"
                >
                  {cat}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-coffee-900 rounded-2xl p-8 text-cream-50 space-y-4">
            <h3 className="font-serif text-2xl">Brew better coffee at home.</h3>
            <p className="text-sm text-coffee-200 leading-relaxed">
              Join 10k+ coffee lovers receiving our weekly brew guides and limited roast alerts.
            </p>
            <input
              type="email"
              placeholder="Your email"
              className="w-full bg-coffee-800 border-none rounded-lg px-4 py-2 text-sm text-cream-50 outline-none focus:ring-1 focus:ring-accent-burnt"
            />
            <Button className="w-full bg-accent-burnt hover:bg-opacity-90">Subscribe</Button>
          </div>
        </aside>
      </div>
    </main>
  );
}
