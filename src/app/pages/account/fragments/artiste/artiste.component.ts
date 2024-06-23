import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from 'src/app/core/services/firestore.service';
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
  IonTextarea
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrls: ['./artiste.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    FormsModule,
    ReactiveFormsModule,
    IonTextarea,
  ],
})
export class ArtisteComponent implements OnInit {
  private fireStoreService = inject(FirestoreService);

  isEditMode = false;
  user: any[] = [];
  segmentArtist = 'Compte';

  form = new FormGroup({
    fullname: new FormControl(''),
    label: new FormControl(''),
    description: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {}

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }
}
