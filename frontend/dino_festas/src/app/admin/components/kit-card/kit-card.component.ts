import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Kit, KitService } from '../../../services/kit.service';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-kit-card',
  imports: [ModalConfirmacaoComponent, RouterModule],
  templateUrl: './kit-card.component.html',
  styleUrl: './kit-card.component.scss',
})
export class KitCardComponent {
  @Input() kit!: Kit;
  @Output() deleted = new EventEmitter<number>();
  mainImage: string = '';
  showModal: boolean = false;

  constructor(private kitService: KitService) {}

  ngOnInit(): void {
    this.mainImage = this.kit.imagens[0];
  }

  deleteKit(id: number): void {
    this.deleted.emit(this.kit.id);
  }

  abrirModal(): void {
    this.showModal = true;
  }

  cancelarAcao() {
    this.showModal = false;
  }
}
