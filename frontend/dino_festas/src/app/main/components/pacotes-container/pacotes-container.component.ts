import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PacotesCardComponent } from '../pacotes-card/pacotes-card.component';
import { Kit, KitService } from '../../../services/kit.service';

@Component({
  selector: 'app-pacotes-container',
  standalone: true,
  imports: [CommonModule, PacotesCardComponent],
  templateUrl: './pacotes-container.component.html',
  styleUrl: './pacotes-container.component.scss',
})
export class PacotesContainerComponent {
  pacotes: Kit[] = [];
  pacotesPaginados: Kit[][] = [];

  constructor(private pacotesService: KitService) {}

  ngOnInit() {
    this.pacotesService.getKits().subscribe((res) => {
      this.pacotes = res;
      this.paginarPacotes();
    });
  }

  private paginarPacotes() {
    const tamanhoPagina = 3;
    for (let i = 0; i < this.pacotes.length; i += tamanhoPagina) {
      this.pacotesPaginados.push(this.pacotes.slice(i, i + tamanhoPagina));
    }
  }
}
