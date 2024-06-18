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
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: true,
  imports: [
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
  ],
})
export class AccountPage implements OnInit {
  private router = inject(Router);
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
        sexe: this.user[0].sexe,
      });
    });
  }

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  async getUserByEmail() {
    this.user = await this.fireStoreService.getUserByName();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    //bloque le champ email
    if (this.isEditMode) {
      this.form.controls.email.disable();
      this.form.controls.dateBirth.disable();
    }else{
      this.form.controls.email.enable();
      this.form.controls.dateBirth.enable();
    }
  }
}
