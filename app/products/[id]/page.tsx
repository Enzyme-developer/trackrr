import { Modal } from "@/app/components/Modal";
import Navbar from "@/app/components/Navbar";
import PriceInfoCard from "@/app/components/PriceInfoCard";
import Heading from "@/app/components/reusables/Heading";
import { getProductById } from "@/app/lib/actions/productActions";
import { formatNumber } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import {
  Activity,
  BookMarked,
  Heart,
  Share,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);

  if (!product) redirect("/");

  return (
    <>
      <Navbar />
      <div className="product-container">
        <div className="flex gap-28 xl:flex-row flex-col">
          <div className="product-image">
            <Image
              src={product.image}
              alt={product.title}
              width={580}
              height={400}
              className="mx-auto"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
              <div className="flex flex-col gap-3">
                <Heading
                  size="sm"
                  className="text-2xl text-gradient-purple-pink text-left"
                >
                  {product.title}
                </Heading>

                <Link
                  href={product.url}
                  target="_blank"
                  className="text-base text-black opacity-50"
                >
                  Visit Product
                </Link>
              </div>

              <div className="flex items-center gap-3">
                <div className="product-hearts">
                  <Heart color="red" />

                  <p className="text-base font-semibold text-[#D46F77]">
                    {product.reviewsCount}
                  </p>
                </div>

                <div className="p-2 bg-white-200 rounded-10">
                  <BookMarked color="purple" />
                </div>

                <div className="p-2 bg-white-200 rounded-md">
                  <Share />
                </div>
              </div>
            </div>

            <div className="product-info">
              <div className="flex flex-col gap-2">
                <p className="text-[34px] text-black font-bold">
                  {product.currency} {formatNumber(product.currentPrice)}
                </p>
                <p className="text-[21px] text-black opacity-50 line-through">
                  {product.currency} {formatNumber(product.originalPrice)}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="product-stars">
                    <Star color="yellow" />
                    <p className="text-sm font-semibold">
                      {product.stars || "25"}
                    </p>
                  </div>

                  <div className="product-reviews">
                    <Activity />
                    <p className="text-sm font-semibold">
                      {product.isOutOfStock == false
                        ? "Availabe"
                        : "Out of Stock"}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-black opacity-50">
                  <span className="text-green-500 font-semibold">93% </span> of
                  buyers have recommeded this.
                </p>
              </div>
            </div>

            <div className="my-7 flex flex-col gap-5">
              <div className="flex gap-5 flex-wrap">
                <PriceInfoCard
                  title="Current Price"
                  iconSrc="Tag"
                  value={`${product.currency} ${formatNumber(
                    product.currentPrice
                  )}`}
                />
                <PriceInfoCard
                  title="Average Price"
                  iconSrc="BarChart"
                  value={`${product.currency} ${formatNumber(
                    product.averagePrice
                  )}`}
                />
                <PriceInfoCard
                  title="Highest Price"
                  iconSrc="ArrowUp"
                  value={`${product.currency} ${formatNumber(
                    product.highestPrice
                  )}`}
                />
                <PriceInfoCard
                  title="Lowest Price"
                  iconSrc="ArrowDown"
                  value={`${product.currency} ${formatNumber(
                    product.lowestPrice
                  )}`}
                />
              </div>
            </div>

            <Modal productId={id} />
          </div>
        </div>

        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <Heading size="sm" className="text-left text-gradient-purple-pink">
              Product Description
            </Heading>

            <div className="flex flex-col gap-4">
              {product?.description?.split("\n")}
            </div>
          </div>

          <Button className="gap-3 flex w-fit">
            <ShoppingCart />

            <Link href="/" className="text-base text-white">
              Buy Now
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
