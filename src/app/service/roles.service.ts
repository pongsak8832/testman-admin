import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/internal/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.sit';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(private readonly afs: AngularFirestore,
              private _http: HttpClient,
              private readonly auth: AngularFireAuth) {
    this.itemsCollection = afs.collection('roles', ref => {
      return ref;
    });
  }

  getId() {
     return this.afs.createId();
  }

  getData() {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getDataRoleId(roleId: number) {
    console.log('show roleid', roleId);
    return this.afs.collection('roles', ref => {
      return ref.where('id', '==', roleId);
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

}
