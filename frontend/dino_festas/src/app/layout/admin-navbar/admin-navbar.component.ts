import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss'],
})
export class AdminNavbarComponent {
  isExpanded = true;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.isExpanded = !this.isExpanded;
  }

  navigateTo(path: string): void {
    this.router.navigate([`/admin/${path}`]);
  }
}
