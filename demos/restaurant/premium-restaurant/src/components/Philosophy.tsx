import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brandContent } from '@/data/mockData';
import { Sprout, Truck, ShieldCheck, ChefHat } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const icons = {
  'Organic Sourcing': Sprout,
  'Farm-to-Table': Truck,
  'No Preservatives': ShieldCheck,
  'Chef Curated': ChefHat,
};

export const Philosophy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(headlineRef, { once: true, amount: 0.5 });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Animate stats
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.stats-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Animate pillars
      gsap.fromTo(
        '.pillar-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.pillars-container',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: brandContent.stats.organicIngredients, label: 'Organic Ingredients' },
    { value: brandContent.stats.localFarms, label: 'Local Farm Partners' },
    { value: brandContent.stats.yearsExperience, label: 'Years of Excellence' },
    { value: brandContent.stats.happyGuests, label: 'Happy Guests Served' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gradient-to-b from-[#faf9f6] to-white overflow-hidden"
    >
      {/* Large Typography Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <motion.h2
          ref={headlineRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display text-gray-900 leading-[1.15] text-center"
        >
          {brandContent.philosophy.headline.split('. ').map((part, index) => (
            <span key={index}>
              <span className={index === 1 ? 'text-green-700 italic' : ''}>
                {part}
                {index < 2 && '.'}
              </span>
              {index < 2 && <br className="hidden sm:block" />}
            </span>
          ))}
        </motion.h2>
      </div>

      {/* Stats Section */}
      <div className="stats-container max-w-6xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-item text-center"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-5xl lg:text-6xl font-display text-green-700 block mb-2"
              >
                {stat.value}
              </motion.span>
              <span className="text-gray-600 text-sm lg:text-base">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pillars Section */}
      <div className="pillars-container max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {brandContent.philosophy.pillars.map((pillar) => {
            const Icon = icons[pillar.title as keyof typeof icons];
            return (
              <motion.div
                key={pillar.title}
                className="pillar-card group p-8 rounded-3xl bg-white border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-500"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                  <Icon className="w-7 h-7 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-lime-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl -z-10" />
    </section>
  );
};