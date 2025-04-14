import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirmacao',
  imports: [CommonModule],
  templateUrl: './modal-confirmacao.component.html',
  styleUrl: './modal-confirmacao.component.scss',
})
export class ModalConfirmacaoComponent {
  @Input() show = false;
  @Input() title = 'Confirmação';
  @Input() message = 'Você tem certeza que deseja continuar?';

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();
}
