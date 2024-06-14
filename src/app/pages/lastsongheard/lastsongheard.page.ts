import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonIcon } from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';

@Component({
  selector: 'app-lastsongheard',
  templateUrl: './lastsongheard.page.html',
  styleUrls: ['./lastsongheard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonIcon]
})
export class LastSongHeardPage implements OnInit {

  constructor(private _location: Location) {
    addIcons({ chevronBack }) 
  }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
