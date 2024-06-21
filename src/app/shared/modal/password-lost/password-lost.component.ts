import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  IonIcon
} from '@ionic/angular/standalone';
import { AuthentificationService } from 'src/app/core/services/authentification.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule
  ],
})
export class PasswordLostComponent {
  error = '';
  submitForm = false;

  private localStore = inject (LocalStorageService);
  private router = inject(Router);
  private modalCtl = inject(ModalController);
  private serviceAuth = inject(AuthentificationService);
  
  form: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'),
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
      this.serviceAuth
        .passwordLost(this.form.value.password)
        .subscribe((data: any) => {
          if (data?.error) {
            // this.error = data?.message;
          } else {
            this.router.navigateByUrl('/auth/login');
          }
          console.log(data);
        });
    }
  }

  constructor() {}
  async cancel() {
    await this.modalCtl.dismiss();
  }

  async redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }
}