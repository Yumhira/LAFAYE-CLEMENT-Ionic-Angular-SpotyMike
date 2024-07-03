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
} from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { ILoginRequestError, ILoginRequestSuccess } from 'src/app/core/interfaces/login';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { PasswordLostComponent } from 'src/app/shared/modal/password-lost/password-lost.component';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { IUser } from 'src/app/core/interfaces/user';
import { addIcons } from 'ionicons';
import { eyeOffOutline, eyeOutline, alertOutline, checkmarkOutline } from 'ionicons/icons';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonItem,
    IonList,
    IonTitle,
    IonInput,
    IonHeader,
    IonButton,
    IonToolbar,
    IonContent,
    FormsModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  error = '';
  submitForm = false;
  user: IUser[] | undefined;
  passwordFieldType: string = 'password';

  private localStore = inject (LocalStorageService);
  private router = inject(Router);
  private modalCtl = inject(ModalController);
  private serviceFirestore = inject(FirestoreService);

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
    addIcons({ eyeOutline, eyeOffOutline, alertOutline, checkmarkOutline });
  }

  ngOnInit() {}

  onSubmit() {
    this.error = '';
    if (this.form.valid) {
      this.submitForm = true;
      this.serviceFirestore
        .getUserByEmailPasswordObservable(this.form.value.email, this.form.value.password)
        .subscribe((users) => {
          if (users.length > 0) {
            const user = users[0];
            if (user.idDocument) {
              this.localStore.setItem(
                'userIdDocument',
                JSON.stringify(user.idDocument)
              );
              const token = uuidv4();
              this.localStore.setItem('token', JSON.stringify(token));
              setTimeout(() => {
                this.router.navigateByUrl('/tabs/home');
              }, 1000);
            } else {
              this.error = 'Email ou mot de passe incorrect';
              console.log(this.error);
            }
          } else {
            this.error = 'Email ou mot de passe incorrect';
            console.log(this.error);
          }
        }
      );
    }
  }

  goToHome(){
    this.router.navigate(['/tabs/home']);
  }

  async onPasswordLostModal() {
    const modal = await this.modalCtl.create({
      component: PasswordLostComponent,
    });
    modal.present();
  }

  async redirectToRegister() {
    this.router.navigate(['/auth/layoutRegister/register']);
  }
  
  togglePasswordVisibility() {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
