import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Kit, KitService } from '../../../../services/kit.service';
import { Item, ItemService } from '../../../../services/item.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  descricao: string = '';
  imagens: string[] = []; // Array de URLs de imagens
  itens: Item[] = []; // Array de itens que pertencem ao kit
  selectedFiles: File[] = [];
  showSucess: boolean = false;

  kit!: Kit;

  constructor(
    private kitService: KitService,
    private itemService: ItemService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParam = +this.route.snapshot.paramMap.get('id')!;

    this.kitService.getKit(idParam).subscribe((kit) => {
      this.kit = kit;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.kitService
        .uploadImages(this.selectedFiles)
        .subscribe((urls: string[]) => {
          const item = {
            nome: this.nome,
            descricao: this.descricao,
            imagens: urls,
            kit: this.kit,
          };

          this.itemService.createItem(item).subscribe((res) => {
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
