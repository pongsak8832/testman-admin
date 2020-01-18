import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/internal/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { OrganizationModel } from '../model/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private itemsCollection: AngularFirestoreCollection<OrganizationModel>;

  constructor(private readonly afs: AngularFirestore,
              private _http: HttpClient,
              private readonly auth: AngularFireAuth) {
    this.itemsCollection = afs.collection('organization', ref => {
      return ref;
    });
  }

  getId() {
     return this.afs.createId();
  }

  getData() {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as OrganizationModel;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  addItem(data: OrganizationModel) {
    return this.itemsCollection.doc<OrganizationModel>(data.id).set(Object.assign({}, data));
  }

  updateStatus(data: OrganizationModel) {
    return this.itemsCollection.doc<OrganizationModel>(data.id).update({
      status: data.status,
    });
  }

  getDataById(id: string) {
    return this.itemsCollection.doc<OrganizationModel>(id).valueChanges().take(1);
  }

  updateItem(data: OrganizationModel) {
    return this.itemsCollection.doc<OrganizationModel>(data.id).update(Object.assign({}, data));
  }

}
