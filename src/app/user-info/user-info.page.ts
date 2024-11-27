import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { switchMap, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  user$: Observable<any>;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private actionSheetController: ActionSheetController
  ) {
    this.user$ = new Observable();
  }

  ngOnInit() {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: firebase.User | null) => {
        if (user) {
          return this.firestore.collection('usuarios').doc(user.uid).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Função que será usada para atualizar o avatar
  updateAvatar(base64String: string) {
    this.afAuth.currentUser.then(user => {
      if (user) {
        const photoURL = `data:image/png;base64,${base64String}`;
        console.log('Atualizando avatar do usuário:', user.uid);
        // Atualizar URL do avatar no Firestore e no Auth
        this.firestore.collection('usuarios').doc(user.uid).update({ photoURL })
          .then(() => {
            user.updateProfile({ photoURL }).then(() => {
              console.log('Avatar atualizado com sucesso');
            }).catch(error => {
              console.error('Erro ao atualizar perfil do usuário no Auth:', error);
            });
          }).catch(error => {
            console.error('Erro ao atualizar documento no Firestore:', error);
          });
      }
    });
  }

  removeAvatar() {
    this.afAuth.currentUser.then(user => {
      if (user) {
        const defaultPhotoURL = 'assets/default-avatar.png';
        console.log('Removendo avatar do usuário:', user.uid);
        // Atualizar URL do avatar no Firestore e no Auth
        this.firestore.collection('usuarios').doc(user.uid).update({ photoURL: defaultPhotoURL })
          .then(() => {
            user.updateProfile({ photoURL: defaultPhotoURL }).then(() => {
              console.log('Avatar removido com sucesso');
            }).catch(error => {
              console.error('Erro ao atualizar perfil do usuário no Auth:', error);
            });
          }).catch(error => {
            console.error('Erro ao atualizar documento no Firestore:', error);
          });
      }
    });
  }

  // Função que lida com o logout
  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  // Função para abrir a opção de mudar avatar
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Mudar Avatar',
      buttons: [
        {
          text: 'Adicionar',
          icon: 'add',
          handler: () => {
            console.log('Botão Adicionar clicado');
            this.fileInput.nativeElement.click();
          }
        },
        {
          text: 'Remover',
          icon: 'remove',
          handler: () => {
            this.removeAvatar();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  // Função para lidar com a seleção de um novo avatar
  onFileSelected(event: Event) {
    console.log('Evento de seleção de arquivo acionado');
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        console.log('Imagem convertida para base64:', base64String);
        this.updateAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  }
}
