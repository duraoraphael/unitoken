import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  senha: string = '';

  constructor(private authService: AuthService, private toastCtrl: ToastController, private router: Router) {}

  async login() {
    this.authService.login(this.email, this.senha).then(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Login realizado com sucesso!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      // Redirecione para a página principal ou outra página desejada
      this.router.navigate(['/home']);
    }).catch(async (error) => {
      const toast = await this.toastCtrl.create({
        message: error.message,
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    });
  }
}
