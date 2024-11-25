import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { of, Observable } from 'rxjs'; 
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  
  async register(email: string, password: string, nome: string) {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.firestore.collection('usuarios').doc(credential.user?.uid).set({
        nome: nome,
        email: email,
        uid: credential.user?.uid
      });
    } catch (error) {
      console.error("Erro ao registrar usuário", error);
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
      switchMap(user => user ? this.firestore.collection('usuarios').doc(user.uid).valueChanges() : of(null))
    );
  }

  logout() {
    return this.afAuth.signOut();
  }
}
