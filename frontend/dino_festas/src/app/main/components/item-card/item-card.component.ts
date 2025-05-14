<<<<<<< HEAD
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Item } from '../../../services/item.service';
=======
import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Item } from '../../../services/item.service';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule],
<<<<<<< HEAD
  providers: [CurrencyPipe],
=======
  providers: [CurrencyPipe], // Adicionando CurrencyPipe como provider
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() item!: Item;
<<<<<<< HEAD
  @Output() addToCartEvent = new EventEmitter<Item>(); // Emissor de evento

  constructor(private currencyPipe: CurrencyPipe, private router: Router) {}
=======
  showToast = false;
  toastMessage = '';

  constructor(
    private currencyPipe: CurrencyPipe,
    private cartService: ShoppingCartService,
    private router: Router
  ) {}
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6

  // Função para formatar o valor
  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') || '';
  }

<<<<<<< HEAD
  get isInEscolherItensPage(): boolean {
    return this.router.url.includes('/pacote');
  }

  // Função chamada ao clicar no ícone de carrinho
  onAddToCartClick(): void {
    this.addToCartEvent.emit(this.item); // Emite o item para o componente pai
  }
=======
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
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
}
