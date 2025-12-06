import { ProductDetails } from "./ProductDetails";

export interface ProductOptions {
  id: string;
  thumbnail: string;
  name: string;
  sku: string;
  quantity: number;
  addedPrice: number;
  addedCost: number;
  details: ProductDetails[];
}
