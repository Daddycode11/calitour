import { inject } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../common/services/auth.service';
import { UserRole } from '../../models/user/User';

export const adminGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const authService = inject(AuthService);
  const router = inject(Router);

  return new Promise((resolve) => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      // -----------------------------------------------------
      // 1. No logged-in user → Check if an admin exists
      // -----------------------------------------------------
      if (!firebaseUser) {
        const adminExists = await authService.adminExists();
        if (!adminExists) {
          // No admin → first-time setup
          resolve(router.parseUrl('/auth/setup'));
          return;
        }

        // Admin exists → go to login
        resolve(router.parseUrl('/auth/login'));
        return;
      }

      // -----------------------------------------------------
      // 2. Logged-in user → Load Firestore user document
      // -----------------------------------------------------
      const userDoc = await authService.getUser(firebaseUser.uid);

      if (!userDoc) {
        // User document missing → force logout
        await authService.logout();
        resolve(router.parseUrl('/auth/login'));
        return;
      }

      // -----------------------------------------------------
      // 3. Check if user is admin
      // -----------------------------------------------------
      if (userDoc.role !== UserRole.ADMIN) {
        await authService.logout();
        resolve(router.parseUrl('/auth/login'));
        return;
      }

      // -----------------------------------------------------
      // 4. User is admin → allow access
      // -----------------------------------------------------
      resolve(true);
    });
  });
};
