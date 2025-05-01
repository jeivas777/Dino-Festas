import { Component, Input } from '@angular/core';
import { Kit } from '../../../services/kit.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pacotes-card',
  imports: [RouterModule],
  templateUrl: './pacotes-card.component.html',
  styleUrl: './pacotes-card.component.scss',
})
export class PacotesCardComponent {
  @Input() pacote!: Kit;
}
