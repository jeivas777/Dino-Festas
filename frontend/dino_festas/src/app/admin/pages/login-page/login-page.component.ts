import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrorMessageComponent } from '../../../layout/messages/error-message/error-message.component';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../layout/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login-page',
  imports: [
    FormsModule,
    ErrorMessageComponent,
    CommonModule,
    LoadingSpinnerComponent,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  usuario: string = '';
  senha: string = '';
  erro: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    this.loading = true;
    this.authService.login(this.usuario, this.senha).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.loading = false;
        this.router.navigate(['/admin/pacotes']);
      },
      error: (err) => {
        this.loading = false;
        this.erro = 'Usuário ou senha inválidos.';
        console.error('Erro ao fazer login:', err);
      },
    });
  }
}
