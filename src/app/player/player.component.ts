import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DatabaseService } from '../database.service';
import { ColorPref } from '../models/colorpref.model';
import { AngularFireDatabase, FirebaseListObservable  } from 'angularfire2/database';
import { FormsModule } from '@angular/forms';
import { CreateBubble } from '../models/bubbles.model';
import { MobileComponent } from '../mobile/mobile.component'
declare var p5: any;

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css'],
  providers : [DatabaseService]

})

export class PlayerComponent implements OnInit {

  colorSchemes: any[];
  points:any[];
  bubble: boolean;

  songPaths: string[] = ['../assets/resonance.mp3'];
  songIndex: number = 0;
  fftActive: boolean = true;
  ampActive: boolean = false;
  song;
  amplitude;
  effect1;
  effect2;
  fft;
  // showFFT: boolean = true;
  // showAmp: boolean = false;
constructor(public databaseService: DatabaseService) { }

  colors(name: string, color1: string, color2: string, color3: string, color4: string) {
    this.databaseService.addColors(new ColorPref(name, color1, color2, color3, color4));

    this.databaseService.getColors().subscribe(data => {
     this.colorSchemes = data;
   });
  }

  // chooseColor() {
  //   this.databaseService.colorDatabase();
  // }
  selectNewSong() {
    if (this.songIndex < this.songPaths.length) {
      this.songIndex++;
    } else {
      this.songIndex = 0;
    }
    this.setupForFFT();
  }

  setupForFFT() {
    this.fftActive = true;
    this.ampActive = false;
    let oldCanvases = document.getElementsByTagName('canvas')
    while (oldCanvases[0]) oldCanvases[0].parentNode.removeChild(oldCanvases[0]);
    let propertyFunction = (p) => {
      // this.showFFT = true;
      // this.showAmp = false;
      p.setup = () => {
        var cnv = p.createCanvas(p.windowWidth, p.windowHeight);
        cnv.position(100, 100);
        var x = (p.windowWidth - p.width) / 2;
        var y = (p.windowHeight - p.height) / 2;
        cnv.position(x, y);
        p.background('rgba(0,0,0,0)');
        p.clear();
        const canvasHeight = p.windowHeight;
        const canvasWidth = p.windowWidth;
        this.effect1 = p.createCanvas(canvasWidth, canvasHeight);
        let songPath = this.songPaths[this.songIndex];
        this.song = p.loadSound(songPath, p.loaded);
        this.fft = new p5.FFT(0.5, 128);
        p.frameRate(30);
      };

      p.draw = () => {
        p.background(0);

        let spectrum = this.fft.analyze();

        for (var i=0; i < spectrum.length; i++) {
          let thisAmp = spectrum[i];
          p.stroke(255,255,255);
          p.fill(255,255,255);
          let x = i * 10;
          p.rect(p.windowWidth/2 + x, p.windowHeight/2, 8, spectrum[i]);
          p.rect(p.windowWidth/2 - x, p.windowHeight/2, 8, spectrum[i]);
          p.rect(p.windowWidth/2 + x, p.windowHeight/2, 8, -spectrum[i]);
          p.rect(p.windowWidth/2 - x, p.windowHeight/2, 8, -spectrum[i]);

          //inner visual
          // p.stroke(255,255,255);
          // p.line(p.windowWidth/2 + x, spectrum[i]/3, p.windowWidth/2 + x+8, spectrum[i]/3);
          // p.line(p.windowWidth/2 - x, p.windowHeight/2, 8, spectrum[i]/3);
          // p.line(p.windowWidth/2 + x, p.windowHeight/2, 8, -spectrum[i]/3);
          // p.line(p.windowWidth/2 - x, p.windowHeight/2, 8, -spectrum[i]/3);
        }
      }

      p.loaded = () => {
        console.log("song loaded");
        console.log(this.song);
        // this.song.play(); //to play song once song is loaded.
      };

    }
    this.instantiateP5(propertyFunction);
  }

  setupForAmplitude() {
    this.fftActive = false;
    this.ampActive = true;
    let oldCanvases = document.getElementsByTagName('canvas')
    while (oldCanvases[0]) oldCanvases[0].parentNode.removeChild(oldCanvases[0]);
    // this.showFFT = false;
    // this.showAmp = true;
    let propertyFunction = (p) => {
      p.setup = () => {
        p.clear();
        this.effect1 = p.createCanvas(p.windowWidth, p.windowHeight);
        this.amplitude = new p5.Amplitude();
        p.frameRate(60);
      };

      p.draw = () => {
        p.background(0);

        let songVol = this.amplitude.getLevel();

        p.fill(255);
        p.stroke(255);
        p.ellipse(p.windowWidth / 2, p.windowHeight/2, 500 * songVol, 500 * songVol); //swap micVol and songVol to show vis of different inputs
        p.fill(0);
        p.ellipse(p.windowWidth / 2, p.windowHeight/2, 200 * songVol, 200 * songVol); //swap micVol and songVol to show vis of different inputs
        p.fill('rgba(0,0,0,0)');
        p.stroke(255, 0, 0);
        p.ellipse(p.windowWidth / 2, p.windowHeight/2, 100 / songVol, 100 / songVol); //swap micVol and songVol to show vis of different inputs
      };
    };
    this.instantiateP5(propertyFunction);
  }

  instantiateP5(s) {
    let player = new p5(s);
  }

  playCurrentSong() {
    console.log(this.song.isPlaying());
    if ( this.song.isPlaying() ) {
      this.song.pause();
    } else {
      this.song.play();
    }
  }

  bubbles(bubble) {
     this.databaseService.newBubbles(new CreateBubble(bubble));
     this.databaseService.getBubbles().subscribe(data => {
      this.points = data;
    });
    return this.points
   }

   ngOnInit() {
     this.setupForFFT();

     this.databaseService.getBubbles().subscribe(data => {
     this.points = data;
     if (this.fftActive) {
       this.setupForAmplitude();
     } else if (this.ampActive) {
       this.setupForFFT();
     }
    });
   }
 }
