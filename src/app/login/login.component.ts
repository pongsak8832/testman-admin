import {Component, OnInit} from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {AngularFirestore} from '@angular/fire/firestore';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoadingMode, LoadingType, TdLoadingService} from '@covalent/core';
import { UserModel } from '../model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  appearance = 'outline';


  constructor(private _authService: AuthService,
              private _loadingService: TdLoadingService,
              private _formBuilder: FormBuilder,
              private _router: Router,
              private readonly afs: AngularFirestore,
              public _snackBar: MatSnackBar) {

    this._loadingService.create({
      name: 'loading',
      mode: LoadingMode.Indeterminate,
      type: LoadingType.Linear,
      color: 'primary',
    });
  }

  ngOnInit() {

    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (this._authService.currentUser) {
       this._authService.signOut();
    }

    this._authService.authentication.authState.subscribe((user) => {
      if (this._authService.verified(user)) {

        this.afs.collection('users').doc<UserModel>(user.uid).valueChanges().take(1).toPromise().then((userLogin) => {
          console.log('show userlogin', userLogin);
          if (userLogin.status === 'active') {
            this._router.navigateByUrl('admin/user/list').then().catch().finally();
          } else {
            this._authService.signOut();
          }
        }).catch((e) => {
          this.openSnackBar(e.toString());
        });
      } else {
      }
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    this._loadingService.register('loading');
    this.submitted = true;

    if (this._authService.currentUser) {
      this._authService.signOut();
    }

    this._authService.signIn(this.f.username.value, this.f.password.value)
      .then(() => {
        this.submitted = false;
        this._loadingService.resolve('loading');
      }).catch((err) => {
      this.openSnackBar(err);
      this.submitted = false;
      this._loadingService.resolve('loading');
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: 2000,
    });
  }

}
