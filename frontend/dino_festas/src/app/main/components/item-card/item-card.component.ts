import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Item } from '../../../services/item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Output() addToCartEvent = new EventEmitter<Item>(); // Emissor de evento

  constructor(private currencyPipe: CurrencyPipe, private router: Router) {}

  // Função para formatar o valor
  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') || '';
  }

  get isInEscolherItensPage(): boolean {
    return this.router.url.includes('/pacote');
  }

  // Função chamada ao clicar no ícone de carrinho
  onAddToCartClick(): void {
    this.addToCartEvent.emit(this.item); // Emite o item para o componente pai
  }
}
