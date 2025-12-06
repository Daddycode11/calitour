import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const setupGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const hostname = window.location.hostname;

  const isLocalhost =
    hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  console.log(hostname);
  if (!isLocalhost) {
    return router.parseUrl('/auth/login'); // block access in production
  }

  return true; // allow access in localhost
};
