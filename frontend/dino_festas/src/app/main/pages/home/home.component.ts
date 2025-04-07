import { Component } from '@angular/core';
import { ItensContainerComponent } from '../../components/itens-container/itens-container.component';

@Component({
  selector: 'app-home',
  imports: [ItensContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
