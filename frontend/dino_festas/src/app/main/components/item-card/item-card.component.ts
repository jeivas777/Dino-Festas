import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Item } from '../../../services/item.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule],
  providers: [CurrencyPipe], // Adicionando CurrencyPipe como provider
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() item!: Item;
  showToast = false;
  toastMessage = '';

  constructor(
    private currencyPipe: CurrencyPipe,
    private cartService: ShoppingCartService,
    private router: Router
  ) {}

  // Função para formatar o valor
  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') || '';
  }

  addToCart(): void {
    this.cartService.addToCart(this.item);

    this.toastMessage = `${this.item.nome} adicionado ao carrinho!`;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000); // Exibe por 3 segundos
  }

  get isInEscolherItensPage(): boolean {
    return this.router.url.includes('/pacote');
  }
}
