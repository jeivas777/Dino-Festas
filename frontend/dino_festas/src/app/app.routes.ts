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
import { LoginPageComponent } from './admin/pages/login-page/login-page.component';
import { authGuard } from './auth/auth.guard';
import { GerenciarCategoriasComponent } from './admin/pages/categorias/gerenciar-categorias/gerenciar-categorias.component';
import { EscolherItensComponent } from './main/pages/pacotes/escolher-itens/escolher-itens.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
  {
    path: 'admin/login',
    component: LoginPageComponent,
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: LayoutEcommerceComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'pacote/:id', component: EscolherItensComponent },
      { path: 'search', component: SearchComponent },
    ],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [authGuard],
    children: [
      { path: 'pacotes', component: GerenciarKitsComponent },
      { path: 'pacotes/cadastrar', component: CadastrarKitComponent },
      { path: '', redirectTo: 'pacotes', pathMatch: 'full' }, // Redireciona para gerenciar-kits por padrão
      { path: 'pacotes/:id/editar', component: EditarKitComponent },
      { path: 'itens', component: GerenciarItensComponent },
      { path: 'itens/cadastrar', component: CadastrarItemComponent },
      {
        path: 'itens/:id/editar',
        component: EditarItemComponent,
      },
      {
        path: 'categorias',
        component: GerenciarCategoriasComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
