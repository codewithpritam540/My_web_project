import { useRef, useEffect, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ParallaxContainer = ({
  children,
  className = '',
  speed = 0.5,
  direction = 'up',
}: ParallaxContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const getTransform = () => {
      switch (direction) {
        case 'up':
          return { yPercent: speed * -30 };
        case 'down':
          return { yPercent: speed * 30 };
        case 'left':
          return { xPercent: speed * -20 };
        case 'right':
          return { xPercent: speed * 20 };
        default:
          return { yPercent: speed * -30 };
      }
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { ...getTransform(), opacity: 0.8 },
        {
          ...getTransform(),
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

// 3D Tilt Card Component
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export const TiltCard = ({ children, className = '', maxTilt = 15 }: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

// Floating Element with 3D depth
interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export const FloatingElement = ({
  children,
  className = '',
  amplitude = 20,
  duration = 3,
  delay = 0,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: -amplitude,
        duration: duration,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: delay,
      });
    });

    return () => ctx.revert();
  }, [amplitude, duration, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Depth Layer Component for multi-layer parallax
interface DepthLayerProps {
  children: ReactNode;
  depth: number; // 0-1, where 0 is closest, 1 is furthest
  className?: string;
}

export const DepthLayer = ({ children, depth, className = '' }: DepthLayerProps) => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const ctx = gsap.context(() => {
      gsap.to(layer, {
        yPercent: depth * 50,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [depth]);

  return (
    <div
      ref={layerRef}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </div>
  );
};

// Reveal on Scroll with 3D effect
interface Reveal3DProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'bottom' | 'top';
  delay?: number;
}

export const Reveal3D = ({
  children,
  className = '',
  direction = 'bottom',
  delay = 0,
}: Reveal3DProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getFromVars = () => {
      switch (direction) {
        case 'left':
          return { x: -100, opacity: 0, rotateY: 15 };
        case 'right':
          return { x: 100, opacity: 0, rotateY: -15 };
        case 'top':
          return { y: -100, opacity: 0, rotateX: -15 };
        case 'bottom':
        default:
          return { y: 100, opacity: 0, rotateX: 15 };
      }
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { ...getFromVars(), transformPerspective: 1000 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 1,
          delay: delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, [direction, delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};