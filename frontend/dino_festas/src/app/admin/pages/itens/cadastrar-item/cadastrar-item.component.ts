import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Kit, KitService } from '../../../../services/kit.service';
import { Item, ItemService } from '../../../../services/item.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { ErrorMessageComponent } from '../../../../layout/messages/error-message/error-message.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastrar-item',
  imports: [
    FormsModule,
    RouterModule,
    SucessPopupComponent,
    ErrorMessageComponent,
    CommonModule,
  ],
  templateUrl: './cadastrar-item.component.html',
  styleUrl: './cadastrar-item.component.scss',
})
export class CadastrarItemComponent {
  nome: string = '';
  categoria: string = '';
  codigo: number = 0;
  valor: number = 0;
  tema: string = '';
  imagens: string[] = [];
  itens: Item[] = [];
  selectedFiles: File[] = [];
  showSucess: boolean = false;

  kit!: Kit;
  categoriasDisponiveis: string[] = [];

  constructor(
    private kitService: KitService,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarCategoriasDisponiveis();
  }

  carregarCategoriasDisponiveis() {
    const categoriasSet = new Set<string>();

    // Percorre os kits e adiciona as categorias únicas no Set
    this.kitService.getKits().subscribe((kits) => {
      kits.forEach((kit) => {
        kit.categorias.forEach((categoria) => {
          categoriasSet.add(categoria.nome); // Adiciona o nome da categoria no Set
          this.categoriasDisponiveis = [...categoriasSet];
        });
      });
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.kitService
        .uploadImages(this.selectedFiles)
        .subscribe((urls: string[]) => {
          const item = {
            nome: this.nome,
            categoria: this.categoria,
            codigo: this.codigo,
            valor: this.valor,
            imagens: urls,
            tema: this.tema,
          };

          this.itemService.createItem(item).subscribe((res) => {
            this.showSucess = true;
            setTimeout(() => {
              this.router.navigate(['/admin/itens']);
            }, 2000);
          });
        });
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
