  
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IIcons } from '../shared/interfaces';
import { map } from 'rxjs/operators';

@Injectable()

export class FirestoreService {

  constructor(public afs: AngularFirestore) {}

  // gets icon data from firebase collection
  getCollection(coll: string) {
    const collection = this.afs.collection(coll);
    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as IIcons;
        return data;
      }))
    );
  }

}