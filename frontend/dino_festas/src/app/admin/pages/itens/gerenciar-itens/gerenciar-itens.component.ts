import { Component, Input } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { KitCardComponent } from '../../../components/kit-card/kit-card.component';
import { ItemCardComponent } from '../../../components/item-card/item-card.component';
import { Kit, KitService } from '../../../../services/kit.service';
import { CommonModule } from '@angular/common';
import { Item } from '../../../../services/item.service';

@Component({
  selector: 'app-gerenciar-itens',
  imports: [FormsModule, RouterModule, ItemCardComponent, CommonModule],
  templateUrl: './gerenciar-itens.component.html',
  styleUrl: './gerenciar-itens.component.scss',
})
export class GerenciarItensComponent {
  kit!: Kit;
  itens: Item[] = []; // Array de itens que pertencem ao kit
  query: string = '';

  constructor(
    private kitService: KitService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const kitId: number = this.route.snapshot.params['id'];

    this.kitService.getKit(kitId).subscribe((kit) => {
      this.kit = kit;
      this.itens = kit.itens;
    });

    this.route.queryParamMap.subscribe((params) => {
      this.query = params.get('query') || '';

      this.itens = this.itens.filter((item) =>
        item.nome.toLowerCase().includes(this.query.toLowerCase())
      );
    });
  }

  onSubmit(form: NgForm) {
    this.query = form.value.query || '';
    this.router.navigate(['admin/kits/itens', this.kit.id], {
      queryParams: { query: this.query },
    });
  }
}
