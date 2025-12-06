import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  where,
} from '@angular/fire/firestore';
import { AppConstants } from '../utils/Constants';
import { User, UserConverter, UserRole } from '../../models/user/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userCollection = collection(
    this.firestore,
    AppConstants.USER_COLLECTION
  ).withConverter(UserConverter);
  constructor(private firestore: Firestore, private auth: Auth) {}

  async getUser(uid: string): Promise<User | null> {
    const ref = doc(this.userCollection, uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  }

  async adminExists(): Promise<boolean> {
    const q = query(
      this.userCollection,
      where('role', '==', UserRole.ADMIN),
      limit(1)
    );

    const snap = await getDocs(q);
    return snap.size > 0;
  }
  async logout() {
    await signOut(this.auth);
  }

  login(email: string, password: string): Promise<User> {
    return new Promise(async (resolve, reject) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          this.auth,
          email,
          password
        );
        const currentUser = userCredential.user;

        if (!currentUser) {
          reject(new Error('Failed to login: no Firebase user found'));
          return;
        }

        // Fetch user document from Firestore
        const userDocRef = doc(this.userCollection, currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
          reject(new Error('No user data found in Firestore'));
          return;
        }

        const userData = userDoc.data();
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  }
  createAdmin(
    name: string,
    phone: string,
    email: string,

    password: string
  ): Promise<User> {
    return new Promise((resolve, reject) => {
      // 1. Create user in Firebase Auth
      createUserWithEmailAndPassword(this.auth, email, password)
        .then((cred) => {
          if (!cred.user) {
            reject(new Error('Failed to create Firebase user'));
            return;
          }

          // 2. Update profile (optional)
          updateProfile(cred.user, { displayName: name }).catch((err) => {
            console.log(err);
          });

          // 3. Build firestore user object
          const user: User = {
            id: cred.user.uid,
            name,
            email,
            phone,
            role: UserRole.ADMIN,
            createdAt: new Date(),
            updatedAt: new Date(),
          };

          // 4. Save user doc
          setDoc(doc(this.userCollection, cred.user.uid), user)
            .then(() => resolve(user))
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  }
}
