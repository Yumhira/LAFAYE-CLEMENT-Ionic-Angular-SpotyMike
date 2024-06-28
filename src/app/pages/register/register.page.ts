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

  private router = inject(Router);
  private serviceAuth = inject(AuthentificationService);

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
    birthdate: new FormControl('', [
      Validators.required
    ]),
  });
  constructor() {}

  ngOnInit() {}

  onSubmit() {
    this.error = '';
    if (this.form.valid) {
      this.submitForm = true;
      // this.serviceAuth
      //   .register(this.form.value.firstname, this.form.value.lastname, this.form.value.email, this.form.value.password, this.form.value.tel, this.form.value.sexe)
      //   .subscribe((data: any) => {
      //     if (data?.error) {
      //       // this.error = data?.message;
      //     } else {
      //       this.router.navigateByUrl('/auth/layoutLogin/login');
      //     }
      //     console.log(data);
      //   });
    }
  }

  async redirectToLogin() {
    this.router.navigate(['/auth/layoutLogin/login']);
  }
}
