import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { authenticator } from '@otplib/preset-browser';  // Para gerar o código TOTP

interface TotpCode {
  nome: string;
  codigo: string;
  secret: string;
}

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user$: Observable<any> = of(null);
  totpCodes$: Observable<TotpCode[]> = of([]);  // Lista dos códigos TOTP

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,  // Usando AngularFirestore
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.user$ = this.authService.getUser(); // Obtém os dados do usuário autenticado
    this.loadTotpCodes();  // Carrega os códigos TOTP ao iniciar
  }

  private loadTotpCodes() {
    this.totpCodes$ = this.afAuth.authState.pipe(
      startWith(null),  // Garante que a autenticação seja inicializada
      switchMap((user) => {
        if (user) {
          // Busca os códigos TOTP do Firestore na subcoleção 'totpCodes'
          return this.firestore
            .collection('usuarios')
            .doc(user.uid)
            .collection('totpCodes')
            .valueChanges()
            .pipe(
              map((totpCodes: any[]) => {
                // Aqui você mapeia os dados para a interface TotpCode
                return totpCodes.map((code) => ({
                  nome: code.nome,
                  codigo: code.codigo,
                  secret: code.secret,
                }));
              })
            );
        }
        return of([]);  // Caso não esteja autenticado, retorna uma lista vazia
      })
    );
  }

  generateTotp(secret: string): string {
    return authenticator.generate(secret);  // Gera o código TOTP a partir da chave secreta
  }

  verifyTotp(secret: string, token: string): boolean {
    return authenticator.verify({ token, secret });  // Verifica se o código TOTP é válido
  }
}
