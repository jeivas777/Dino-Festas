import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
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
  tamanhoPagina: number = 3; // padrão: 3 pacotes

  constructor(private pacotesService: KitService) {}

  ngOnInit() {
    this.definirTamanhoPagina();
    this.pacotesService.getKits().subscribe((res) => {
      this.pacotes = res;
      this.paginarPacotes();
    });
  }

  private definirTamanhoPagina() {
    this.tamanhoPagina = window.innerWidth <= 768 ? 1 : 3;
  }

  @HostListener('window:resize')
  onResize() {
    const novoTamanhoPagina = window.innerWidth <= 768 ? 1 : 3;
    if (novoTamanhoPagina !== this.tamanhoPagina) {
      this.tamanhoPagina = novoTamanhoPagina;
      this.paginarPacotes();
    }
  }

  private paginarPacotes() {
    this.pacotesPaginados = []; // limpar anterior
    for (let i = 0; i < this.pacotes.length; i += this.tamanhoPagina) {
      this.pacotesPaginados.push(this.pacotes.slice(i, i + this.tamanhoPagina));
    }
  }
}
