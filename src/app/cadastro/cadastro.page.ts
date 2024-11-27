import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(private authService: AuthService, private toastCtrl: ToastController, private router: Router) {} // Adicione o Router ao construtor

  async cadastrar() {
    if (this.senha !== this.confirmarSenha) {
      const toast = await this.toastCtrl.create({
        message: 'As senhas não coincidem!',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
      return;
    }

    this.authService.register(this.email, this.senha, this.nome).then(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Cadastro realizado com sucesso!',
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      this.router.navigate(['/login']);
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
