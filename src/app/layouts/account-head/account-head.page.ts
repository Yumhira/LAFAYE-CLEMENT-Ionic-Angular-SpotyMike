import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
} from '@ionic/angular/standalone';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AccountPage } from 'src/app/pages/account/account.page';

@Component({
  selector: 'app-account-head',
  templateUrl: './account-head.page.html',
  styleUrls: ['./account-head.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
    AccountPage,
  ],
})
export class AccountHeadPage implements OnInit {
  private router = inject(ActivatedRoute);
  constructor() {}

  ngOnInit() {
    this.router.data.subscribe((component) => {
      console.log(component);
    });
  }
}
