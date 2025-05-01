import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ItensContainerComponent } from '../../components/itens-container/itens-container.component';
import { PacotesContainerComponent } from '../../components/pacotes-container/pacotes-container.component';

@Component({
  selector: 'app-home',
  imports: [ItensContainerComponent, PacotesContainerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    const imgContainer = this.el.nativeElement.querySelector('.img-container');
    const bgImage = new Image();
    bgImage.src =
      'https://imagens-kits-dinofestas.s3.us-east-2.amazonaws.com/AdobeStock_1308923584.jpeg';

    bgImage.onload = () => {
      this.renderer.addClass(imgContainer, 'loaded');
    };
  }
}
