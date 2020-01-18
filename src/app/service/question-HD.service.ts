import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/internal/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { UserModel } from '../model/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.sit';
import {QuestionHDModel} from '../model/question-HD.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionHDService {

  private itemsCollection: AngularFirestoreCollection<QuestionHDModel>;

  constructor(private readonly afs: AngularFirestore,
              private _http: HttpClient,
              private readonly auth: AngularFireAuth) {
    this.itemsCollection = afs.collection('question-HD', ref => {
      return ref;
    });
  }

  getId() {
     return this.afs.createId();
  }

  getData() {
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as QuestionHDModel;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getDataRunning() {
    return this.afs.collection('question-HD', ref => {
      return ref.orderBy('id', 'asc')
                .limit(1);
    }).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as QuestionHDModel;
        const id = a.payload.doc.id;
        return {id, ...data};
      }))
    );
  }

  getDataById(id: string) {
    return this.itemsCollection.doc<QuestionHDModel>(id).valueChanges().take(1);
  }

  getDataByIdTake(id: string) {
    return this.itemsCollection.doc(id);
  }

  addItem(data: QuestionHDModel) {
    return this.itemsCollection.doc<QuestionHDModel>(data.id).set(Object.assign({}, data));
  }

  updateItem(data: QuestionHDModel) {
    return this.itemsCollection.doc<QuestionHDModel>(data.id).update(Object.assign({}, data));
  }

}
