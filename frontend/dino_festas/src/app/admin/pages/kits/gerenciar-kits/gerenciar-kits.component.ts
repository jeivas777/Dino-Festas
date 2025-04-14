import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Kit, KitService } from '../../../../services/kit.service';
import { KitCardComponent } from '../../../components/kit-card/kit-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gerenciar-kits',
  imports: [FormsModule, RouterModule, KitCardComponent, CommonModule],
  templateUrl: './gerenciar-kits.component.html',
  styleUrl: './gerenciar-kits.component.scss',
})
export class GerenciarKitsComponent {
  query: string = '';
  kits: Kit[] = []; // Array de kits

  constructor(
    private kitService: KitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['query'] || '';

      this.kitService.getKits(this.query).subscribe((res) => {
        this.kits = [...res];
      });
    });
  }

  onSubmit(form: NgForm) {
    this.router.navigate(['admin/kits'], {
      queryParams: { query: this.query },
    });
  }

  removeKit(id: number) {
    this.kitService.deleteKit(id).subscribe((res) => {
      this.kits = this.kits.filter((kit) => kit.id !== id); // Remove o kit deletado do array
    });
  }
}
