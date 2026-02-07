import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation, useStaggerAnimation } from '@/hooks/useScrollAnimation';
import { dishes, type Dish } from '@/data/mockData';
import { Plus, Flame, Leaf, Droplets, UtensilsCrossed } from 'lucide-react';

interface MenuGalleryProps {
  onDishClick: (dish: Dish) => void;
}

const categories = ['All', 'Salad', 'Bowl', 'Vegan', 'Detox', 'Main'] as const;

const categoryIcons = {
  Salad: Leaf,
  Bowl: UtensilsCrossed,
  Vegan: Leaf,
  Detox: Droplets,
  Main: Flame,
};

export const MenuGallery = ({ onDishClick }: MenuGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
  const titleRef = useScrollAnimation();
  const gridRef = useStaggerAnimation();

  const filteredDishes = activeCategory === 'All' 
    ? dishes 
    : dishes.filter(dish => dish.category === activeCategory);

  return (
    <section id="menus" className="py-24 lg:py-32 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-lime-600 text-sm font-semibold tracking-wider uppercase mb-4"
          >
            Our Collection
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-gray-900 mb-6">
            View Our Menus
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover chef-crafted dishes made with the finest organic ingredients, 
            sourced daily from local farms.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-green-700 text-white shadow-lg shadow-green-700/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Dish Grid */}
        <motion.div 
          ref={gridRef}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
                onClick={() => onDishClick(dish)}
              >
                <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <motion.img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    
                    {/* Quick Add Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ scale: 1.1 }}
                      className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Plus className="w-5 h-5 text-green-700" />
                    </motion.button>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800">
                        {(() => {
                          const Icon = categoryIcons[dish.category as keyof typeof categoryIcons] || Leaf;
                          return <Icon className="w-3.5 h-3.5" />;
                        })()}
                        {dish.category}
                      </span>
                    </div>

                    {/* Tags */}
                    {dish.tags && dish.tags.length > 0 && (
                      <div className="absolute top-4 right-4 flex flex-col gap-1">
                        {dish.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-green-600/90 backdrop-blur-sm rounded text-[10px] font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {dish.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                      {dish.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-semibold text-green-700">
                        ${dish.price}
                      </span>
                      {dish.calories && (
                        <span className="text-sm text-gray-500">
                          {dish.calories} cal
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            className="px-8 py-4 border-2 border-green-700 text-green-700 rounded-full font-medium hover:bg-green-700 hover:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Menu
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};