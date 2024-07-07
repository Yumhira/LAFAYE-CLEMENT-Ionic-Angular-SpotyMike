import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { chevronBackOutline, closeOutline } from 'ionicons/icons';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { ModalController } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonSearchbar,
  IonLabel,
  IonIcon,
  IonCol,
  IonRow,
  IonListHeader,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonIcon,
    IonCol,
    IonToolbar,
    IonList,
    IonRow,
    IonItem,
    IonSearchbar,
    IonLabel,
    IonListHeader
  ],
})
export class SearchComponent implements OnInit {
  @Input() searchItems: string[] = ['Artists', 'Albums', 'Playlists', 'Songs'];

  searchQuery: string = '';
  filteredItems: any[] = [];
  allItems: any[] = [];

  constructor(
    private modalController: ModalController,
    private firestoreService: FirestoreService
  ) {
    addIcons({ chevronBackOutline, closeOutline });
  }

  ngOnInit(): void {
    this.fetchAllItems();
  }

  async fetchAllItems(): Promise<void> {
    const artists$ = this.firestoreService.getArtist();
    const albums$ = this.firestoreService.getAlbums();
    const playlists$ = this.firestoreService.getPlaylist();
    const songs$ = this.firestoreService.getSong();

    Promise.all([artists$, albums$, playlists$, songs$]).then(
      ([artists, albums, playlists, songs]) => {
        this.allItems = [
          { category: 'Artists', items: artists },
          { category: 'Albums', items: albums },
          { category: 'Playlists', items: playlists },
          { category: 'Songs', items: songs },
        ];
        this.filteredItems = [...this.allItems];
      }
    );
  }

  applyFilter(event: any): void {
    const query = event.target.value?.trim().toLowerCase() ?? '';
    if (query === '') {
      this.filteredItems = [...this.allItems];
    } else {
      this.filteredItems = this.allItems.map((category) => ({
        ...category,
        items: category.items.filter((item: any) =>
          this.getItemLabel(category.category, item).toLowerCase().includes(query)
        ),
      }));
    }
  }

  getItemLabel(category: string, item: any): string {
    switch (category) {
      case 'Artists':
        return item.fullname;
      case 'Playlists':
        return item.name;
      case 'Albums':
        return item.title;
      case 'Songs':
        return item.title;
      default:
        return '';
    }
  }

  getItemImage(category: string, item: any): string {
    switch (category) {
      case 'Artists':
        return item.avatar;
      case 'Playlists':
        return item.cover;
      case 'Albums':
        return item.cover;
      case 'Songs':
        return item.cover;
      default:
        return '';
    }
  }

  backClicked() {
    this.modalController.dismiss();
  }
}
