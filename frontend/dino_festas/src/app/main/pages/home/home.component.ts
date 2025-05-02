import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ItensContainerComponent } from '../../components/itens-container/itens-container.component';
import { PacotesContainerComponent } from '../../components/pacotes-container/pacotes-container.component';

@Component({
  selector: 'app-home',
  imports: [ItensContainerComponent, PacotesContainerComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    const imgContainer = this.el.nativeElement.querySelector('.img-container');
    const bgImage = new Image();
    bgImage.src =
      'https://imagens-kits-dinofestas.s3.us-east-2.amazonaws.com/AdobeStock_1308923584.jpg'; // Use a URL com a extensão correta

    bgImage.onload = () => {
      // A imagem foi carregada, agora a classe "loaded" será aplicada
      this.renderer.addClass(imgContainer, 'loaded');
    };

    // Caso haja erro ao carregar a imagem, podemos adicionar uma verificação
    bgImage.onerror = () => {
      console.error('Erro ao carregar a imagem de fundo');
    };
  }
}
