import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styleUrl: './pagination.component.scss',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() totalPages: number = 1;
  @Input() currentPage: number = 0; // começa em 0
  @Input() itemsPerPage: number = 50;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  itemsPerPageOptions = [10, 20, 50, 100];

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPageChange.emit(newItemsPerPage);
    this.goToPage(0);
  }
}
