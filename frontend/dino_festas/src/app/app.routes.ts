import { Routes } from '@angular/router';
import { HomeComponent } from './main/pages/home/home.component';
import { GerenciarKitsComponent } from './admin/pages/gerenciar-kits/gerenciar-kits.component';
import { LayoutEcommerceComponent } from './layout/layout-ecommerce/layout-ecommerce.component';
import { LayoutAdminComponent } from './layout/layout-admin/layout-admin.component';
import { GerenciarItensComponent } from './admin/pages/gerenciar-itens/gerenciar-itens.component';
import { CadastrarKitComponent } from './admin/pages/cadastrar-kit/cadastrar-kit.component';

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
      { path: 'gerenciar-kits', component: GerenciarKitsComponent },
      { path: 'gerenciar-kits/cadastrar', component: CadastrarKitComponent },
      { path: '', redirectTo: 'gerenciar-kits', pathMatch: 'full' }, // Redireciona para gerenciar-kits por padrão
      { path: 'itens', component: GerenciarItensComponent },
    ],
  },

  { path: '**', redirectTo: 'home' },
];
