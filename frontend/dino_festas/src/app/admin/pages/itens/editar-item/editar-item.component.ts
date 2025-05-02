import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { ErrorMessageComponent } from '../../../../layout/messages/error-message/error-message.component';
import { Kit, KitService } from '../../../../services/kit.service';
import { Item, ItemService } from '../../../../services/item.service';
import { LoadingSpinnerComponent } from '../../../../layout/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-editar-item',
  imports: [
    FormsModule,
    RouterModule,
    SucessPopupComponent,
    ErrorMessageComponent,
    CommonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './editar-item.component.html',
  styleUrl: './editar-item.component.scss',
})
export class EditarItemComponent {
  nome: string = '';
  categoria: string = '';
  tema: string = '';
  codigo: number = 0;
  valor: number = 0;
  loading: boolean = false;

  imagens: string[] = []; // Array de URLs de imagens
  categoriasDisponiveis: string[] = [];

  selectedFiles: File[] = [];
  showSucess: boolean = false;

  item!: Item;
  itemId: number = 0;

  kit!: Kit;

  constructor(
    private itemService: ItemService,
    private kitService: KitService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const itemId = +this.route.snapshot.paramMap.get('id')!;

    this.loading = true;

    this.itemService.getItem(itemId).subscribe((item) => {
      this.item = item;
      this.nome = item.nome;
      this.categoria = item.categoria;
      this.codigo = item.codigo;
      this.valor = item.valor;
      this.tema = item.tema;
    });

    this.carregarCategoriasDisponiveis();
    this.loading = false;
  }

  carregarCategoriasDisponiveis() {
    const categoriasSet = new Set<string>();

    // Percorre os kits e adiciona as categorias únicas no Set
    this.kitService.getKits().subscribe((kits) => {
      kits.forEach((kit) => {
        kit.categorias.forEach((categoria) => {
          categoriasSet.add(categoria.nome); // Adiciona o nome da categoria no Set
        });
      });
      this.categoriasDisponiveis = [...categoriasSet]; // Atualiza a lista de categorias
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      if (this.selectedFiles.length > 0) {
        this.kitService
          .uploadImages(this.selectedFiles)
          .subscribe((urls: string[]) => {
            const item = {
              nome: this.nome,
              categoria: this.categoria,
              codigo: this.codigo,
              tema: this.tema,
              valor: this.valor,
              imagens: urls,
            };

            this.itemService
              .updateItem(this.item.id!, item)
              .subscribe((res) => {
                this.loading = false;
                this.showSucess = true; // Exibe o popup de sucesso
                setTimeout(() => {
                  this.router.navigate(['/admin/itens']);
                }, 1000);
              });
          });
      } else {
        const item = {
          nome: this.nome,
          categoria: this.categoria,
          tema: this.tema,
          codigo: this.codigo,
          valor: this.valor,
          imagens: this.item.imagens,
        };

        this.itemService.updateItem(this.item.id!, item).subscribe((res) => {
          this.loading = false;
          this.showSucess = true; // Exibe o popup de sucesso
          setTimeout(() => {
            this.router.navigate(['/admin/itens']);
          }, 1000);
        });
      }
    } else {
      this.markAllFieldsAsTouched(form);
    }
  }

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);
  }

  markAllFieldsAsTouched(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
