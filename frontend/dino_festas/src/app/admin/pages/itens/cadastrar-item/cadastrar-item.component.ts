import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Kit, KitService } from '../../../../services/kit.service';
import { Item, ItemService } from '../../../../services/item.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { ErrorMessageComponent } from '../../../../layout/messages/error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../../../services/categorias.service';

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
    private router: Router,
    private categorias: CategoriasService
  ) {}

  ngOnInit(): void {
    this.carregarCategoriasDisponiveis();
  }

  carregarCategoriasDisponiveis() {
    const categoriasSet = new Set<string>();

    // Percorre os kits e adiciona as categorias únicas no Set
    this.categorias.getCategorias().subscribe((res) => {
      categoriasSet.add(res.nome); // Adiciona o nome da categoria no Set
      this.categoriasDisponiveis = [...categoriasSet];
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const maxSize = 2 * 1024 * 1024; // 2MB
    const validFiles: File[] = [];
    let rejectedFiles: string[] = [];

    Array.from(input.files).forEach((file) => {
      if (file.size <= maxSize) {
        validFiles.push(file);
      } else {
        rejectedFiles.push(file.name);
      }
    });

    if (rejectedFiles.length > 0) {
      alert(
        `Os seguintes arquivos excedem o limite de 2MB e foram ignorados:\n\n${rejectedFiles.join(
          '\n'
        )}`
      );
    }

    this.selectedFiles = validFiles;
  }

  markAllFieldsAsTouched(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
