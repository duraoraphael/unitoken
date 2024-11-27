import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {}

  uploadImage(file: File, userId: string): Observable<any> {
    const filePath = `profile_images/${userId}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          this.firestore.collection('usuarios').doc(userId).update({ photoURL: url });
        });
      })
    );
  }

  removeImage(userId: string): Observable<void> {
    const filePath = `profile_images/${userId}`;
    const fileRef = this.storage.ref(filePath);
    return fileRef.delete();
  }
}
