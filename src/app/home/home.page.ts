import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import { authenticator } from '@otplib/preset-browser'; 
import { AuthService } from '../services/auth.service';

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
  totpCodes$: Observable<TotpCode[]> = of([]); 

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.user$ = this.authService.getUser();

    
    this.loadTotpCodes();
  }

  private loadTotpCodes() {
    this.totpCodes$ = this.afAuth.authState.pipe(
      startWith(null),
      switchMap((user) => {
        if (user) {
          return this.db.list<TotpCode>(`/users/${user.uid}/totpCodes`).valueChanges(); 
        }
        return of([]); 
      })
    );
  }

  
  generateTotp(secret: string): string {
    return authenticator.generate(secret); 
  }

  
  verifyTotp(secret: string, token: string): boolean {
    return authenticator.verify({ token, secret });
  }
}
