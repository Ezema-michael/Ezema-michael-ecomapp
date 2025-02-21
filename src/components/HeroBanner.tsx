import React from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface BannerSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface HeroBannerProps {
  slides?: BannerSlide[];
  autoPlayInterval?: number;
  onSlideChange?: (index: number) => void;
  onCtaClick?: (link: string) => void;
}

const HeroBanner = ({
  slides = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
      title: "Summer Collection 2024",
      description: "Discover the latest trends in fashion",
      ctaText: "Shop Now",
      ctaLink: "/collection/summer",
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
      title: "Exclusive Deals",
      description: "Up to 50% off on selected items",
      ctaText: "View Deals",
      ctaLink: "/deals",
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      title: "New Arrivals",
      description: "Be the first to shop our latest collection",
      ctaText: "Explore Now",
      ctaLink: "/new-arrivals",
    },
  ],
  autoPlayInterval = 5000,
  onSlideChange = () => {},
  onCtaClick = () => {},
}: HeroBannerProps) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      onSlideChange(currentSlide);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, slides.length, onSlideChange, currentSlide]);

  return (
    <div className="relative w-full h-[480px] bg-gray-100 overflow-hidden">
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: currentSlide === index ? 1 : 0,
            transition: { duration: 0.5 },
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
              <motion.h1
                className="text-5xl font-bold mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: currentSlide === index ? 0 : 20,
                  opacity: currentSlide === index ? 1 : 0,
                }}
                transition={{ delay: 0.2 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-xl mb-8 max-w-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: currentSlide === index ? 0 : 20,
                  opacity: currentSlide === index ? 1 : 0,
                }}
                transition={{ delay: 0.3 }}
              >
                {slide.description}
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: currentSlide === index ? 0 : 20,
                  opacity: currentSlide === index ? 1 : 0,
                }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  size="lg"
                  onClick={() => onCtaClick(slide.ctaLink)}
                  className="text-lg"
                >
                  {slide.ctaText}
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${currentSlide === index ? "bg-white w-4" : "bg-white/50"}`}
            onClick={() => {
              setCurrentSlide(index);
              onSlideChange(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
