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

  constructor(
    private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('q') || '';
      this.loadItems(this.query);
    });
  }

  loadItems(query: string = '', page: number = 0): void {
    this.loading = true; // Start loading
    this.itemService.getItems(query, page).subscribe((res) => {
      this.itens = res.content;
      this.totalPages = res.totalPages;
      this.currentPage = res.number;
      this.loading = false; // End loading once data is fetched
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
    this.loadItems(this.query, page);
  }
}
