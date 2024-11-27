import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { of, from, Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  async register(email: string, password: string, nome: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.firestore.collection('usuarios').doc(credential.user?.uid).set({
        nome: nome,
        email: email,
        uid: credential.user?.uid,
        photoURL: 'assets/default-avatar.png',
      });
    } catch (error) {
      console.error('Erro ao registrar usuário', error);
      throw error;
    }
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getUser(): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap((user: firebase.User | null) =>
        user ? this.firestore.collection('usuarios').doc(user.uid).valueChanges() : of(null)
      )
    );
  }

  logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }

  async saveTotpCode(uid: string, nome: string, codigo: string, secret: string) {
    const totpCode = { nome, codigo, secret };

    try {
      await this.firestore.collection('usuarios').doc(uid).collection('totpCodes').add(totpCode);
    } catch (error) {
      console.error('Erro ao salvar código TOTP:', error);
      throw new Error('Erro ao salvar código TOTP no Firebase');
    }
  }

  updateUserProfile(profile: { photoURL?: string }): Observable<void> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          const userRef = this.firestore.collection('usuarios').doc(user.uid);
          return from(user.updateProfile(profile)).pipe(
            switchMap(() => userRef.update(profile)),
            map(() => {})
          );
        } else {
          return of();
        }
      })
    );
  }
}
