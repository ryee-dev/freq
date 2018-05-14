import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../database.service';
import { ColorPref } from '../models/colorpref.model';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { routing } from '../app.routing';
import { CreateBubble } from '../models/bubbles.model';
import { PlayerComponent } from '../player/player.component';


@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
  providers : [DatabaseService]
})
export class MobileComponent implements OnInit {
  @Output() sendTap = new EventEmitter();
  colorSchemes: any[];
  bubble: boolean;


  constructor(public databaseService: DatabaseService) { }

  ngOnInit() {
//     this.databaseService.getColors().subscribe(data => {
//     this.colorSchemes = data;
//  });
//     console.log(this.colorSchemes);
//   }
//   colors(name: string, color1: string, color2: string, color3: string, color4: string) {
//     this.databaseService.addColors(new ColorPref(name, color1, color2, color3, color4));
//
//     this.databaseService.getColors().subscribe(data => {
//      this.colorSchemes = data;
//    });
//   }
//
//   chooseColor() {
//     this.databaseService.colorDatabase();
// }
}
 partyTime(bubble) {
   this.databaseService.newBubbles(new CreateBubble(bubble));
 }

 showAlert() {
       this.sendTap.emit();
   }


}
