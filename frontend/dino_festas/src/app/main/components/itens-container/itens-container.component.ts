import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item, ItemService } from '../../../services/item.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../layout/loading-spinner/loading-spinner.component';
import { ShoppingCartService } from '../../../services/shopping-cart.service';

@Component({
  selector: 'app-itens-container',
  standalone: true,
  imports: [
    ItemCardComponent,
    CommonModule,
    PaginationComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './itens-container.component.html',
  styleUrls: ['./itens-container.component.scss'],
})
export class ItensContainerComponent implements OnChanges, AfterViewInit {
  @Input() nomeCategoria!: string;
  @Input() selectedItemsInCategoria: Item[] = [];
  @Input() quantidadeCategoria!: number;
  @Input() searchQuery: string = '';
  @Output() itemSelected = new EventEmitter<Item>();

  @ViewChild('itensContainer') itensContainer!: ElementRef;

  itens: Item[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  itemsPerPage: number = 50;

  loading: boolean = false;
  isPacotePage: boolean = false;

  showToast = false;
  toastMessages: string[] = []; // Lista de mensagens de toast

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  ngAfterViewInit() {
    this.isPacotePage = this.router.url.includes('/pacote'); // Verifica se a rota é '/pacote'
  }

  ngOnChanges() {
    if (this.nomeCategoria || this.searchQuery) {
      this.loadItems();
    }
  }

  loadItems(page: number = 0) {
    this.loading = true;
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery = params.get('q')!;

      this.itemService
        .getItems(this.searchQuery, 0, 5000)
        .subscribe((pageData) => {
          let filteredItems: Item[] = [];

          if (this.nomeCategoria) {
            filteredItems = pageData.content.filter(
              (item) =>
                item.categoria.toLowerCase() ===
                this.nomeCategoria.toLowerCase()
            );
          } else {
            filteredItems = pageData.content;
          }

          this.totalPages = Math.ceil(filteredItems.length / this.itemsPerPage);
          this.currentPage = page;

          const startIndex = page * this.itemsPerPage;
          const endIndex = startIndex + this.itemsPerPage;
          this.itens = filteredItems.slice(startIndex, endIndex);
          this.loading = false;
        });
    });
  }

  onPageChange(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.loadItems(page);
      if (this.itensContainer) {
        const offset = 100; // Altura do seu header (ajuste conforme necessário)
        const top = this.itensContainer.nativeElement.offsetTop - offset;

        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      }
    }
  }

  onItemClick(item: Item) {
    this.itemSelected.emit(item);
  }

  isSelected(item: Item): boolean {
    if (!this.selectedItemsInCategoria) {
      this.selectedItemsInCategoria = [];
    }
    return this.selectedItemsInCategoria.some(
      (selectedItem) => selectedItem.id === item.id
    );
  }

  // Função para remover o toast
  removeToast(index: number): void {
    this.toastMessages.splice(index, 1);
    if (this.toastMessages.length === 0) {
      this.showToast = false; // Esconde o toast quando não houver mais mensagens
    }
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item);

    const message = `${item.nome} adicionado ao carrinho!`;
    this.toastMessages.push(message); // Adiciona a mensagem à lista
    this.showToast = true;

    setTimeout(() => {
      this.removeToast(0); // Remove a mensagem mais antiga após 3 segundos
    }, 3000); // Exibe por 3 segundos
  }

  eventChamad(item: Number): void {
    console.log('Evento chamado');
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.loadItems(0); // reinicia na página 0
  }
}
