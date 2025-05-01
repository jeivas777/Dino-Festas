import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrorMessageComponent } from '../../../layout/messages/error-message/error-message.component';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, ErrorMessageComponent, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  usuario: string = '';
  senha: string = '';
  erro: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.login(this.usuario, this.senha).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/admin/pacotes']);
      },
      error: (err) => {
        this.erro = 'Usuário ou senha inválidos.';
        console.error('Erro ao fazer login:', err);
      },
    });
  }
}
