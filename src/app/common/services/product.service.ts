import { Injectable } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
} from '@angular/fire/storage';
import { AppConstants } from '../utils/Constants';
import { Product, ProductConverter } from '../../models/products/Products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly collectionRef = collection(
    this.firestore,
    AppConstants.PRODUCT_COLLECTION
  ).withConverter(ProductConverter);
  private readonly storageRef = ref(
    this.storage,
    AppConstants.PRODUCT_COLLECTION
  );
  constructor(private firestore: Firestore, private storage: Storage) {}

  async create(
    product: Product,
    thumbnail: File,
    images: File[]
  ): Promise<void> {
    try {
      const productDocRef = doc(this.collectionRef, product.id);

      const thumbExt = thumbnail.type.split('/').pop();
      const thumbPath = `${product.id}/thumbnail.${thumbExt}`;
      const thumbRef = ref(this.storageRef, thumbPath);
      await uploadBytes(thumbRef, thumbnail);
      const thumbnailUrl = await getDownloadURL(thumbRef);
      product.thumbnail = thumbnailUrl;

      const imageUploadPromises = images.map(async (file, index) => {
        const ext = file.type.split('/').pop();
        const imagePath = `${product.id}/images/${index}.${ext}`;
        const imageRef = ref(this.storageRef, imagePath);
        await uploadBytes(imageRef, file);
        return getDownloadURL(imageRef);
      });

      await Promise.all([
        ...imageUploadPromises,
        setDoc(productDocRef, product),
      ]);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
}
