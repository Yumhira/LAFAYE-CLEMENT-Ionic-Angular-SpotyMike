import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
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
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonLabel,
  IonSelect,
  IonCol,
  IonSelectOption
} from '@ionic/angular/standalone';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { alertOutline, checkmarkOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { IUser } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonList,
    IonTitle,
    IonInput,
    IonHeader,
    IonSelect,
    IonLabel,
    IonButton,
    IonToolbar,
    IonCol,
    IonContent,
    IonSelectOption,
    FormsModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class RegisterPage implements OnInit {
  error = '';
  submitForm = false;
  isUserCreated = false;
  passwordFieldType: string = 'password';

  private router = inject(Router);
  private fireStoreService = inject(FirestoreService);

  form: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required
    ]),
    lastname: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    dateBirth: new FormControl('', [
      Validators.required
    ]),
    tel: new FormControl('', [
      Validators.pattern('^0[1-9](\\d{2}){4}$'),
    ]),
    sexe: new FormControl('')
  });
  constructor() {
    addIcons({ eyeOutline, eyeOffOutline, alertOutline, checkmarkOutline });
  }

  ngOnInit() {}

  onSubmit() {
    this.error = '';
    if (this.form.valid) {
      this.submitForm = true;
      const user: IUser = this.form.value;
      this.submitRegister(user);
    }
  }

  async redirectToLogin() {
    this.router.navigate(['/auth/layoutLogin/login']);
  }

  async submitRegister(user: IUser) {
    try {
      await this.fireStoreService.postUser(user);
      console.log('Successfully created user in Firestore!');
      this.isUserCreated = true;
      setTimeout(async () => {
        await this.redirectToLogin();
      }, 1000);
    } catch (error) {
      console.error('Error updating document:', error);
      this.isUserCreated = false;
    }
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
