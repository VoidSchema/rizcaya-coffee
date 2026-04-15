"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, Coffee } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, addItem, totalPrice, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-coffee-950/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-cream-50 z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-coffee-100">
              <h2 className="text-2xl font-serif font-bold text-coffee-950">Your Cart</h2>
              <Button variant="ghost" size="sm" onClick={onClose} className="p-1">
                <X size={24} />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <Coffee size={48} strokeWidth={1} />
                  <p className="font-serif text-lg">Your cart is empty</p>
                  <Button variant="outline" onClick={onClose}>Continue Shopping</Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-coffee-100 rounded-lg flex items-center justify-center text-coffee-400 overflow-hidden">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <Coffee size={32} />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-coffee-950">{item.name}</h4>
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-coffee-200 rounded-md">
                          <button
                            className="p-1 hover:bg-coffee-100 disabled:opacity-30"
                            disabled={item.quantity <= 1}
                            onClick={() => addItem({ ...item, quantity: -1 })}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            className="p-1 hover:bg-coffee-100"
                            onClick={() => addItem({ ...item, quantity: 1 })}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-coffee-400 hover:text-accent-burnt transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-coffee-100 bg-white space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-coffee-800">Subtotal</span>
                  <span className="text-2xl font-serif font-bold text-coffee-950">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <Button className="w-full bg-coffee-900 hover:bg-coffee-800 text-cream-50 h-12 text-lg">
                  Checkout
                </Button>
                <button
                  onClick={clearCart}
                  className="w-full text-center text-xs text-coffee-400 hover:text-coffee-600 uppercase tracking-widest py-2"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
