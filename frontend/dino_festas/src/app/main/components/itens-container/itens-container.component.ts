import {
  Component,
  Input,
  Output,
  EventEmitter,
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
import { BehaviorSubject, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

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
export class ItensContainerComponent implements AfterViewInit {
  private categoria$ = new BehaviorSubject<string | null>(null);
  private searchQuery$ = new BehaviorSubject<string>('');
  private page$ = new BehaviorSubject<number>(0); // 1. BehaviorSubject para a página

  @Input() selectedItemsInCategoria: Item[] = [];
  @Input() quantidadeCategoria!: number;
  @Output() itemSelected = new EventEmitter<Item>();

  @ViewChild('itensContainer') itensContainer!: ElementRef;

  itens: Item[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  itemsPerPage: number = 50;

  loading: boolean = false;
  isPacotePage: boolean = false;

  showToast = false;
  toastMessages: string[] = [];

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService,
    private router: Router
  ) {}

  // Inputs reativos com setters
  private _nomeCategoria: string = '';
  @Input() set nomeCategoria(value: string) {
    this._nomeCategoria = value;
    this.categoria$.next(value);
  }

  private _searchQuery: string = '';
  @Input() set searchQuery(value: string) {
    this._searchQuery = value;
    this.searchQuery$.next(value);
  }

  ngOnInit() {
    // 2. Escuta a URL para definir o estado inicial e reativo
    this.route.queryParamMap
      .pipe(
        map((params) => ({
          q: params.get('q') ?? '',
          page: params.get('page') ? +params.get('page')! : 0,
        })),
        distinctUntilChanged(
          (prev, curr) => prev.q === curr.q && prev.page === curr.page
        )
      )
      .subscribe((params) => {
        this.searchQuery$.next(params.q);
        this.page$.next(params.page);
        this.currentPage = params.page; // Sincroniza o estado local
      });

    // 3. combineLatest agora inclui a página
    combineLatest([this.categoria$, this.searchQuery$, this.page$])
      .pipe(debounceTime(100))
      .subscribe(([categoria, query, page]) => {
        // O loadItems agora é acionado por qualquer uma das três alterações
        this.loadItems(page, query, categoria ?? '');
      });
  }

  ngAfterViewInit() {
    this.isPacotePage = this.router.url.includes('/pacote');
  }

  loadItems(page: number = 0, query: string, categoria: string = '') {
    this.loading = true;

    this.itemService
      .getItems(query, categoria, page, this.itemsPerPage)
      .subscribe((pageData) => {
        this.itens = pageData.content;
        this.totalPages = pageData.totalPages;
        this.currentPage = pageData.number;
        this.loading = false;
      });
  }

  onPageChange(page: number) {
    if (this.currentPage !== page) {
      // Se a navegação for para a página 0, definimos o parâmetro como nulo para
      // removê-lo da URL. Para outras páginas, usamos o número da página.
      // Isso cria uma URL canônica para a primeira página e garante a detecção da mudança.
      const pageParam = page === 0 ? null : page;

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: pageParam },
        queryParamsHandling: 'merge', // Mantém os outros query params (ex: 'q')
      });

      // Scroll para o topo do container
      if (this.itensContainer) {
        const offset = 100;
        const top = this.itensContainer.nativeElement.offsetTop - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
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

  removeToast(index: number): void {
    this.toastMessages.splice(index, 1);
    if (this.toastMessages.length === 0) {
      this.showToast = false;
    }
  }

  addToCart(item: Item): void {
    this.cartService.addToCart(item);

    const message = `${item.nome} adicionado ao carrinho!`;
    this.toastMessages.push(message);
    this.showToast = true;

    setTimeout(() => {
      this.removeToast(0);
    }, 3000);
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;

    // Se já estivermos na página 0, a navegação não será acionada.
    // Nesse caso, chamamos `loadItems` diretamente para forçar a atualização.
    if (this.currentPage === 0) {
      this.loadItems(
        0,
        this.searchQuery$.getValue(),
        this.categoria$.getValue() ?? ''
      );
    } else {
      // Se estivermos em outra página, a navegação para a página 0 funcionará
      // e acionará o fluxo reativo normalmente.
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: null }, // Volta para a página 0, removendo o parâmetro
        queryParamsHandling: 'merge', // Mantém o query param 'q' existente
      });
    }
  }
}
