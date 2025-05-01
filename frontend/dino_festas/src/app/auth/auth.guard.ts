import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  // Permitir acesso livre ao /admin/login
  if (state.url === '/admin/login') {
    return true;
  }

  if (token && isValidToken(token)) {
    return true;
  }

  router.navigate(['/admin/login']);
  return false;
};

function isValidToken(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  } catch {
    return false;
  }
}
