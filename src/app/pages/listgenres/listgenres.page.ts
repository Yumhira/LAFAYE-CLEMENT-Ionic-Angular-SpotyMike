import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRow, IonIcon, IonButton, IonCol } from '@ionic/angular/standalone';
import { Location } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listgenres',
  templateUrl: './listgenres.page.html',
  styleUrls: ['./listgenres.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonRow, IonIcon, IonButton, IonCol]
})
export class ListGenresPage implements OnInit {

  constructor(private _location: Location, private router: Router) {
    addIcons({ chevronBack }) 
  }

  ngOnInit() {
  }

  backClicked() {
    this._location.back();
  }
  
  goToMusicList() {
    this.router.navigate(['/listmusic']);
  }

}
