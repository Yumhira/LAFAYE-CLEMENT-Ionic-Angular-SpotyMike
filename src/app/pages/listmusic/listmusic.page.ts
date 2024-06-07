import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonIcon } from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';

@Component({
  selector: 'app-listmusic',
  templateUrl: './listmusic.page.html',
  styleUrls: ['./listmusic.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonIcon]
})
export class ListPage implements OnInit {

  constructor(private _location: Location) {
    addIcons({ chevronBack }) 
  }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }

}
