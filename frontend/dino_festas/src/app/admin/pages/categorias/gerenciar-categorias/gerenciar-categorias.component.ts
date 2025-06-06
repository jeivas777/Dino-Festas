import { Component } from '@angular/core';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CategoriasService } from '../../../../services/categorias.service';
import { LoadingSpinnerComponent } from '../../../../layout/loading-spinner/loading-spinner.component';
import { ItemService } from '../../../../services/item.service';
import { catchError, forkJoin, map, of } from 'rxjs';

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
  categorias: { nome: string; vinculada: boolean }[] = [];
  categoriasOriginais: { nome: string; vinculada: boolean }[] = [];
  showSucess: boolean = false;
  loading: boolean = false;

  constructor(
    private categoriaService: CategoriasService,
    private itemService: ItemService
  ) {}

  ngOnInit() {
    this.carregarCategorias();
  }

  carregarCategorias() {
    this.loading = true;

    this.categoriaService.getCategorias().subscribe((res) => {
      this.categorias = res.map((categoria: any) => ({
        ...categoria,
        vinculada: false,
      }));

      this.categoriasOriginais = JSON.parse(JSON.stringify(this.categorias));

      this.verificarCategoriasAtivas().subscribe({
        next: () => {
          this.loading = false;
        },
        error: (err) => {
          console.error('Erro ao verificar categorias ativas', err);
          this.loading = false;
        },
      });
    });
  }

  verificarCategoriasAtivas() {
    const verificacoes = this.categorias.map((categoria, index) => {
      return this.itemService.getItems('', categoria.nome, 0, 1).pipe(
        map((page) => {
          this.categorias[index].vinculada = page.totalElements > 0;
        }),
        catchError((err) => {
          console.error(
            `Erro ao verificar vínculo da categoria ${categoria.nome}`,
            err
          );
          this.categorias[index].vinculada = false;
          return of(null);
        })
      );
    });

    return forkJoin(verificacoes);
  }

  addCategoria() {
    this.categorias.push({ nome: '', vinculada: false });
  }

  removeCategoria(index: number) {
    this.categorias.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.categoriaService
        .atualizarTodasCategorias(this.categorias)
        .subscribe({
          next: () => {
            this.loading = false;
            this.showSucess = true;
            this.carregarCategorias(); // recarrega do servidor
          },
          error: (err) => {
            this.loading = false;
            console.error('Erro ao salvar categorias', err);
          },
        });
    }
  }

  reverterCategorias() {
    this.categorias = JSON.parse(JSON.stringify(this.categoriasOriginais));
  }
}
