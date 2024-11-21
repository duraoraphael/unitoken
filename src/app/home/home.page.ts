import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user$: Observable<any>;

  constructor(private authService: AuthService) { 
    this.user$ = new Observable(); // Inicialize a propriedade aqui 
    }

  ngOnInit() {
    this.user$ = this.authService.getUser();
  }
}
