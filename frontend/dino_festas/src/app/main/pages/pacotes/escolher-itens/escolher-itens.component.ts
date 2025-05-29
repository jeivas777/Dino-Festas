import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ItensContainerComponent } from '../../../components/itens-container/itens-container.component';
import { Item } from '../../../../services/item.service';
import { Kit, KitService } from '../../../../services/kit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingCartService } from '../../../../services/shopping-cart.service';

@Component({
  selector: 'app-escolher-itens',
  standalone: true,
  imports: [FormsModule, CommonModule, ItensContainerComponent],
  templateUrl: './escolher-itens.component.html',
  styleUrl: './escolher-itens.component.scss',
})
export class EscolherItensComponent {
  pacote?: Kit; // Carregado da API
  currentStepIndex = 0;
  selectedItems: { [categoriaId: number]: Item[] } = {}; // itens selecionados por categoria
  searchQuery: string = '';
  query: string = '';
  showToast = false;
  toastMessage = '';

  constructor(
    private pacoteService: KitService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit() {
    // Após a navegação, rola a página para o topo
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Rolagem suave
    });
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.pacoteService.getKit(+idParam).subscribe((kit) => {
        this.pacote = kit;
      });
    }
  }

  get currentCategoria() {
    if (!this.pacote) return null;
    return this.pacote.categorias[this.currentStepIndex];
  }

  get selecionadosNaCategoriaAtual(): Item[] {
    if (!this.currentCategoria) return [];
    return this.selectedItems[this.currentCategoria.id] || [];
  }

  onItemSelect(item: Item): void {
    if (!this.currentCategoria) return;
    const categoriaId = this.currentCategoria.id;

    if (!this.selectedItems[categoriaId]) {
      this.selectedItems[categoriaId] = [];
    }

    const alreadySelected = this.selectedItems[categoriaId].some(
      (selected) => selected.id === item.id
    );

    if (alreadySelected) {
      this.selectedItems[categoriaId] = this.selectedItems[categoriaId].filter(
        (selected) => selected.id !== item.id
      );
    } else {
      if (
        this.selectedItems[categoriaId].length <
        this.currentCategoria.quantidade
      ) {
        this.selectedItems[categoriaId].push(item);
        console.log(this.selectedItems);
      }
    }
  }

  canAdvance(): boolean {
    if (!this.currentCategoria) return false;

    return (
      this.selecionadosNaCategoriaAtual.length ===
      this.currentCategoria.quantidade
    );
  }

  nextStep(): void {
    if (!this.pacote) return;

    if (
      this.canAdvance() &&
      this.currentStepIndex < this.pacote.categorias.length - 1
    ) {
      this.currentStepIndex++;

      // 👉 Limpar a pesquisa da URL para trazer todos os itens novamente
      this.router.navigate([], {
        queryParams: { q: null },
        queryParamsHandling: 'merge',
      });

      this.searchQuery = '';

      this.query = '';
    } else if (this.currentStepIndex === this.pacote.categorias.length - 1) {
      const pacoteComItens = {
        ...this.pacote, // O pacote com todas as suas propriedades
        itensSelecionados: this.selectedItems, // Adicionando os itens selecionados no pacote
      };

      this.cartService.addToCart(pacoteComItens);

      // 👉 Exibir toast
      this.toastMessage = `${this.pacote.nome} adicionado ao carrinho!`;
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
        this.router.navigate(['/home']); // Navega após mostrar o toast
      }, 3000);
    }
  }

  onSearch(form: NgForm): void {
    this.router.navigate([], {
      queryParams: { q: form.value.query },
      queryParamsHandling: 'merge',
    });
  }

  goToStep(index: number): void {
    if (index <= this.currentStepIndex) {
      this.currentStepIndex = index;
    }
  }
}
