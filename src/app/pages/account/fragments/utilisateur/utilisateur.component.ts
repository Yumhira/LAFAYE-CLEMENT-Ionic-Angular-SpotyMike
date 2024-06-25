import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonLabel, IonInput, IonButton, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { FirestoreService } from 'src/app/core/services/firestore.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonInput,
    IonLabel,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class UtilisateurComponent implements OnInit {
  private fireStoreService = inject(FirestoreService);

  user: any[] = [];
  isEditMode = false;

  form = new FormGroup({
    email: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    tel: new FormControl(''),
    dateBirth: new FormControl(''),
    sexe: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {
    this.getUserByEmail();

    this.fireStoreService.getUserByEmail().then((data) => {
      this.user = data;
      this.form.patchValue({
        email: this.user[0].email,
        firstname: this.user[0].firstname,
        lastname: this.user[0].lastname,
        tel: this.user[0].tel,
        dateBirth: format(this.user[0].dateBirth.toDate(), 'dd/MM/yyyy'),
        sexe: this.user[0].sexe ? 'Homme' : 'Femme',
      });
    });
  }

  getUserByEmail() {
    this.fireStoreService.getUserByEmail().then((data) => {
      this.user = data;
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (this.isEditMode) {
      this.form.controls.email.disable();
      this.form.controls.dateBirth.disable();
    } else {
      this.form.controls.email.enable();
      this.form.controls.dateBirth.enable();
    }
  }
}
