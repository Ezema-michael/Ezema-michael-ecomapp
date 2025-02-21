interface PrestaShopConfig {
  apiUrl: string;
  apiKey: string;
}

class PrestaShopAPI {
  private config: PrestaShopConfig;

  constructor(config: PrestaShopConfig) {
    this.config = config;
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.config.apiUrl}/?url=${endpoint.replace(/^\//, "")}`;
    const headers = {
      Accept: "application/json",
      "Output-Format": "JSON",
      Authorization: `Basic ${btoa(`${this.config.apiKey}:`)}`,
    };

    console.log("Making API request:", {
      url,
      method: options.method || "GET",
      headers,
    });

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `PrestaShop API Error: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log("API Response:", data);
      return data;
    } catch (error) {
      console.error("PrestaShop API Error:", error);
      throw error;
    }
  }

  async getCategories() {
    // Mock data for frontend-only development
    return {
      categories: [
        { id: 1, name: ["Gaming"], nb_products_recursive: "1200" },
        { id: 2, name: ["Fashion"], nb_products_recursive: "850" },
        { id: 3, name: ["Electronics"], nb_products_recursive: "2000" },
        { id: 4, name: ["Food"], nb_products_recursive: "750" },
        { id: 5, name: ["Automotive"], nb_products_recursive: "450" },
        { id: 6, name: ["Books"], nb_products_recursive: "3000" },
        { id: 7, name: ["General"], nb_products_recursive: "1500" },
        { id: 8, name: ["Other"], nb_products_recursive: "900" },
      ],
    };
    // return this.fetch("categories&display=full&output_format=JSON");
  }

  async getProducts(
    options: { category_id?: number; limit?: number; page?: number } = {},
  ) {
    // Mock data for frontend-only development
    return {
      products: [
        { id: 1, name: ["Premium Wireless Headphones"], price: "199.99" },
        { id: 2, name: ["Smart Watch Series X"], price: "299.99" },
        { id: 3, name: ["Professional Camera Kit"], price: "899.99" },
        { id: 4, name: ["Luxury Leather Bag"], price: "159.99" },
        { id: 5, name: ["Designer Sunglasses"], price: "129.99" },
        { id: 6, name: ["Portable Speaker"], price: "79.99" },
        { id: 7, name: ["Fitness Tracker"], price: "89.99" },
        { id: 8, name: ["Wireless Earbuds"], price: "149.99" },
      ].slice(0, options.limit || 8),
    };
    // const queryParams = new URLSearchParams();
    // if (options.category_id) queryParams.append("id_category", options.category_id.toString());
    // if (options.limit) queryParams.append("limit", options.limit.toString());
    // if (options.page) queryParams.append("page", options.page.toString());
    // const query = queryParams.toString();
    // return this.fetch(`products${query ? `&${query}` : ""}&display=full&output_format=JSON`);
  }

  async getManufacturers(options: { limit?: number; page?: number } = {}) {
    const queryParams = new URLSearchParams();

    if (options.limit) queryParams.append("limit", options.limit.toString());
    if (options.page) queryParams.append("page", options.page.toString());

    const query = queryParams.toString();
    return this.fetch(
      `manufacturers${query ? `&${query}` : ""}&display=full&output_format=JSON`,
    );
  }

  async getProductImages(productId: number) {
    return this.fetch(
      `images/products/${productId}&display=full&output_format=JSON`,
    );
  }
}

// Initialize the API with environment variables
export const prestashop = new PrestaShopAPI({
  apiUrl: import.meta.env.VITE_PRESTASHOP_API_URL || "",
  apiKey: import.meta.env.VITE_PRESTASHOP_API_KEY || "",
});
