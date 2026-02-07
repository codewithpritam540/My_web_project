import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';
import { heroContent } from '@/data/mockData';
import { DepthLayer, FloatingElement, TiltCard } from '@/components/3d/ParallaxContainer';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick: () => void;
}

export const Hero3D = ({ onExploreClick }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!hero || !image || !content || !overlay) return;

    const ctx = gsap.context(() => {
      // Multi-layer parallax on image
      gsap.to(image, {
        yPercent: 30,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Content parallax with fade
      gsap.to(content, {
        yPercent: -20,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });

      // Overlay intensity increase on scroll
      gsap.to(overlay, {
        backgroundColor: 'rgba(0,0,0,0.7)',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: 15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.4, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background Image with 3D Depth */}
      <div
        ref={imageRef}
        className="absolute inset-0 -top-[20%] -bottom-[20%]"
        style={{ willChange: 'transform' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ backgroundImage: `url(${heroContent.image})` }}
        />
      </div>

      {/* Animated Gradient Overlays with Depth */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      
      {/* Cinematic Vignette */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Floating Particles Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <FloatingElement
            key={i}
            amplitude={30 + i * 10}
            duration={4 + i * 0.5}
            delay={i * 0.3}
            className={`absolute ${[
              'top-1/4 left-1/4',
              'top-1/3 right-1/4',
              'top-2/3 left-1/3',
              'bottom-1/4 right-1/3',
              'top-1/2 left-1/6',
              'top-1/6 right-1/6',
            ][i]}`}
          >
            <div 
              className="w-2 h-2 rounded-full bg-white/20 backdrop-blur-sm"
              style={{ 
                width: `${4 + i * 2}px`, 
                height: `${4 + i * 2}px`,
                opacity: 0.3 + i * 0.1 
              }}
            />
          </FloatingElement>
        ))}
      </div>

      {/* Main Content with 3D Perspective */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 text-center"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Animated Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <TiltCard maxTilt={10}>
              <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white/90 text-sm font-medium shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                Now Open for Reservations
              </span>
            </TiltCard>
          </motion.div>

          {/* Headline with Text Reveal */}
          <motion.div variants={itemVariants} className="overflow-hidden">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display text-white leading-[1.05] tracking-tight">
              {heroContent.headline.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-[0.25em]"
                  initial={{ opacity: 0, y: 80, rotateX: 45 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{ transformOrigin: 'bottom' }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </motion.div>

          {/* Subtext with Fade */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {heroContent.subtext}
          </motion.p>

          {/* CTA Buttons with 3D Hover */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <TiltCard maxTilt={8}>
              <motion.button
                onClick={onExploreClick}
                className="group flex items-center gap-3 px-10 py-5 bg-white text-green-900 rounded-full font-semibold text-lg hover:bg-white/95 transition-all duration-300 shadow-2xl shadow-black/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {heroContent.ctaText}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </motion.button>
            </TiltCard>

            <TiltCard maxTilt={8}>
              <motion.button
                className="group flex items-center gap-4 px-6 py-5 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all shadow-lg">
                  <Play className="w-5 h-5 fill-white ml-1" />
                </span>
                Watch Our Story
              </motion.button>
            </TiltCard>
          </motion.div>
        </motion.div>
      </div>

      {/* Depth Layer Elements */}
      <DepthLayer depth={0.2} className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none">
        <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-[#faf9f6] to-transparent" />
      </DepthLayer>

      {/* Floating Stats with Depth */}
      <DepthLayer depth={0.1} className="absolute bottom-24 left-8 lg:left-16 hidden lg:block">
        <FloatingElement amplitude={15} duration={3}>
          <TiltCard maxTilt={15}>
            <div className="glass rounded-3xl p-6 shadow-2xl backdrop-blur-xl bg-white/80 border border-white/30">
              <p className="text-4xl font-display text-green-800">15+</p>
              <p className="text-sm text-gray-600 mt-1">Years of Excellence</p>
            </div>
          </TiltCard>
        </FloatingElement>
      </DepthLayer>

      <DepthLayer depth={0.15} className="absolute bottom-32 right-8 lg:right-16 hidden lg:block">
        <FloatingElement amplitude={20} duration={4} delay={0.5}>
          <TiltCard maxTilt={15}>
            <div className="glass rounded-3xl p-6 shadow-2xl backdrop-blur-xl bg-white/80 border border-white/30">
              <p className="text-4xl font-display text-green-800">100%</p>
              <p className="text-sm text-gray-600 mt-1">Organic Ingredients</p>
            </div>
          </TiltCard>
        </FloatingElement>
      </DepthLayer>

      {/* Middle Floating Element */}
      <DepthLayer depth={0.05} className="absolute top-1/3 right-12 hidden xl:block">
        <FloatingElement amplitude={25} duration={5} delay={1}>
          <TiltCard maxTilt={20}>
            <div className="glass rounded-2xl p-4 shadow-xl backdrop-blur-xl bg-white/70 border border-white/30">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-lime-400 flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Michelin Guide</p>
                  <p className="text-sm text-gray-600">Featured 2024</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </FloatingElement>
      </DepthLayer>

      {/* Scroll Indicator with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-white/60 cursor-pointer hover:text-white/80 transition-colors"
          onClick={onExploreClick}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};