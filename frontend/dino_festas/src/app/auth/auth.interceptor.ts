import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Lista de rotas públicas (pode melhorar depois)
  const publicUrls = ['/api/itens', '/api/kits'];

  const isPublic = publicUrls.some((url) => req.url.includes(url));

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(clonedReq);

  return next(req);
};
