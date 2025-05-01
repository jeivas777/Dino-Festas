import { Component, EventEmitter, Output } from '@angular/core';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Item } from '../../../services/item.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  providers: [CurrencyPipe],
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  @Output() closeCart = new EventEmitter<void>();
  cartProducts: any[] = [];

  constructor(
    private cartService: ShoppingCartService,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {
    this.cartService.cartProducts$.subscribe((response) => {
      this.cartProducts = response;
      console.log(response);
    });
  }

  getProducts(): void {
    this.cartProducts = this.cartService.getCartProducts();
  }

  removeFromCart(product: any): void {
    this.cartService.removeFromCart(product);
  }

  // Função para finalizar a compra
  finalizePurchase() {
    const message = this.buildWhatsAppMessage(this.cartProducts);
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappLink, '_blank');
  }

  buildWhatsAppMessage(cartProducts: any[]): string {
    let message =
      'Olá, gostaria de fazer um pedido com os seguintes itens:\n\n';
    let outrosItens: string[] = [];

    cartProducts.forEach((product) => {
      if (product.codigo) {
        // Produto avulso → será listado depois em "Outros itens"
        outrosItens.push(
          `- ${product.nome} - CÓD: ${
            product.codigo
          } - Valor: ${this.formatCurrency(product.valor)}`
        );
      } else {
        // Pacote (kit)
        message += `${product.nome} (Valor: ${this.formatCurrency(
          product.valor
        )}):\n`;

        if (product.itensSelecionados) {
          Object.keys(product.itensSelecionados).forEach((categoriaId) => {
            const items = product.itensSelecionados[categoriaId];
            items.forEach((item: Item) => {
              message += `- ${item.nome} – CÓD: ${item.codigo}\n`;
            });
          });
        }

        message += '\n';
      }
    });

    if (outrosItens.length) {
      message += `Outros itens:\n`;
      message += outrosItens.join('\n');
      message += '\n';
    }

    message += '\nAguardo confirmação do pedido!';
    return message;
  }

  // Função para formatar o valor
  formatCurrency(value: number): string {
    return this.currencyPipe.transform(value, 'BRL', 'symbol', '1.2-2') || '';
  }

  close(): void {
    this.closeCart.emit();
  }
}
