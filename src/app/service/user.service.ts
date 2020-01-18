import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.sit';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private itemsCollection: AngularFirestoreCollection<UserModel>;

  constructor(private readonly afs: AngularFirestore,
    private _http: HttpClient,
    private readonly auth: AngularFireAuth) {
    this.itemsCollection = afs.collection('users', ref => {
      return ref;
    });
  }

  getId() {
    return this.afs.createId();
  }

  getData() {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as UserModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getDataById(id: string) {
    return this.itemsCollection.doc<UserModel>(id).valueChanges().take(1);
  }

  getDataByIdTake(id: string) {
    return this.itemsCollection.doc(id);
  }

  addItem(data: UserModel) {
    return this.itemsCollection.doc<UserModel>(data.uid).set(Object.assign({}, data));
  }

  getRole(): Observable<any> {
    return this.afs.collection('roles', ref => {
      return ref;
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  createUserBytEmail(email: string) {
    return this._http.post<any>(environment.functions + '/createUserAdmin',
      'email=' + email
      , {
        observe: 'response',
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }

  sendResetEmail(data: UserModel) {
    return this.auth.auth.sendPasswordResetEmail(data.email);
  }

  updateStatus(data: UserModel) {
    return this.itemsCollection.doc<UserModel>(data.uid).update({
      status: data.status,
    });
  }

  updateItem(data: UserModel) {
    return this.itemsCollection.doc<UserModel>(data.uid).update(Object.assign({}, data));
  }

}
