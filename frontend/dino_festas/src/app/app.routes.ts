import { Routes } from '@angular/router';
import { HomeComponent } from './main/pages/home/home.component';
import { GerenciarKitsComponent } from './admin/pages/kits/gerenciar-kits/gerenciar-kits.component';
import { LayoutEcommerceComponent } from './layout/layout-ecommerce/layout-ecommerce.component';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { GerenciarItensComponent } from './admin/pages/itens/gerenciar-itens/gerenciar-itens.component';
import { CadastrarKitComponent } from './admin/pages/kits/cadastrar-kit/cadastrar-kit.component';
import { EditarKitComponent } from './admin/pages/kits/editar-kit/editar-kit.component';
import { CadastrarItemComponent } from './admin/pages/itens/cadastrar-item/cadastrar-item.component';
import { EditarItemComponent } from './admin/pages/itens/editar-item/editar-item.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutEcommerceComponent,
    children: [{ path: 'home', component: HomeComponent }],
  },
  // Layout para o admin
  {
    path: 'admin',
    component: LayoutAdminComponent,
    children: [
      { path: 'kits', component: GerenciarKitsComponent },
      { path: 'kits/cadastrar', component: CadastrarKitComponent },
      { path: '', redirectTo: 'kits', pathMatch: 'full' }, // Redireciona para gerenciar-kits por padrão
      { path: 'kits/editar/:id', component: EditarKitComponent },
      { path: 'kits/itens/:id', component: GerenciarItensComponent },
      { path: 'kits/itens/:id/cadastrar', component: CadastrarItemComponent },
      { path: 'kits/itens/:id/editar/:idItem', component: EditarItemComponent },
    ],
  },

  { path: '**', redirectTo: 'home' },
];
