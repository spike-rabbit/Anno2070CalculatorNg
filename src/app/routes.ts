import { Route } from '@angular/router';

import { GlobalContainerComponent } from './global-container/global-container.component';
import { PopulationContainerComponent } from './population-container/population-container.component';

export const routes: Route[] = [
  {
    path: 'global',
    component: GlobalContainerComponent,
  },
  {
    path: ':race',
    component: PopulationContainerComponent,
  }
];
