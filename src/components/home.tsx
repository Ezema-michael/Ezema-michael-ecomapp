import React from "react";
import Header from "./Header";
import HeroBanner from "./HeroBanner";
import CategoryGrid from "./CategoryGrid";
import FeaturedProducts from "./FeaturedProducts";
import VendorCarousel from "./VendorCarousel";

interface HomePageProps {
  onSearch?: (query: string) => void;
  cartItemCount?: number;
  onCategoryClick?: (id: string) => void;
  onProductQuickView?: (id: string) => void;
  onVendorClick?: (id: string) => void;
}

const HomePage = ({
  onSearch = () => {},
  cartItemCount = 0,
  onCategoryClick = () => {},
  onProductQuickView = () => {},
  onVendorClick = () => {},
}: HomePageProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Header onSearch={onSearch} cartItemCount={cartItemCount} />

      <main>
        <HeroBanner
          onCtaClick={(link) => console.log(`CTA clicked: ${link}`)}
          onSlideChange={(index) => console.log(`Slide changed to: ${index}`)}
        />

        <div className="space-y-16">
          <CategoryGrid
            onCategoryClick={onCategoryClick}
            onViewAllClick={() => console.log("View all categories clicked")}
          />

          <FeaturedProducts />

          <VendorCarousel />
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
