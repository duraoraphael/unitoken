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

  // Método para registrar o usuário com e-mail e senha e salvar no Firestore
  async register(email: string, password: string, nome: string) {
    const credential = await this.afAuth.createUserWithEmailAndPassword(email, password);
    return this.firestore.collection('usuarios').doc(credential.user?.uid).set({
      nome: nome,
      email: email,
      uid: credential.user?.uid
    });
  }

  // Método para login com e-mail e senha
  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Método para login com Google
  loginWithGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  getUser(): Observable<any> {
     return this.afAuth.authState.pipe(
         switchMap(user => {
             if (user) {
                 return this.firestore.collection('usuarios').doc(user.uid).valueChanges(); } else {
                     return of(null); 
                    } 
                }) 
            ); 
        }

  // Método para logout
  logout() {
    return this.afAuth.signOut();
  }
}
