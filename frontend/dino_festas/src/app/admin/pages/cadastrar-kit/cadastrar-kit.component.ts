import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { KitService } from '../../../services/kit.service';
import { Item } from '../../../services/item.service';
import { HttpClientModule } from '@angular/common/http'; // Importa o módulo HTTP

@Component({
  selector: 'app-cadastrar-kit',
  imports: [FormsModule],
  templateUrl: './cadastrar-kit.component.html',
  styleUrl: './cadastrar-kit.component.scss',
})
export class CadastrarKitComponent {
  id: number | null = null;
  nome: string | null = null;
  descricao: string | null = null;
  imagens: string[] | null = null; // Array de URLs de imagens
  itens: Item[] | null = null; // Array de itens que pertencem ao kit

  constructor(private kitService: KitService) {}

  onSubmit(form: NgForm) {
    console.log('Form submitted:', form.value);
  }
}
