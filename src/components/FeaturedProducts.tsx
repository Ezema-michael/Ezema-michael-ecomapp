import React from "react";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { prestashop } from "@/lib/prestashop";

interface FeaturedProductsProps {
  products?: Array<{
    id: string;
    title: string;
    price: number;
    rating: number;
    image: string;
  }>;
}

const defaultProducts = [
  {
    id: "1",
    title: "Premium Wireless Headphones",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  },
  {
    id: "2",
    title: "Smart Watch Series X",
    price: 299.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
  },
  {
    id: "3",
    title: "Professional Camera Kit",
    price: 899.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  },
  {
    id: "4",
    title: "Luxury Leather Bag",
    price: 159.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa",
  },
  {
    id: "5",
    title: "Designer Sunglasses",
    price: 129.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
  },
  {
    id: "6",
    title: "Portable Speaker",
    price: 79.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
  },
  {
    id: "7",
    title: "Fitness Tracker",
    price: 89.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6",
  },
  {
    id: "8",
    title: "Wireless Earbuds",
    price: 149.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
  },
];

const FeaturedProducts = ({
  products: initialProducts,
}: FeaturedProductsProps) => {
  const [products, setProducts] = React.useState(defaultProducts);
  const [loading, setLoading] = React.useState(true);

  console.log("API URL:", import.meta.env.VITE_PRESTASHOP_API_URL);
  console.log("API Key:", import.meta.env.VITE_PRESTASHOP_API_KEY);

  React.useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await prestashop.getProducts({ limit: 8 });
        const productsWithImages = await Promise.all(
          response.products.map(async (product: any) => {
            let imageUrl =
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e";
            try {
              const images = await prestashop.getProductImages(
                parseInt(product.id),
              );
              if (images && images.length > 0) {
                imageUrl = `${import.meta.env.VITE_PRESTASHOP_API_URL}/images/products/${product.id}/${images[0].id}`;
              }
            } catch (error) {
              console.error("Error loading product image:", error);
            }

            return {
              id: product.id.toString(),
              title: product.name[1] || product.name,
              price: parseFloat(product.price),
              rating: 4.5, // PrestaShop doesn't have built-in ratings
              image: imageUrl,
            };
          }),
        );
        setProducts(productsWithImages);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!initialProducts) {
      loadProducts();
    }
  }, [initialProducts]);

  if (loading && !initialProducts) {
    return <div className="w-full py-16 bg-gray-50">Loading products...</div>;
  }

  const displayProducts = initialProducts || products;

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              rating={product.rating}
              image={product.image}
              onQuickView={() => console.log(`Quick view ${product.id}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
