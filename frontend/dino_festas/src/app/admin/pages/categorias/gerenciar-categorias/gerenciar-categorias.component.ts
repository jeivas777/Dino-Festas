import { Component } from '@angular/core';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriasService } from '../../../../services/categorias.service';
import { LoadingSpinnerComponent } from '../../../../layout/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-gerenciar-categorias',
  imports: [
    SucessPopupComponent,
    CommonModule,
    FormsModule,
    RouterModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './gerenciar-categorias.component.html',
  styleUrl: './gerenciar-categorias.component.scss',
})
export class GerenciarCategoriasComponent {
  categorias: { nome: string }[] = [];
  categoriasOriginais: { nome: string }[] = [];
  showSucess: boolean = false;
  loading: boolean = false;

  constructor(private categoriaService: CategoriasService) {}

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.loading = true;
    this.categoriaService.getCategorias().subscribe((res) => {
      this.categorias = [...res];
      this.categoriasOriginais = JSON.parse(JSON.stringify(res));
      this.loading = false;
    });
  }

  addCategoria() {
    this.categorias.push({ nome: '' });
  }

  removeCategoria(index: number) {
    this.categorias.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.categoriaService
        .atualizarTodasCategorias(this.categorias)
        .subscribe({
          next: () => {
            this.showSucess = true;
            this.carregarCategorias(); // recarrega do servidor
          },
          error: (err) => {
            console.error('Erro ao salvar categorias', err);
          },
        });
    }
  }

  reverterCategorias() {
    this.categorias = JSON.parse(JSON.stringify(this.categoriasOriginais));
  }
}
