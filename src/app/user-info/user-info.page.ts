import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  user$: Observable<any>;

  constructor(private authService: AuthService) {
    this.user$ = new Observable();
  }

  ngOnInit() {
    this.user$ = this.authService.getUser();
  }
}
