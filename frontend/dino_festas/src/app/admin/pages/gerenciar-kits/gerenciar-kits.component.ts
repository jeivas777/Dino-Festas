import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { KitService } from '../../../services/kit.service';
import { KitCardComponent } from '../../components/kit-card/kit-card.component';

@Component({
  selector: 'app-gerenciar-kits',
  imports: [FormsModule, RouterModule, KitCardComponent],
  templateUrl: './gerenciar-kits.component.html',
  styleUrl: './gerenciar-kits.component.scss',
})
export class GerenciarKitsComponent {
  nome: string = '';

  onSubmit(form: NgForm) {
    console.log('Form submitted:', form.value);
  }
}
