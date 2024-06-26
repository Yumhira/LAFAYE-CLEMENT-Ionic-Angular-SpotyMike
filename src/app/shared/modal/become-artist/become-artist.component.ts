import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ModalController } from '@ionic/angular';
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
  IonToast,
  IonLabel,
} from '@ionic/angular/standalone';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-become-artist',
  templateUrl: './become-artist.component.html',
  styleUrls: ['./become-artist.component.scss'],
  standalone: true,
  imports: [
    IonLabel,
    IonToast,
    IonContent,
    CommonModule,
    IonIcon,
    IonButton,
    IonInput,
    IonItem,
    IonList,
    IonToolbar,
    IonHeader,
    IonTitle,
    FormsModule,
    ReactiveFormsModule,
    
  ],
})
export class BecomeArtistComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  private modalCtl = inject(ModalController);
  private fireStoreService = inject(FirestoreService);
  user: any[] = [];
  private _location: any;
  avatarSrc: string = 'assets/icon/avatar.svg';
  errorMessage: string | null = null;

  form = new FormGroup({
    fullname: new FormControl(''),
    label: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(private cdr: ChangeDetectorRef) {
    addIcons({ chevronBackOutline, chevronForwardOutline });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log('File selected:', file);
    if (file) {
      const fileType = file.type;
      const validTypes = ['image/jpeg', 'image/png'];
      if (!validTypes.includes(fileType)) {
        this.errorMessage =
          'Veuillez sélectionner une image au format PNG ou JPEG.';
        console.log(this.errorMessage);
        return;
      }

      this.errorMessage = null;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarSrc = e.target.result;
        console.log('Avatar source updated:', this.avatarSrc);
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  async cancel() {
    await this.modalCtl.dismiss();
  }

  ngOnInit() {
    this.getUserByEmail();
  }

  getUserByEmail() {
    this.fireStoreService.getUserByEmail().then((data) => {
      this.user = data;
    });
  }

  backClicked() {
    this.modalCtl.dismiss();
  }
}
