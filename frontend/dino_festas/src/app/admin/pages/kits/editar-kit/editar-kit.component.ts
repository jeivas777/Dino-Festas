import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { ErrorMessageComponent } from '../../../../layout/messages/error-message/error-message.component';
import { Kit, KitService } from '../../../../services/kit.service';
import { CategoriasService } from '../../../../services/categorias.service';

@Component({
  selector: 'app-editar-kit',
  imports: [
    FormsModule,
    RouterModule,
    SucessPopupComponent,
    ErrorMessageComponent,
    CommonModule,
  ],
  templateUrl: './editar-kit.component.html',
  styleUrl: './editar-kit.component.scss',
})
export class EditarKitComponent {
  nome: string = '';
  valor: number = 0.0;
  categorias: { nome: string; quantidade: number }[] = [];
  imagens: string[] = [];
  categoriasDisponiveis: { nome: string }[] = [];
  selectedFiles: File[] = [];
  showSucess: boolean = false;
  kit!: Kit;
  kitId: number = 0;

  constructor(
    private kitService: KitService,
    private categoriasService: CategoriasService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.kitId = +idParam;
    }

    this.kitService.getKit(this.kitId).subscribe((kit) => {
      this.nome = kit.nome;
      this.valor = kit.valor;
      this.imagens = kit.imagens;
      this.categorias = kit.categorias;
      this.kit = kit;
    });

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
      const kitUpdate = {
        nome: this.nome,
        imagens: this.selectedFiles.length > 0 ? [] : this.imagens,
        valor: this.valor,
        categorias: this.categorias,
      };

      if (this.selectedFiles.length > 0) {
        this.kitService
          .uploadImages(this.selectedFiles)
          .subscribe((urls: string[]) => {
            kitUpdate.imagens = urls;
            this.kitService.updateKit(this.kitId, kitUpdate).subscribe(() => {
              this.showSucess = true;
              setTimeout(() => {
                this.router.navigate(['/admin/pacotes']);
              }, 1000);
            });
          });
      } else {
        this.kitService.updateKit(this.kitId, kitUpdate).subscribe(() => {
          this.showSucess = true;
          setTimeout(() => {
            this.router.navigate(['/admin/pacotes']);
          }, 2000);
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
