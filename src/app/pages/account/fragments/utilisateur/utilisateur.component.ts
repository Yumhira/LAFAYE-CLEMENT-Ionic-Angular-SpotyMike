import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonLabel, IonInput, IonButton, IonSelect, IonSelectOption } from "@ionic/angular/standalone";
import { FirestoreService } from 'src/app/core/services/firestore.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { format, parse } from 'date-fns';
import { IUser } from 'src/app/core/interfaces/user';
import { Timestamp } from 'firebase/firestore/lite';

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

  user: IUser[] = [];
  isEditMode = false;

  form = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    firstname: new FormControl('', [
      Validators.required
    ]),
    lastname: new FormControl('', [
      Validators.required
    ]),
    tel: new FormControl(''),
    dateBirth: new FormControl('', [
      Validators.required
    ]),
    sexe: new FormControl(''),
  });

  constructor() {}

  ngOnInit() {
    this.getUserByEmail();
  }

  getUserByEmail() {
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

  async onEdit(userId: string) {
    const user = this.user.find(p => p.id === userId);
    if (user && this.form.valid) {
      try {
        user.firstname = this.form.get('firstname')!.value ?? user.firstname;
        user.lastname = this.form.get('lastname')!.value ?? user.lastname;
        user.sexe = this.form.get('sexe')?.value === 'Homme';
        user.tel = this.form.get('tel')?.value || '';

        await this.fireStoreService.updateUser(userId, { firstname: user.firstname, lastname: user.lastname, sexe: user.sexe, tel: user.tel });
        console.log('Successfully updated user in Firestore:', userId);
      } catch (error) {
        console.error('Error updating document:', error);
      }
    } else {
      console.error('Form is invalid or user not found');
    }
    this.toggleEditMode();
  }

  async onCancel() {
    this.form.patchValue({
      email: this.user[0].email,
      firstname: this.user[0].firstname,
      lastname: this.user[0].lastname,
      tel: this.user[0].tel,
      sexe: this.user[0].sexe ? 'Homme' : 'Femme',
    });

    this.toggleEditMode();
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
