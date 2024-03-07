"use server";

import { revalidatePath } from "next/cache";
import Product from "../database/models/productModel";
import { connectToDatabase } from "../database/mongoose";
import { scrapeProduct } from "../scraper/scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { redirect } from "next/navigation";
import { User } from "@/types"; 
import { generateEmailBody, sendEmail } from "../nodemailer";
import { auth } from "@clerk/nextjs";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;
  let newProduct;
  try {
    await connectToDatabase();
    const scrapedProduct = await scrapeProduct(productUrl);
    if (!scrapedProduct) return;

    let product = scrapedProduct;
    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: 0 },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      };
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    newProduct = updatedProduct;

  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to create/update product: ${error.message}`);
  }

  revalidatePath(`/products/${newProduct._id}`);
  redirect(`/products/${newProduct._id}`);
}

export async function getProductById(productId: string) {
  try {
    connectToDatabase();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts() {
  try {
    const { userId } = auth();
    await connectToDatabase();

    const products = await Product.find({userId});

    return products;
  } catch (error) {
    console.log(error);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some(
      (user: User) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
