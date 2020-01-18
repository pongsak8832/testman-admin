/*
 *  Created by Chaiwut Maneechot on 7/28/18 6:15 AM
 *  Copyright © 2018 Chaiwut. All rights reserved.
 *
 *  Last modified 7/28/18 6:15 AM
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
// import {UserModel} from '../home/system_manager/user.model';

@Injectable({
  providedIn: 'root'
})
export class AppServiceUploader implements CanActivate {

  constructor(private _authService: AuthService,
              private _router: Router,
              private readonly afs: AngularFirestore) {
  }

  canActivate(): Observable<boolean> {
    return this._authService.authentication.authState
      .do((user) => {
        // this.afs.collection('users').doc<UserModel>(user.uid).valueChanges().subscribe(_userLogin => {
        //   if (!this._authService.verified(user) || _userLogin.status !== 'active' || (_userLogin.role !== 'uploader' && _userLogin.role !== 'admin')) {
        //     this._router.navigateByUrl('/login');
        //   }
        // });
      })
      .map((user) => this._authService.verified(user));
  }
}
