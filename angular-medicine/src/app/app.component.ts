import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from './common/book';
import { AuthenticationService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn = false;
  currentRout: string;
  hidemenu = false;
  @Input() public found : Array <any> = [];

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    console.log(this.route)
    let data = this.authenticationService.getLoggedInUserName();
    console.log(data);
    console.log(this.authenticationService.loggeduser)
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    console.log('menu ->' + this.isLoggedIn);
  }

  handleLogout() {
    this.authenticationService.logout();
  }

}
