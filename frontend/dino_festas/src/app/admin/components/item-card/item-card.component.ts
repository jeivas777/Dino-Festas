import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Item, ItemService } from '../../../services/item.service';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';

@Component({
  selector: 'app-item-card',
  imports: [RouterModule, CommonModule, ModalConfirmacaoComponent],
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.scss',
})
export class ItemCardComponent {
  @Input() item!: Item;
  @Output() deleted = new EventEmitter<number>();
  mainImage: string = '';
  showModal: boolean = false;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.mainImage = this.item.imagens[0];
  }

  deleteKit(id: number): void {
    this.deleted.emit(this.item.id);
  }

  abrirModal(): void {
    this.showModal = true;
  }

  cancelarAcao() {
    this.showModal = false;
  }
}
