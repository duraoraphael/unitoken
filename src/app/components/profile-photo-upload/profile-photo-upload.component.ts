import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-profile-photo-upload',
  templateUrl: './profile-photo-upload.component.html',
  styleUrls: ['./profile-photo-upload.component.scss']
})
export class ProfilePhotoUploadComponent {
  selectedFile: File | null = null;

  constructor(private afAuth: AngularFireAuth, private uploadService: UploadService) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.afAuth.authState.subscribe(user => {
      if (user && this.selectedFile) {
        this.uploadService.uploadImage(this.selectedFile, user.uid).subscribe();
      }
    });
  }
}
