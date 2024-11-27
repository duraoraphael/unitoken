import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of, Subscription, timer } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { authenticator } from '@otplib/preset-browser'; 

interface TotpCode {
  nome: string;
  secret: string;
  codigo?: string; 
}

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  user$: Observable<any> = of(null);
  totpCodes$: Observable<TotpCode[]> = of([]); 
  private intervalSubscription?: Subscription; 

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    
    this.user$ = this.authService.getUser();
    this.loadTotpCodes();

    
    this.intervalSubscription = timer(0, 30000).subscribe(() => {
      this.updateTotpCodes();
    });
  }

  private loadTotpCodes() {
    this.totpCodes$ = this.afAuth.authState.pipe(
      startWith(null),
      switchMap((user) => {
        if (user) {
          return this.firestore
            .collection('usuarios')
            .doc(user.uid)
            .collection('totpCodes')
            .valueChanges()
            .pipe(
              map((totpCodes: any[]) => {
                return totpCodes.map((code) => ({
                  nome: code.nome,
                  secret: code.secret,
                  codigo: this.generateTotp(code.secret), 
                }));
              })
            );
        }
        return of([]);
      })
    );
  }

  private updateTotpCodes() {
    this.totpCodes$ = this.totpCodes$.pipe(
      map((codes) =>
        codes.map((code) => ({
          ...code,
          codigo: this.generateTotp(code.secret), 
        }))
      )
    );
  }

  generateTotp(secret: string): string {
    return authenticator.generate(secret); 
  }
  ngOnDestroy() {
    this.intervalSubscription?.unsubscribe();
  }
}
