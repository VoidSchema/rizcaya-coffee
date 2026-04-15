"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

const POST_CONTENT = {
  "art-of-the-perfect-pour-over": {
    title: "The Art of the Perfect Pour Over",
    subtitle: "A meditative guide to brewing your most flavorful cup yet.",
    date: "April 12, 2026",
    author: "Elena Rivers",
    category: "Brewing Guides",
    image: "https://images.unsplash.com/photo-1544787210-2213d2499f7b?auto=format&fit=crop&q=80",
    content: `
      <p>Pour-over coffee is more than just a way to extract caffeine—it's a ritual that honors the journey of the bean from soil to cup. Unlike automated drip machines, the pour-over method gives you full control over every variable: temperature, flow rate, and bloom time.</p>
      
      <h2>The Essentials</h2>
      <p>Before you begin, ensure you have a clean dripper (we prefer ceramic for heat retention), a gooseneck kettle, and freshly ground beans. The grind size should resemble sea salt—medium-coarse to allow for a steady 3-minute extraction.</p>
      
      <blockquote>"The secret to a great pour-over isn't just the technique; it's the patience you bring to the process."</blockquote>
      
      <h2>The Technique</h2>
      <p>Start with the bloom. Pour twice the weight of the coffee in water and wait 30 seconds. This allows CO2 to escape, preventing a sour extraction. From there, pour in steady, concentric circles, maintaining a consistent water level in the dripper.</p>
    `,
  },
};

export default function BlogPostDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const post = POST_CONTENT[slug as keyof typeof POST_CONTENT];

  if (!post) {
    return (
      <div className="pt-40 text-center">
        <h1 className="text-2xl font-serif">Post not found</h1>
        <Link href="/blog" className="text-accent-burnt underline">Return to journal</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Header */}
      <header className="relative h-[70vh] w-full">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-coffee-950/40 flex items-end">
          <div className="max-w-4xl mx-auto px-6 pb-16 w-full text-cream-50 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-coffee-200 hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Journal
              </Link>
              <span className="block text-accent-burnt font-bold tracking-widest uppercase text-xs">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif leading-tight">
                {post.title}
              </h1>
              <p className="text-xl md:text-2xl font-light text-coffee-100 max-w-2xl">
                {post.subtitle}
              </p>
              <div className="flex items-center gap-8 pt-4 text-sm text-coffee-200">
                <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
                <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-2xl mx-auto px-6 pt-20">
        <div className="flex justify-between items-center mb-12 py-6 border-y border-coffee-100">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-coffee-500 hover:text-accent-burnt">
              <Share2 size={18} className="mr-2" /> Share
            </Button>
            <Button variant="ghost" size="sm" className="text-coffee-500 hover:text-accent-burnt">
              <Bookmark size={18} className="mr-2" /> Save
            </Button>
          </div>
          <div className="text-xs uppercase tracking-widest text-coffee-400">
            5 Min Read
          </div>
        </div>

        <div 
          className="prose prose-coffee prose-lg max-w-none 
            prose-headings:font-serif prose-headings:text-coffee-950
            prose-p:text-coffee-800 prose-p:leading-relaxed prose-p:font-light
            prose-blockquote:border-l-accent-burnt prose-blockquote:bg-cream-100 prose-blockquote:p-8 prose-blockquote:italic prose-blockquote:rounded-r-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-20 pt-12 border-t border-coffee-100">
          <h3 className="font-serif text-2xl mb-8 text-center">About the Author</h3>
          <div className="flex items-center gap-6 bg-cream-100 p-8 rounded-2xl">
            <div className="w-20 h-20 rounded-full bg-coffee-200 overflow-hidden flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80" alt={post.author} className="w-full h-full object-cover" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-coffee-950">{post.author}</h4>
              <p className="text-sm text-coffee-700 font-light leading-relaxed">
                Elena is a SCA-certified barista and coffee educator with over 10 years of experience in specialty roasting. She believes that every bean has a story worth telling.
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
