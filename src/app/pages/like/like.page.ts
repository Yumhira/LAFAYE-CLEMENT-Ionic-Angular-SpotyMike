import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCol, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'app-like',
  templateUrl: './like.page.html',
  styleUrls: ['./like.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCol, IonRow, CommonModule, FormsModule]
})
export class LikePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
