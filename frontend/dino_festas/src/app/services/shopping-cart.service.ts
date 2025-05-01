import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartProductsSubject = new BehaviorSubject<any[]>([]);
  cartProducts$ = this.cartProductsSubject.asObservable();

  constructor() {}

  addToCart(product: any): void {
    const currentCart = this.cartProductsSubject.value;

    const productCopy = { ...product };

    this.cartProductsSubject.next([...currentCart, productCopy]);
  }

  removeFromCart(product: any) {
    const currentCart = this.cartProductsSubject.value;

    const updatedCart = currentCart.filter(
      (cartProduct) => cartProduct.id !== product.id
    );

    this.cartProductsSubject.next(updatedCart);
  }

  getCartProducts(): any {
    return this.cartProductsSubject.value;
  }
}
