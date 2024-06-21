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
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LoginPage } from 'src/app/pages/login/login.page';

@Component({
  selector: 'app-registerlayout',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
export class RegisterLayoutPage implements OnInit {
  private router = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.router.data.subscribe((component) => {
      console.log(component);
    });
  }
}
