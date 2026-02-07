import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { dishes, type Dish } from '@/data/mockData';
import { Plus, Flame, Leaf, Droplets, UtensilsCrossed, Sparkles } from 'lucide-react';
import { TiltCard, Reveal3D, ParallaxContainer } from '@/components/3d/ParallaxContainer';

gsap.registerPlugin(ScrollTrigger);

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

export const MenuGallery3D = ({ onDishClick }: MenuGalleryProps) => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>('All');
  const [hoveredDish, setHoveredDish] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Staggered reveal for cards
      gsap.fromTo(
        '.dish-card',
        { 
          opacity: 0, 
          y: 80,
          rotateX: 15,
          transformPerspective: 1000 
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, [activeCategory]);

  const filteredDishes = activeCategory === 'All'
    ? dishes
    : dishes.filter(dish => dish.category === activeCategory);

  return (
    <section 
      id="menus" 
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#faf9f6] relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-lime-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-200/30 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header with 3D Reveal */}
        <div ref={titleRef} className="text-center mb-16">
          <Reveal3D direction="bottom">
            <motion.span
              className="inline-flex items-center gap-2 text-lime-600 text-sm font-semibold tracking-wider uppercase mb-4"
            >
              <Sparkles className="w-4 h-4" />
              Our Collection
              <Sparkles className="w-4 h-4" />
            </motion.span>
          </Reveal3D>
          
          <Reveal3D direction="bottom" delay={0.1}>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display text-gray-900 mb-6">
              View Our Menus
            </h2>
          </Reveal3D>
          
          <Reveal3D direction="bottom" delay={0.2}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover chef-crafted dishes made with the finest organic ingredients,
              sourced daily from local farms.
            </p>
          </Reveal3D>
        </div>

        {/* Category Filter with 3D Hover */}
        <ParallaxContainer speed={0.3} className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category, index) => (
            <TiltCard key={category} maxTilt={10}>
              <motion.button
                onClick={() => setActiveCategory(category)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-green-700 text-white shadow-xl shadow-green-700/25'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-md'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            </TiltCard>
          ))}
        </ParallaxContainer>

        {/* Dish Grid with 3D Cards */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredDishes.map((dish) => (
              <motion.div
                key={dish.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="dish-card"
                style={{ perspective: '1000px' }}
              >
                <TiltCard maxTilt={12}>
                  <div
                    className="group cursor-pointer relative"
                    onClick={() => onDishClick(dish)}
                    onMouseEnter={() => setHoveredDish(dish.id)}
                    onMouseLeave={() => setHoveredDish(null)}
                  >
                    <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                      {/* Image Container with 3D Depth */}
                      <div className="relative aspect-square overflow-hidden">
                        <motion.img
                          src={dish.image}
                          alt={dish.name}
                          className="w-full h-full object-cover"
                          animate={{
                            scale: hoveredDish === dish.id ? 1.1 : 1,
                            rotateY: hoveredDish === dish.id ? 5 : 0,
                          }}
                          transition={{ duration: 0.5 }}
                        />

                        {/* Gradient Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                          animate={{ opacity: hoveredDish === dish.id ? 1 : 0.7 }}
                          transition={{ duration: 0.3 }}
                        />

                        {/* Quick Add Button */}
                        <motion.button
                          initial={{ opacity: 0, scale: 0.5, y: 20 }}
                          animate={{
                            opacity: hoveredDish === dish.id ? 1 : 0,
                            scale: hoveredDish === dish.id ? 1 : 0.5,
                            y: hoveredDish === dish.id ? 0 : 20,
                          }}
                          whileHover={{ scale: 1.1 }}
                          className="absolute bottom-4 right-4 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center"
                        >
                          <Plus className="w-6 h-6 text-green-700" />
                        </motion.button>

                        {/* Category Badge */}
                        <motion.div
                          className="absolute top-4 left-4"
                          animate={{ y: hoveredDish === dish.id ? -5 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/95 backdrop-blur-sm rounded-full text-xs font-medium text-gray-800 shadow-lg">
                            {(() => {
                              const Icon = categoryIcons[dish.category as keyof typeof categoryIcons] || Leaf;
                              return <Icon className="w-3.5 h-3.5" />;
                            })()}
                            {dish.category}
                          </span>
                        </motion.div>

                        {/* Tags */}
                        {dish.tags && dish.tags.length > 0 && (
                          <motion.div
                            className="absolute top-4 right-4 flex flex-col gap-2"
                            animate={{ y: hoveredDish === dish.id ? -5 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {dish.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1.5 bg-green-600/95 backdrop-blur-sm rounded-full text-[10px] font-semibold text-white shadow-lg"
                              >
                                {tag}
                              </span>
                            ))}
                          </motion.div>
                        )}

                        {/* Price Tag - Floating */}
                        <motion.div
                          className="absolute bottom-4 left-4"
                          animate={{
                            y: hoveredDish === dish.id ? -5 : 0,
                            opacity: hoveredDish === dish.id ? 0 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-2xl font-bold text-white drop-shadow-lg">
                            ${dish.price}
                          </span>
                        </motion.div>
                      </div>

                      {/* Content with Slide Up Effect */}
                      <motion.div
                        className="p-6"
                        animate={{ y: hoveredDish === dish.id ? -5 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                          {dish.name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {dish.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-green-700">
                            ${dish.price}
                          </span>
                          {dish.calories && (
                            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                              {dish.calories} cal
                            </span>
                          )}
                        </div>
                      </motion.div>

                      {/* Hover Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl pointer-events-none"
                        animate={{
                          boxShadow: hoveredDish === dish.id
                            ? '0 0 40px rgba(132, 204, 22, 0.3)'
                            : '0 0 0px rgba(132, 204, 22, 0)',
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Button with 3D Effect */}
        <Reveal3D direction="bottom" delay={0.3}>
          <div className="text-center mt-16">
            <TiltCard maxTilt={8}>
              <motion.button
                className="group px-10 py-5 border-2 border-green-700 text-green-700 rounded-full font-semibold hover:bg-green-700 hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Menu
                <motion.span
                  className="inline-block ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </TiltCard>
          </div>
        </Reveal3D>
      </div>
    </section>
  );
};