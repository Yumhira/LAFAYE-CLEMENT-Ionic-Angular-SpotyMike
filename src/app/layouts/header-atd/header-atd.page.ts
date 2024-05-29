import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack } from 'ionicons/icons';
import { ellipsisHorizontal } from 'ionicons/icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-atd',
  templateUrl: './header-atd.page.html',
  styleUrls: ['./header-atd.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class HeaderATDPage implements OnInit {
  constructor(private _location: Location) {
    addIcons({ chevronBack });
    addIcons({ ellipsisHorizontal });
  }

  ngOnInit() {}

  backClicked() {
    this._location.back();
  }
}
