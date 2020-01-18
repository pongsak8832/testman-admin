import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { LogsModel } from '../model/logs.model';
import {map} from 'rxjs/internal/operators';


@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private itemsCollection: AngularFirestoreCollection<LogsModel>;

  constructor(private readonly afs: AngularFirestore,
              private _http: HttpClient,
              private readonly auth: AngularFireAuth) {
    this.itemsCollection = afs.collection('logs', ref => {
      return ref;
    });
  }

  getDataRefId(refId: string) {
    return this.afs.collection('logs', ref => {
      return ref.where('refId', '==', refId);
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as LogsModel;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  addItem(data: LogsModel) {
    return this.itemsCollection.doc<LogsModel>(data.id).set(Object.assign({}, data));
  }



}
