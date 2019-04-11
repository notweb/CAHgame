import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service'; 

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  constructor(public authService: AuthService) {
    // auth.handleAuthentication();
    
  }

  // ngOnInit() {
  //   if (this.auth.isAuthenticated()) {
  //     this.auth.renewTokens();
  //   }
  // }

  ngOnInit() {
    this.authService.handleLoginCallback();
  }

}
