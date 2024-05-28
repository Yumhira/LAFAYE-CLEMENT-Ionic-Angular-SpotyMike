import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRow,
  IonGrid,
  IonCol,
} from '@ionic/angular/standalone';
import { EAuthPage } from 'src/app/core/models/refData';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoginPage } from 'src/app/pages/login/login.page';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  standalone: true,
  imports: [
    LoginPage,
    IonCol,
    IonGrid,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class AuthPage implements OnInit {
  private router = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.router.data.subscribe((component) => {
      console.log(component);
    });
  }
}
