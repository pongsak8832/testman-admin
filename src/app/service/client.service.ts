import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/internal/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.sit';
import { ClientModel } from '../model/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private itemsCollection: AngularFirestoreCollection<ClientModel>;

  constructor(private readonly afs: AngularFirestore,
    private _http: HttpClient,
    private readonly auth: AngularFireAuth) {
    this.itemsCollection = afs.collection('user-fill-in', ref => {
      return ref;
    });
  }

  getId() {
    return this.afs.createId();
  }

  getData() {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ClientModel;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getDataById(id: string) {
    return this.itemsCollection.doc<ClientModel>(id).valueChanges().take(1);
  }

  getDataByIdTake(id: string) {
    return this.itemsCollection.doc(id);
  }

  addItem(data: ClientModel) {
    return this.itemsCollection.doc<ClientModel>(data.uid).set(Object.assign({}, data));
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

  sendResetEmail(data: ClientModel) {
    return this.auth.auth.sendPasswordResetEmail(data.email);
  }

  updateStatus(data: ClientModel) {
    return this.itemsCollection.doc<ClientModel>(data.uid).update({
      status: data.status,
    });
  }

  updateItem(data: ClientModel) {
    return this.itemsCollection.doc<ClientModel>(data.uid).update(Object.assign({}, data));
  }

}
