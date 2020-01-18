import { Component, OnDestroy, OnInit, DoCheck } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { environment } from '../../environments/environment.sit';
import { UserModel } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy, DoCheck {
  userSubscription: Subscription;

  version: string = environment.version;

  name = 'หน้าหลัก';

  routes: Object[] = [{
    icon: 'exit_to_app',
    route: 'login',
    title: 'ออกจากระบบ',
  }
  ];

  route = '';

  userModel: UserModel = UserModel.empty();

  constructor(public _media: TdMediaService,
    private _authService: AuthService,
    private _auth: AuthService,
    private _router: Router,
    private _userService: UserService,
    private _iconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    this._iconRegistry.addSvgIconInNamespace('assets', 'logo',
      this._domSanitizer.bypassSecurityTrustResourceUrl('../assets/logo.svg'));
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async ngOnInit() {

    await this._authService.authentication.authState.take(1).toPromise().then((user) => {
      if (!this._authService.verified(user)) {
        this.logout();
      }
    });

    this.route = this._router.url.replace('/admin/', '');
    if (this.route === '' || this.route === undefined) {
      this.route = 'หน้าหลัก';
    }
    this.name = this.route;

    this.userSubscription = this._router.events.subscribe(() => {
      if (this.route === '' || this.route === undefined) {
        this.route = 'หน้าหลัก';
      }
      this.name = this.route;
    });

    this._userService.getDataById(this._auth.currentUser.uid).subscribe((user) => {
      if (user === undefined || user === null) {
        this.logout();
      }
      this.userModel = user;
      if (this.userModel.status !== 'active') {
        this.logout();
      }

      // this._roleService.getDataById(+this.userModel.roleId).take(1).subscribe(_item => {
      //   this.userModel.roleName = _item[0].name;
      // });
    });
  }

  ngDoCheck() {
    const href = this._router.url.replace('/admin/', '').split('/');
    this.route = href[0];
  }

  logout() {
    this._auth.signOut();
  }

  openLink() {
    this._router.navigateByUrl('admin/users/new').then();
  }

}
