import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonTabButton,
  IonItem,
  IonLabel,
  IonButton,
  IonSegmentButton,
  IonSegment,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { format } from 'date-fns';
import { UtilisateurComponent } from './fragments/utilisateur/utilisateur.component';
import { ArtisteComponent } from './fragments/artiste/artiste.component';
import { ModalController } from '@ionic/angular';
import { SettingsComponent } from 'src/app/shared/modal/settings/settings.component';
import { BecomeArtistComponent } from 'src/app/shared/modal/become-artist/become-artist.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
    IonSegment,
    IonSegmentButton,
    IonButton,
    IonLabel,
    IonItem,
    IonTabButton,
    IonInput,
    IonCol,
    IonRow,
    IonGrid,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ArtisteComponent,
    UtilisateurComponent,
  ],
})
export class AccountPage implements OnInit {
  private router = inject(Router);
  private fireStoreService = inject(FirestoreService);
  private modalCtl = inject(ModalController);

  user: any[] = [];
  segment = 'Utilisateur';

  constructor() {}
  ngOnInit() {
    this.getUserByEmail();
  }

  async getUserByEmail() {
    this.user = await this.fireStoreService.getUserByEmail();
  }

  async onSettingsModal() {
    const modal = await this.modalCtl.create({
      component: SettingsComponent,
    });
    modal.present();
  }

  async onBeArtistModal() {
    const modal = await this.modalCtl.create({
      component: BecomeArtistComponent,
    });
    modal.present();
  }
}


