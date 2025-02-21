import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Star } from "lucide-react";
import { Button } from "./ui/button";

interface VendorProps {
  id?: string;
  name?: string;
  logo?: string;
  rating?: number;
  productCount?: number;
  featuredProduct?: {
    image: string;
    name: string;
    price: number;
  };
}

interface VendorCarouselProps {
  vendors?: VendorProps[];
}

const defaultVendors: VendorProps[] = [
  {
    id: "1",
    name: "Tech Haven",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=tech",
    rating: 4.8,
    productCount: 150,
    featuredProduct: {
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
      name: "Wireless Headphones",
      price: 129.99,
    },
  },
  {
    id: "2",
    name: "Fashion Forward",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=fashion",
    rating: 4.6,
    productCount: 320,
    featuredProduct: {
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      name: "Designer Sneakers",
      price: 199.99,
    },
  },
  {
    id: "3",
    name: "Home Essentials",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=home",
    rating: 4.7,
    productCount: 250,
    featuredProduct: {
      image: "https://images.unsplash.com/photo-1507764923504-cd90bf7da772",
      name: "Smart Lamp",
      price: 79.99,
    },
  },
  {
    id: "4",
    name: "Outdoor Adventure",
    logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=outdoor",
    rating: 4.9,
    productCount: 180,
    featuredProduct: {
      image: "https://images.unsplash.com/photo-1597843797221-e34b4a320b97",
      name: "Camping Gear",
      price: 299.99,
    },
  },
];

const VendorCarousel = ({ vendors = defaultVendors }: VendorCarouselProps) => {
  return (
    <div className="w-full bg-gray-50 py-12">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Top Vendors</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {vendors.map((vendor) => (
              <CarouselItem
                key={vendor.id}
                className="pl-4 basis-1/3 md:basis-1/4"
              >
                <Card className="bg-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4">
                      <img
                        src={vendor.logo}
                        alt={vendor.name}
                        className="w-20 h-20 rounded-full"
                      />
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">{vendor.name}</h3>
                        <div className="flex items-center justify-center gap-1 mt-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {vendor.rating} ({vendor.productCount} products)
                          </span>
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="relative h-32 w-full rounded-lg overflow-hidden">
                          <img
                            src={vendor.featuredProduct?.image}
                            alt={vendor.featuredProduct?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium truncate">
                            {vendor.featuredProduct?.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            ${vendor.featuredProduct?.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        Visit Store
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default VendorCarousel;
