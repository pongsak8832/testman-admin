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
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';

import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable()
export class AuthService {

  public authentication: AngularFireAuth;
  public currentUser: firebase.User;

  constructor(
    private _router: Router,
    private _afa: AngularFireAuth
  ) {
    this.authentication = _afa;
    this.authentication.auth.languageCode = 'th';
  }

  getCurrentUser() {
    return this._afa.user.toPromise();
  }

  verified(user: firebase.User): boolean {
    this.currentUser = user;
    return !!user;
  }

  signIn(username: string, password: string): Promise<any> {
    this._afa.auth.languageCode = 'th';
    return this._afa.auth.signInWithEmailAndPassword(username, password);
  }

  signOut(): void {
    this.authentication.auth.signOut().then(() => {
      this._router.navigateByUrl('/login').then(() => {
      });
    });
  }
}
