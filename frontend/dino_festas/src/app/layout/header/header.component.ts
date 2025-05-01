import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CartComponent } from '../../main/components/cart/cart.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule, CartComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  query: string = '';
  showCart = false;
  showNavbar = true;
  lastScrollTop = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    window.addEventListener('scroll', this.onScroll, true);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onScroll, true);
  }

  onSubmit(form: NgForm) {
    this.router.navigate(['/search'], {
      queryParams: { q: form.value.query },
    });
  }

  toggleCart() {
    this.showCart = !this.showCart;
  }

  onScroll = (): void => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      this.showNavbar = false; // Scrolling down
    } else {
      this.showNavbar = true; // Scrolling up
    }

    this.lastScrollTop = Math.max(scrollTop, 0);
  };
}
