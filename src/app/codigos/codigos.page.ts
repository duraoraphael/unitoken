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

  async gerarCodigo() {
    if (this.secret && this.nomeCodigo) {
      const codigoGerado = authenticator.generate(this.secret); 

      try {
        const user = await this.authService.getCurrentUser(); 
        if (user && user.uid) {
          await this.authService.saveTotpCode(user.uid, this.nomeCodigo, codigoGerado, this.secret);
          console.log('Código TOTP salvo com sucesso!');
          this.navController.navigateBack('/home'); 
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
