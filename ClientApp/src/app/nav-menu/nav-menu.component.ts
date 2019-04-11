import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent { // implements OnInit {
  isExpanded = false;
  // loggedInUserProfile: any;

  constructor(public authService: AuthService) { }

  //  ngOnInit() {
  //   if (this.authService._userProfile) {
  //     this.loggedInUserProfile = this.authService._userProfile;
  //   } else {
  //     this.authService.getProfile((err, profile) => {
  //       this.loggedInUserProfile = profile;
  //     });
  //   }
  //  }

  

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
