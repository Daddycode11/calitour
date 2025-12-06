import { QueryDocumentSnapshot } from '@angular/fire/firestore';
import { ProductDetails } from './ProductDetails';
import { ProductOptions } from './ProductOptions';
import { ProductCategory } from './ProductType';
import { StockAlert } from './StockAlert';

export interface Product {
  id: string;
  thumbnail: string;
  name: string;
  sku: string;
  category: ProductCategory;
  description: string;
  details: ProductDetails[];
  cost: number;
  price: number;
  available: boolean;
  quantity: number;
  options?: ProductOptions[];
  stockAlert?: StockAlert;
  ratings: number;
  expiration: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ProductConverter = {
  toFirestore: (data: Product) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as Product;
    data.createdAt = (data.createdAt as any).toDate();
    data.updatedAt = (data.updatedAt as any).toDate();

    return data;
  },
};

export const SAMPLE_PRODUCTS: Product[] = [];
