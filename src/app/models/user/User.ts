import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export const UserConverter = {
  toFirestore: (data: User) => data,
  fromFirestore: (snap: QueryDocumentSnapshot) => {
    const data = snap.data() as User;
    data.createdAt = (data.createdAt as any).toDate();
    data.updatedAt = (data.updatedAt as any).toDate();

    return data;
  },
};

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
