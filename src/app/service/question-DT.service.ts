import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/internal/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.sit';
import { QuestionDTModel } from '../model/question-DT.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionDTService {

  private itemsCollection: AngularFirestoreCollection<QuestionDTModel>;

  constructor(private readonly afs: AngularFirestore,
              private _http: HttpClient,
              private readonly auth: AngularFireAuth) {
    this.itemsCollection = afs.collection('question-DT', ref => {
      return ref;
    });
  }

  getData(hdId: string) {
    return this.afs.collection('question-DT', ref => {
      return ref.where('headerId', '==', hdId);
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as QuestionDTModel;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getDataRunning() {
    return this.afs.collection('question-DT', ref => {
      return ref.orderBy('id', 'asc')
                .limit(1);
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as QuestionDTModel;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getDataById(id: string) {
    return this.itemsCollection.doc<QuestionDTModel>(id).valueChanges().take(1);
  }

  getDataByIdTake(id: string) {
    return this.itemsCollection.doc(id);
  }

  addItem(data: QuestionDTModel) {
    return this.itemsCollection.doc<QuestionDTModel>(data.id).set(Object.assign({}, data));
  }

  updateItem(data: QuestionDTModel) {
    return this.itemsCollection.doc<QuestionDTModel>(data.id).update(Object.assign({}, data));
  }


}
