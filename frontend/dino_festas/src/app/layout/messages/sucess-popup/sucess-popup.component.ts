import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sucess-popup',
  imports: [CommonModule],
  templateUrl: './sucess-popup.component.html',
  styleUrl: './sucess-popup.component.scss',
})
export class SucessPopupComponent {
  @Input() message: string = 'Operação realizada com sucesso!';
  @Input() show: boolean = false;
}
