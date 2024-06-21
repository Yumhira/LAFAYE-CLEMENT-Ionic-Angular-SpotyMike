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
  imports: [CommonModule, IonSegment, IonSegmentButton, IonButton, IonLabel, IonItem, IonTabButton, IonInput, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, FormsModule, ReactiveFormsModule],
})
export class ArtisteComponent implements OnInit {
  private fireStoreService = inject(FirestoreService);

  user: any[] = [];
  segmentArtist = 'Compte';
  constructor() {}

  ngOnInit() {}
}
