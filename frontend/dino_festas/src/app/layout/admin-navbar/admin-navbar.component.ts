import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent {
  isExpanded = false;

  constructor(private router: Router, private authService: AuthService) {}

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  sair(): void {
    this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
