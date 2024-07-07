import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonIcon,
  IonCol,
  IonRow
} from '@ionic/angular/standalone';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { alertOutline, chevronBackOutline, chevronForwardOutline, eyeOffOutline, eyeOutline } from 'ionicons/icons';
import { IUser } from 'src/app/core/interfaces/user';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  standalone: true,
  selector: 'app-password-lost',
  templateUrl: './password-lost.component.html',
  styleUrls: ['./password-lost.component.scss'],
  imports: [
    IonItem,
    IonInput,
    IonContent,
    IonTitle,
    IonButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonIcon,
    IonCol,
    IonRow,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class PasswordLostComponent {
  error = '';
  submitForm = false;
  passwordFieldType: string = 'password';
  isUserUpdated = false;
  user: IUser[] = [];

  private localStore = inject (LocalStorageService);
  private router = inject(Router);
  private modalCtl = inject(ModalController);
  private serviceAuth = inject(AuthentificationService);
  private fireStoreService = inject(FirestoreService);
  
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor() {
    addIcons({ eyeOutline, eyeOffOutline, alertOutline, chevronBackOutline, chevronForwardOutline });
  }
  
  async getUserByEmail(email: string): Promise<IUser | null> {
    try {
      const users = await this.fireStoreService.getUserByMail(email);
      if (users && users.length > 0) {
        return users[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  async onClick() {  
    if (this.form.invalid) {
      console.error('Form is invalid');
      return;
    }
    const email = this.form.get('email')?.value;
    const getUser = await this.getUserByEmail(email);
    if (getUser) {
      getUser.password = this.form.get('password')?.value;
      try {
        await this.fireStoreService.updateUser(getUser.id, { password: getUser.password });
        console.log('Successfully updated user in Firestore:', getUser.id);
        this.isUserUpdated = true;
        this.submitForm = true;
        setTimeout(async () => {
          await this.confirm();
        }, 1000);
      } catch (error) {
        console.error('Error updating document:', error);
        this.isUserUpdated = false;
        this.submitForm = false;
      }
    }
  }  

  async cancel() {
    await this.modalCtl.dismiss();
  }

  async confirm() {
    await this.modalCtl.dismiss();
  }

  backClicked() {
    this.modalCtl.dismiss();
  }

  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}