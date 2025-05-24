import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ItemCardComponent } from '../../../components/item-card/item-card.component';
import { Item, ItemService } from '../../../../services/item.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../../main/components/pagination/pagination.component';
import { LoadingSpinnerComponent } from '../../../../layout/loading-spinner/loading-spinner.component'; // Import the loading spinner

@Component({
  selector: 'app-gerenciar-itens',
  imports: [
    FormsModule,
    RouterModule,
    ItemCardComponent,
    CommonModule,
    PaginationComponent,
    LoadingSpinnerComponent, // Import the loading spinner component
  ],
  templateUrl: './gerenciar-itens.component.html',
  styleUrls: ['./gerenciar-itens.component.scss'],
})
export class GerenciarItensComponent {
  itens: Item[] = []; // Array de itens
  query: string = ''; // Search query
  totalPages: number = 0; // Total pages for pagination
  currentPage: number = 0; // Current page number
  loading: boolean = false; // Flag for loading state
  itemsPerPage: number = 50; // Number of items per page

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') || '';
      this.loadItems(this.currentPage);
    });
  }

  loadItems(page: number = 0) {
    this.loading = true;

    this.itemService.getItems(this.query, 0, 5000).subscribe((pageData) => {
      let filteredItems: Item[] = [];

      filteredItems = pageData.content;

      this.totalPages = Math.ceil(filteredItems.length / this.itemsPerPage);
      this.currentPage = page;

      const startIndex = page * Number(this.itemsPerPage);

      const endIndex = startIndex + Number(this.itemsPerPage);
      this.itens = filteredItems.slice(startIndex, endIndex);
      this.loading = false;
    });
  }

  onSubmit(form: NgForm) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: form.value.query },
      queryParamsHandling: 'merge',
    });
  }

  removeItem(id: number) {
    this.itemService.deleteItem(id).subscribe((res) => {
      this.itens = this.itens.filter((item) => item.id !== id); // Remove o kit deletado do array
    });
  }

  onPageChange(page: number) {
    if (this.currentPage !== page) {
      this.currentPage = page;
      this.loadItems(page);
    }
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.loadItems(0); // reinicia na página 0
  }
}
