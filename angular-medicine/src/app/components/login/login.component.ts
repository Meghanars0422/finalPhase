import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/common/login';
import { AuthenticationService } from 'src/app/services/auth.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password : string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  @Output() public found = new EventEmitter<any>();
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
  }

  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe((result)=> {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.authenticationService.visible = true;
      let data = this.authenticationService.getLoggedInUserName();
      this.found.emit(data);
      console.log(this.authenticationService.loggeduser)
      console.log(data);
      this.successMessage = 'Login Successful.';
      this.router.navigate(['/medicines']);
    }, () => {
      this.invalidLogin = true;
      this.loginSuccess = false;
    });      
  }

}
