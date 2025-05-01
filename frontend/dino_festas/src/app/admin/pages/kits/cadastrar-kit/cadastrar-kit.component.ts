import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { KitService } from '../../../../services/kit.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { ErrorMessageComponent } from '../../../../layout/messages/error-message/error-message.component';
import { CommonModule } from '@angular/common';
import { CategoriasService } from '../../../../services/categorias.service';

@Component({
  selector: 'app-cadastrar-kit',
  imports: [
    FormsModule,
    RouterModule,
    SucessPopupComponent,
    ErrorMessageComponent,
    CommonModule,
  ],
  templateUrl: './cadastrar-kit.component.html',
  styleUrl: './cadastrar-kit.component.scss',
})
export class CadastrarKitComponent {
  nome: string = '';
  valor: number = 0.0;
  categorias: { nome: string; quantidade: number }[] = [];
  categoriasDisponiveis: { nome: string }[] = [];
  imagens: string[] = [];
  selectedFiles: File[] = [];
  showSucess: boolean = false;

  constructor(
    private kitService: KitService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoriasService.getCategorias().subscribe((res) => {
      this.categoriasDisponiveis = res;
    });
  }

  addCategoria() {
    this.categorias.push({ nome: '', quantidade: 0 });
  }

  removeCategoria(index: number) {
    this.categorias.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.kitService
        .uploadImages(this.selectedFiles)
        .subscribe((urls: string[]) => {
          const kit = {
            nome: this.nome,
            valor: this.valor,
            imagens: urls,
            categorias: this.categorias,
          };

          this.kitService.createKit(kit).subscribe((res) => {
            this.showSucess = true;
            form.resetForm();
            this.categorias = [];
            setTimeout(() => {
              this.router.navigate(['/admin/pacotes']);
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
