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

  private localStore = inject (LocalStorageService);
  private router = inject(Router);
  private modalCtl = inject(ModalController);
  private serviceAuth = inject(AuthentificationService);
  
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

  onSubmit() {
    this.error = '';
    if (this.form.valid) {
      this.submitForm = true;
      // this.serviceAuth
      //   .passwordLost(this.form.value.email, this.form.value.password)
      //   .subscribe(async (data: any) => {
      //     if (data?.error) {
      //       // this.error = data?.message;
      //     } else {
      //       this.router.navigateByUrl('/auth/layoutLogin/login');
      //     }
      //     console.log(data);
      //   });
    }
  }

  constructor() {
    addIcons({ eyeOutline, eyeOffOutline, alertOutline, chevronBackOutline, chevronForwardOutline });
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