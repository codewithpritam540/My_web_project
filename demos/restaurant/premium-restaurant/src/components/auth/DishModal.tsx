import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Flame, Leaf, Info } from 'lucide-react';
import { useState } from 'react';
import type { Dish } from '@/data/mockData';

interface DishModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DishModal = ({ dish, isOpen, onClose }: DishModalProps) => {
  const [quantity, setQuantity] = useState(1);

  if (!dish) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Image */}
            <div className="relative h-64 sm:h-80">
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute bottom-4 left-6">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
                  {dish.category === 'Vegan' || dish.category === 'Salad' ? (
                    <Leaf className="w-4 h-4 text-green-600" />
                  ) : (
                    <Flame className="w-4 h-4 text-orange-500" />
                  )}
                  {dish.category}
                </span>
              </div>

              {/* Tags */}
              {dish.tags && (
                <div className="absolute top-4 left-6 flex gap-2">
                  {dish.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-green-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-2xl sm:text-3xl font-display text-gray-900">
                  {dish.name}
                </h2>
                <span className="text-2xl font-semibold text-green-700">
                  ${dish.price}
                </span>
              </div>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {dish.description}
              </p>

              {/* Nutrition Info */}
              {dish.calories && (
                <div className="flex items-center gap-2 mb-6 p-4 bg-gray-50 rounded-xl">
                  <Info className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">{dish.calories} calories</span> per serving
                  </span>
                </div>
              )}

              {/* Ingredients Preview */}
              <div className="mb-8">
                <h4 className="font-semibold text-gray-900 mb-3">Key Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {['Organic', 'Locally Sourced', 'Fresh Daily', 'Non-GMO'].map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-sm"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="w-8 text-center font-semibold">{quantity}</span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-gray-900 shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>

                <motion.button
                  className="flex-1 py-4 bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add to Order — ${(dish.price * quantity).toFixed(2)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};