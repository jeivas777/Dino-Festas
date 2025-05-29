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
import { debounceTime } from 'rxjs/operators';

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
    // Escuta alterações da URL
    this.route.queryParamMap.subscribe((params) => {
      const novaBusca = params.get('q') ?? '';
      this.searchQuery = novaBusca;
    });

    combineLatest([this.categoria$, this.searchQuery$])
      .pipe(debounceTime(100))
      .subscribe(([categoria, query]) => {
        this.loadItems(this.currentPage, query, categoria ?? '');
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
      this.currentPage = page;
      this.loadItems(page, this._searchQuery, this._nomeCategoria);

      if (this.itensContainer) {
        const offset = 100;
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
    this.loadItems(0, this._searchQuery, this._nomeCategoria);
  }
}
