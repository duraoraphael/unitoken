import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { authenticator } from '@otplib/preset-browser';

@Component({
  selector: 'app-codigos',
  templateUrl: 'codigos.page.html',
  styleUrls: ['codigos.page.scss'],
})
export class CodigosPage implements OnInit {
  nomeCodigo: string;
  secret: string;

  constructor(
    private navController: NavController,
    private authService: AuthService
  ) {
    this.nomeCodigo = '';
    this.secret = '';
  }

  ngOnInit() {}

  // Método para gerar e salvar código TOTP
  async gerarCodigo() {
    if (this.secret && this.nomeCodigo) {
      const codigoGerado = authenticator.generate(this.secret); // Geração do código

      try {
        const user = await this.authService.getCurrentUser(); // Obtém o usuário autenticado
        if (user && user.uid) {
          // Chama o método do AuthService para salvar o código
          await this.authService.saveTotpCode(user.uid, this.nomeCodigo, codigoGerado, this.secret);
          console.log('Código TOTP salvo com sucesso!');
          this.navController.navigateBack('/home'); // Redireciona para a home após salvar
        } else {
          console.error('Usuário não autenticado.');
        }
      } catch (error) {
        console.error('Erro ao salvar código TOTP:', error);
      }
    } else {
      console.error('Preencha todos os campos antes de gerar o código.');
    }
  }
}
