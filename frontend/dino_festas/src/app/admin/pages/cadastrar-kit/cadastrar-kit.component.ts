import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { KitService } from '../../../services/kit.service';
import { Item } from '../../../services/item.service';
import { HttpClientModule } from '@angular/common/http'; // Importa o módulo HTTP
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cadastrar-kit',
  imports: [FormsModule, RouterModule],
  templateUrl: './cadastrar-kit.component.html',
  styleUrl: './cadastrar-kit.component.scss',
})
export class CadastrarKitComponent {
  nome: string = '';
  imagens: string[] = []; // Array de URLs de imagens
  itens: Item[] = []; // Array de itens que pertencem ao kit

  constructor(private kitService: KitService) {}

  onSubmit(form: NgForm) {
    const kit = {
      nome: this.nome,
      imagens: this.imagens,
      itens: this.itens,
    };

    this.kitService.createKit(kit).subscribe((res) => {
      console.log('Kit cadastrado com sucesso!', res);
      form.resetForm(); // Limpa o formulário após o envio
    });
  }
}
