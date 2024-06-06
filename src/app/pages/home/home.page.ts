import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
  IonButton,
  IonButtons,
  IonRow,
  IonCol,
  IonCard
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, searchOutline, ellipsisHorizontal } from 'ionicons/icons';
import { IAlbum } from 'src/app/core/interfaces/album';
import { IUserTest } from 'src/app/core/interfaces/userTest';
import { PhoneNumberPipe } from 'src/app/core/pipe/phone-number.pipe';
import { FirestoreService } from 'src/app/core/services/firestore.service';
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
    IonButton,
    IonButtons,
    IonRow,
    IonCol,
    IonCard,
  ],
})
export class HomePage {
  users: IUserTest[] = [];
  albums: any[] = [];
  user: any;
  private userService = inject(UserService);
  private fireStoreService = inject(FirestoreService);
  private local = inject(LocalStorageService);

  ngOnInit() {
    // GET ALL USERS
    // const users: IUserTest[] = this.local.getElement('users');
    // if (!users)
    //   this.userService.requestTest().subscribe((response: IUserTest[]) => {
    //     this.users = response;
    //     this.local.setElement('users', JSON.stringify(this.users));
    //   });
    // else this.users = users;
    this.getAlbum();
  }

  constructor(private router: Router) {
    addIcons({ arrowForwardOutline, searchOutline, ellipsisHorizontal });
  }

  goToPlayer() {
    this.router.navigate(['/player']);
  }

  async getAlbum() {
    this.albums = await this.fireStoreService.getAlbum();
    console.log(this.albums);
  }
}
