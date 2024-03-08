import { Product } from "@/types";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../lib/actions/productActions";
import Heading from "../components/reusables/Heading";
import Navbar from "../components/Navbar";

export default async function AllProducts() {
  const allProducts = await getAllProducts();

  return (
    <>
      <Navbar />
      <div className="product-container">
        {allProducts && allProducts?.length > 0 && (
          <div className="py-14 flex flex-col gap-2 w-full">
            <Heading size="sm" className="text-gradient-purple-pink text-left">
              All Products
            </Heading>

            <div className="flex flex-wrap gap-12 mt-7 w-full">
              {allProducts && allProducts.length > 0 ? (
                allProducts.map((product: Product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="text-gray-500">No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
