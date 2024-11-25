import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular'; 
import { AuthService } from '../services/auth.service'; 
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { authenticator } from '@otplib/preset-browser'; 

@Component({
  selector: 'app-codigos',
  templateUrl: 'codigos.page.html',
  styleUrls: ['codigos.page.scss'],
})
export class CodigosPage implements OnInit {
  nomeCodigo: string; 
  secret: string; 
  codigoGerado: string; 

  constructor(
    private navController: NavController, 
    private authService: AuthService, 
    private db: AngularFireDatabase
  ) {
    this.nomeCodigo = ''; 
    this.secret = ''; 
    this.codigoGerado = ''; 
  }

  ngOnInit() {}

  gerarCodigo() {
    if (this.secret) {
      this.codigoGerado = authenticator.generate(this.secret);

     
      this.saveTotpCode();
    }
  }

  private saveTotpCode() {
    const user = this.authService.getUser();
    user.subscribe((userData) => {
      if (userData && userData.uid) {
        const totpCode = {
          nome: this.nomeCodigo,
          codigo: this.codigoGerado,
          secret: this.secret,
        };

        this.db.list(`/users/${userData.uid}/totpCodes`).push(totpCode)
          .then(() => {
            console.log('Código TOTP salvo com sucesso!');
          })
          .catch((error) => {
            console.error('Erro ao salvar código TOTP:', error);
          });
      }
    });
  }

  
  voltarParaHome() {
    this.navController.navigateBack('/home'); 
  }
}
