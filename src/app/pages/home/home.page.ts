import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { IUserTest } from 'src/app/core/interfaces/userTest';
import { PhoneNumberPipe } from 'src/app/core/pipe/phone-number.pipe';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    PhoneNumberPipe,
  ],
})
export class HomePage {
  users: IUserTest[] = [];
  private userService = inject(UserService);
  private local = inject(LocalStorageService);

  ngOnInit() {
    const users: IUserTest[] = this.local.getElement('users');
    if (!users)
      this.userService.requestTest().subscribe((response: IUserTest[]) => {
        this.users = response;
        this.local.setElement('users', JSON.stringify(this.users));
      });
    else this.users = users;
  }
}
