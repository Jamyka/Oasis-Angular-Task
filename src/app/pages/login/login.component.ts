import { Component, OnInit } from '@angular/core';
('@angular/forms');
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalService } from 'src/app/services/local.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  constructor(
    private localStore: LocalService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.login = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
    });
  }

  submit() {
    let username = this.login.controls?.['username'].value;
    let password = this.login.controls?.['password'].value;
    // console.log(username);
    // console.log(password);
    if (username == 'admin' && password == 'admin') {
      this.localStore.login();
      this.router.navigate(['home']);
    } else {
      this._snackBar.open(
        'Please Enter The Right UserName and Password',
        'Close',
        {
          duration: 3000,
        }
      );
      this.login.reset();
    }
  }

  ngOnInit(): void {
    let token = this.localStore.isAuth();
    if (token) {
      this.router.navigate(['home']);
    }
  }
}
