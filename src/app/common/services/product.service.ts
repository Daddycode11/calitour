import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDocs,
  orderBy,
  Query,
  query,
  QueryDocumentSnapshot,
  setDoc,
  limit,
  startAfter,
  deleteDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
import {
  deleteObject,
  getDownloadURL,
  listAll,
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
  private readonly productCollection = collection(
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
      const productDocRef = doc(this.productCollection, product.id);

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
        setDoc(productDocRef, {
          ...product,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }),
      ]);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async getProducts(
    count: number = 10,
    lastIndex: QueryDocumentSnapshot<Product> | null
  ): Promise<{ data: Product[]; last: QueryDocumentSnapshot<Product> | null }> {
    let q: Query<Product>;

    if (!lastIndex) {
      // First page
      q = query(
        this.productCollection,
        orderBy('createdAt', 'desc'),
        limit(count)
      );
    } else {
      // Next pages
      q = query(
        this.productCollection,
        orderBy('createdAt', 'desc'),
        startAfter(lastIndex),
        limit(count)
      );
    }

    const snap = await getDocs(q);

    const data = snap.docs.map((d) => ({ ...d.data(), id: d.id }));
    const last = snap.docs.length > 0 ? snap.docs[snap.docs.length - 1] : null;

    return { data, last };
  }

  deleteProduct(id: string): Promise<void> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    const folderRef = ref(this.storage, `products/${id}`); // folder reference

    return new Promise(async (resolve, reject) => {
      try {
        // List all files in the folder
        const listResult = await listAll(folderRef);

        // Delete all files
        const deletePromises = listResult.items.map((fileRef) =>
          deleteObject(fileRef)
        );
        await Promise.all(deletePromises);

        // Delete Firestore document
        await deleteDoc(productDocRef);

        resolve();
      } catch (error) {
        console.error('Error deleting product:', error);
        reject(error);
      }
    });
  }
}
