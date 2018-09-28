import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatListModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { GlobalContainerComponent } from './global-container/global-container.component';
import { PopulationContainerComponent } from './population-container/population-container.component';
import { PopulationInputComponent } from './population-input/population-input.component';
import { ProductionBuildingListComponent } from './production-building-list/production-building-list.component';
import { ProductionBuildingComponent } from './production-building/production-building.component';
import { ProductionChainComponent } from './production-chain/production-chain.component';
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    PopulationInputComponent,
    ProductionBuildingComponent,
    ProductionChainComponent,
    ProductionBuildingListComponent,
    PopulationContainerComponent,
    GlobalContainerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
