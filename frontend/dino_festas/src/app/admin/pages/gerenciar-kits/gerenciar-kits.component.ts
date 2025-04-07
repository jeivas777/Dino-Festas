import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KitService } from '../../../services/kit.service';

@Component({
  selector: 'app-gerenciar-kits',
  imports: [FormsModule, RouterModule],
  templateUrl: './gerenciar-kits.component.html',
  styleUrl: './gerenciar-kits.component.scss',
})
export class GerenciarKitsComponent {
  nome: string = '';

  onSubmit(form: NgForm) {
    console.log('Form submitted:', form.value);
  }
}
