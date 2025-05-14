import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
<<<<<<< HEAD
  ViewChild,
  ElementRef,
  AfterViewInit,
=======
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item, ItemService } from '../../../services/item.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
<<<<<<< HEAD
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../layout/loading-spinner/loading-spinner.component';
import { ShoppingCartService } from '../../../services/shopping-cart.service';
=======
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../layout/loading-spinner/loading-spinner.component';
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6

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
<<<<<<< HEAD
export class ItensContainerComponent implements OnChanges, AfterViewInit {
  @Input() nomeCategoria!: string;
  @Input() selectedItemsInCategoria: Item[] = [];
=======
export class ItensContainerComponent implements OnChanges {
  @Input() nomeCategoria!: string;
  @Input() selectedItemsInCategoria: Item[] = []; // Inicializa com um array vazio
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
  @Input() quantidadeCategoria!: number;
  @Input() searchQuery: string = '';
  @Output() itemSelected = new EventEmitter<Item>();

<<<<<<< HEAD
  @ViewChild('itensContainer') itensContainer!: ElementRef;

=======
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
  itens: Item[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  loading: boolean = false;
<<<<<<< HEAD
  isPacotePage: boolean = false;

  showToast = false;
  toastMessages: string[] = []; // Lista de mensagens de toast

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private router: Router
=======

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
  ) {}

  ngOnInit() {
    this.loadItems();
  }

<<<<<<< HEAD
  ngAfterViewInit() {
    this.isPacotePage = this.router.url.includes('/pacote'); // Verifica se a rota é '/pacote'
  }

  ngOnChanges() {
    if (this.nomeCategoria || this.searchQuery) {
      this.loadItems();
=======
  ngOnChanges() {
    if (this.nomeCategoria || this.searchQuery) {
      this.loadItems(); // Chama o método apenas quando necessário
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
    }
  }

  loadItems(page: number = 0) {
    this.loading = true;
    this.route.queryParamMap.subscribe((params) => {
<<<<<<< HEAD
      this.searchQuery = params.get('q')!;

      this.itemService
        .getItems(this.searchQuery, 0, 5000)
        .subscribe((pageData) => {
          let filteredItems: Item[] = [];

=======
      this.searchQuery = params.get('q')!; // Obtém o valor do parâmetro 'q'

      // Chama o backend para buscar todos os itens (sem aplicar a páginação no backend)
      this.itemService
        .getItems(this.searchQuery, 0, 1000)
        .subscribe((pageData) => {
          let filteredItems: Item[] = [];

          // Filtrando os itens por categoria ou pela query de pesquisa
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
          if (this.nomeCategoria) {
            filteredItems = pageData.content.filter(
              (item) =>
                item.categoria.toLowerCase() ===
                this.nomeCategoria.toLowerCase()
            );
          } else {
            filteredItems = pageData.content;
          }

<<<<<<< HEAD
          const itemsPerPage = 100;
          this.totalPages = Math.ceil(filteredItems.length / itemsPerPage);
          this.currentPage = page;

          const startIndex = page * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          this.itens = filteredItems.slice(startIndex, endIndex);
=======
          // Agora, vamos dividir os itens filtrados em páginas
          const itemsPerPage = 10; // Número de itens por página
          this.totalPages = Math.ceil(filteredItems.length / itemsPerPage); // Total de páginas com base nos itens filtrados
          this.currentPage = page;

          // Exibe os itens da página atual após a filtragem
          const startIndex = page * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          this.itens = filteredItems.slice(startIndex, endIndex); // Exibe apenas os itens da página atual
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
          this.loading = false;
        });
    });
  }

  onPageChange(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
<<<<<<< HEAD
      this.loadItems(page);
      if (this.itensContainer) {
        const offset = 100; // Altura do seu header (ajuste conforme necessário)
        const top = this.itensContainer.nativeElement.offsetTop - offset;

        window.scrollTo({
          top: top,
          behavior: 'smooth',
        });
      }
=======
      this.loadItems(page); // Chamado apenas quando a página mudar
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
    }
  }

  onItemClick(item: Item) {
    this.itemSelected.emit(item);
  }

  isSelected(item: Item): boolean {
    if (!this.selectedItemsInCategoria) {
<<<<<<< HEAD
=======
      // Garantir que selectedItemsInCategoria seja um array
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
      this.selectedItemsInCategoria = [];
    }
    return this.selectedItemsInCategoria.some(
      (selectedItem) => selectedItem.id === item.id
    );
  }
<<<<<<< HEAD

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
=======
>>>>>>> bbdc2e88d698ed245342a75f75bd19e55d544fc6
}
