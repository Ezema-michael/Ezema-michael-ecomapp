import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  ChevronRight,
  Gamepad2,
  ShoppingBag,
  Utensils,
  Car,
  Shirt,
  Book,
  Laptop,
  Grid3X3,
} from "lucide-react";
import { prestashop } from "@/lib/prestashop";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  itemCount: number;
}

interface CategoryGridProps {
  categories?: Category[];
  onCategoryClick?: (id: string) => void;
  onViewAllClick?: () => void;
}

const defaultCategories: Category[] = [
  {
    id: "1",
    name: "Gaming",
    icon: <Gamepad2 className="h-8 w-8" />,
    itemCount: 1200,
  },
  {
    id: "2",
    name: "Fashion",
    icon: <Shirt className="h-8 w-8" />,
    itemCount: 850,
  },
  {
    id: "3",
    name: "Electronics",
    icon: <Laptop className="h-8 w-8" />,
    itemCount: 2000,
  },
  {
    id: "4",
    name: "Food",
    icon: <Utensils className="h-8 w-8" />,
    itemCount: 750,
  },
  {
    id: "5",
    name: "Automotive",
    icon: <Car className="h-8 w-8" />,
    itemCount: 450,
  },
  {
    id: "6",
    name: "Books",
    icon: <Book className="h-8 w-8" />,
    itemCount: 3000,
  },
  {
    id: "7",
    name: "General",
    icon: <ShoppingBag className="h-8 w-8" />,
    itemCount: 1500,
  },
  {
    id: "8",
    name: "Other",
    icon: <Grid3X3 className="h-8 w-8" />,
    itemCount: 900,
  },
];

const CategoryGrid = ({
  categories: initialCategories,
  onCategoryClick = (id: string) => console.log(`Category clicked: ${id}`),
  onViewAllClick = () => console.log("View all clicked"),
}: CategoryGridProps) => {
  const [categories, setCategories] =
    React.useState<Category[]>(defaultCategories);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await prestashop.getCategories();
        const mappedCategories = response.categories.map((cat: any) => ({
          id: cat.id.toString(),
          name: cat.name[1] || cat.name,
          icon: getCategoryIcon(cat.name[1] || cat.name),
          itemCount: parseInt(cat.nb_products_recursive || "0"),
        }));
        setCategories(mappedCategories);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!initialCategories) {
      loadCategories();
    }
  }, [initialCategories]);

  const getCategoryIcon = (name: string) => {
    const lowercaseName = name.toLowerCase();
    if (lowercaseName.includes("gaming"))
      return <Gamepad2 className="h-8 w-8" />;
    if (lowercaseName.includes("fashion")) return <Shirt className="h-8 w-8" />;
    if (lowercaseName.includes("electronics"))
      return <Laptop className="h-8 w-8" />;
    if (lowercaseName.includes("food")) return <Utensils className="h-8 w-8" />;
    if (lowercaseName.includes("auto")) return <Car className="h-8 w-8" />;
    if (lowercaseName.includes("book")) return <Book className="h-8 w-8" />;
    return <ShoppingBag className="h-8 w-8" />;
  };

  if (loading && !initialCategories) {
    return (
      <div className="w-full max-w-[1200px] mx-auto p-6 bg-gray-50">
        Loading categories...
      </div>
    );
  }

  const displayCategories = initialCategories || categories;

  return (
    <div className="w-full max-w-[1200px] mx-auto p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
        <Button
          variant="ghost"
          className="text-primary hover:text-primary/80"
          onClick={onViewAllClick}
        >
          View All
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {displayCategories.map((category) => (
          <Card
            key={category.id}
            className="group cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white"
            onClick={() => onCategoryClick(category.id)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {category.itemCount.toLocaleString()} items
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
