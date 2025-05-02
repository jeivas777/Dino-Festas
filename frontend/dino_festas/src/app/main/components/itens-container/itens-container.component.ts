import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item, ItemService } from '../../../services/item.service';
import { ItemCardComponent } from '../item-card/item-card.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../layout/loading-spinner/loading-spinner.component';

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
export class ItensContainerComponent implements OnChanges {
  @Input() nomeCategoria!: string;
  @Input() selectedItemsInCategoria: Item[] = []; // Inicializa com um array vazio
  @Input() quantidadeCategoria!: number;
  @Input() searchQuery: string = '';
  @Output() itemSelected = new EventEmitter<Item>();

  itens: Item[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  loading: boolean = false;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  ngOnChanges() {
    this.loadItems();
  }

  loadItems(page: number = 0) {
    this.loading = true;
    this.route.queryParamMap.subscribe((params) => {
      this.searchQuery = params.get('q')!; // Obtém o valor do parâmetro 'q'

      // Chama o backend para buscar todos os itens (sem aplicar a páginação no backend)
      this.itemService
        .getItems(this.searchQuery, 0, 1000)
        .subscribe((pageData) => {
          let filteredItems: Item[] = [];

          // Filtrando os itens por categoria ou pela query de pesquisa
          if (this.nomeCategoria) {
            filteredItems = pageData.content.filter(
              (item) =>
                item.categoria.toLowerCase() ===
                this.nomeCategoria.toLowerCase()
            );
          } else {
            filteredItems = pageData.content;
          }

          // Agora, vamos dividir os itens filtrados em páginas
          const itemsPerPage = 10; // Número de itens por página
          this.totalPages = Math.ceil(filteredItems.length / itemsPerPage); // Total de páginas com base nos itens filtrados
          this.currentPage = page;

          // Exibe os itens da página atual após a filtragem
          const startIndex = page * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          this.itens = filteredItems.slice(startIndex, endIndex); // Exibe apenas os itens da página atual
          this.loading = false;
        });
    });
  }

  onPageChange(page: number) {
    this.loadItems(page);
  }

  onItemClick(item: Item) {
    this.itemSelected.emit(item);
  }

  isSelected(item: Item): boolean {
    if (!this.selectedItemsInCategoria) {
      // Garantir que selectedItemsInCategoria seja um array
      this.selectedItemsInCategoria = [];
    }
    return this.selectedItemsInCategoria.some(
      (selectedItem) => selectedItem.id === item.id
    );
  }
}
