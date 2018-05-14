import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { ColorPref } from './models/colorpref.model';
import { AngularFireModule } from 'angularfire2';
import { CreateBubble } from './models/bubbles.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DatabaseService {
  colors: FirebaseListObservable<any[]>;
  bubbles: FirebaseListObservable<any[]>;
  private componentMethodCallSource = new Subject<any>();
 componentMethodCalled$ = this.componentMethodCallSource.asObservable();

 constructor(private database: AngularFireDatabase) {
   this.colors = this.database.list('colors');
   this.bubbles = this.database.list('colors');
 }

   callComponentMethod() {
    this.componentMethodCallSource.next();
  }
   addColors(newColorPref: ColorPref) {
    this.colors.push(newColorPref);
   }
   getColors() {
    return this.database.list('colors');
  }

  newBubbles(createBubble: CreateBubble) {
   this.bubbles.push(createBubble);
  }

  getBubbles() {
    return this.database.list('colors');
 }
}
