import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { KitService } from '../../../../services/kit.service';
import { Item } from '../../../../services/item.service';
import { Router, RouterModule } from '@angular/router';
import { SucessPopupComponent } from '../../../../layout/messages/sucess-popup/sucess-popup.component';
import { ErrorMessageComponent } from '../../../../layout/messages/error-message/error-message.component';

@Component({
  selector: 'app-cadastrar-kit',
  imports: [
    FormsModule,
    RouterModule,
    SucessPopupComponent,
    ErrorMessageComponent,
  ],
  templateUrl: './cadastrar-kit.component.html',
  styleUrl: './cadastrar-kit.component.scss',
})
export class CadastrarKitComponent {
  nome: string = '';
  imagens: string[] = []; // Array de URLs de imagens
  itens: Item[] = []; // Array de itens que pertencem ao kit
  selectedFiles: File[] = [];
  showSucess: boolean = false;

  constructor(private kitService: KitService) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.kitService
        .uploadImages(this.selectedFiles)
        .subscribe((urls: string[]) => {
          const kit = {
            nome: this.nome,
            imagens: urls,
            itens: this.itens,
          };

          this.kitService.createKit(kit).subscribe((res) => {
            console.log('Kit cadastrado com sucesso!', res);
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
