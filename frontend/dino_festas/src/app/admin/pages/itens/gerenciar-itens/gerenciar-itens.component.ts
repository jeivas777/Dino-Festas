import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KitCardComponent } from '../../../components/kit-card/kit-card.component';
import { ItemCardComponent } from '../../../components/item-card/item-card.component';
import { Kit, KitService } from '../../../../services/kit.service';
import { CommonModule } from '@angular/common';
import { Item, ItemService } from '../../../../services/item.service';
import { PaginationComponent } from '../../../../main/components/pagination/pagination.component';

@Component({
  selector: 'app-gerenciar-itens',
  imports: [
    FormsModule,
    RouterModule,
    ItemCardComponent,
    CommonModule,
    PaginationComponent,
  ],
  templateUrl: './gerenciar-itens.component.html',
  styleUrl: './gerenciar-itens.component.scss',
})
export class GerenciarItensComponent {
  itens: Item[] = []; // Array de itens que pertencem ao kit
  searchedItens: Item[] = []; // Array de itens que pertencem ao kit
  query: string = '';
  totalPages: number = 0;
  currentPage: number = 0;

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
    this.itemService.getItems(query, page).subscribe((res) => {
      this.itens = res.content;
      this.totalPages = res.totalPages;
      this.currentPage = res.number;
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
