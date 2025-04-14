import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { ErrorMessageComponent } from '../../../../layout/messages/error-message/error-message.component';
import { Kit, KitService } from '../../../../services/kit.service';
import { Item } from '../../../../services/item.service';

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
  imagens: string[] = []; // Array de URLs de imagens

  selectedFiles: File[] = [];
  showSucess: boolean = false;

  kit!: Kit;
  kitId: number = 0;

  constructor(private kitService: KitService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.kitId = +idParam;
    }

    this.kitService.getKit(this.kitId).subscribe((kit) => {
      this.nome = kit.nome;
      this.kit = kit;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.kitService
        .uploadImages(this.selectedFiles)
        .subscribe((urls: string[]) => {
          const kit = {
            nome: this.nome,
            imagens: urls,
            itens: this.kit.itens,
          };

          console.log(this.kitId);
          this.kitService.updateKit(this.kitId, kit).subscribe((res) => {
            this.showSucess = true; // Exibe o popup de sucesso
            form.resetForm();
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
