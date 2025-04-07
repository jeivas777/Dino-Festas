import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-ecommerce',
  imports: [HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './layout-ecommerce.component.html',
  styleUrl: './layout-ecommerce.component.scss',
})
export class LayoutEcommerceComponent {}
