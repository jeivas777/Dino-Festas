import { Component } from '@angular/core';
import { ItensContainerComponent } from '../main/components/itens-container/itens-container.component';

@Component({
  selector: 'app-search',
  imports: [ItensContainerComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {}
