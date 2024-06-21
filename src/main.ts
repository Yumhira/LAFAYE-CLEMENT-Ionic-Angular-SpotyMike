import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { i18nProviders } from './app/core/providers/i18n.providers';
import { IonicModule } from '@ionic/angular';
import { LocalStorageService } from './app/core/services/local-storage.service';
import { FirestoreService } from './app/core/services/firestore.service';
import { AudioService } from './app/core/services/audio.service';
import { UtilisateurComponent } from './app/pages/account/fragments/utilisateur/utilisateur.component';
import { ArtisteComponent } from './app/pages/account/fragments/artiste/artiste.component';
if (environment.production) {
  enableProdMode();
}

registerSwiperElements();

bootstrapApplication(AppComponent, {
  providers: [
    LocalStorageService,
    i18nProviders,
    FirestoreService,
    provideHttpClient(),
    provideIonicAngular(),
    importProvidersFrom(IonicModule.forRoot()),
    provideRouter(routes),
    AudioService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
});
