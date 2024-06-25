  import { Component, OnInit, inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ModalController } from '@ionic/angular';
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
  } from '@ionic/angular/standalone';
  import { FirestoreService } from 'src/app/core/services/firestore.service';
  import { format } from 'date-fns';
  import { addIcons } from 'ionicons';
  import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';

  @Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    standalone: true,
    imports: [IonContent, CommonModule, IonIcon, IonButton],
  })
  export class SettingsComponent implements OnInit {
    private modalCtl = inject(ModalController);
    private fireStoreService = inject(FirestoreService);
    user: any[] = [];
    private _location: any;
    constructor() {
      addIcons({ chevronBackOutline, chevronForwardOutline });
    }

    async cancel() {
      await this.modalCtl.dismiss();
    }

    ngOnInit() {
      this.getUserByEmail();
    }

    getUserByEmail() {
      this.fireStoreService.getUserByEmail().then((data) => {
        this.user = data;
      });
    }

    backClicked() {
      this.modalCtl.dismiss();
    }
  }
