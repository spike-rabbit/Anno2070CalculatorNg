import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopulationService {


  populationSelection: Map<string, Subject<PopulationSelection>> = new Map([
    ['tycoons', new Subject<PopulationSelection>()],
    ['ecos', new Subject<PopulationSelection>()],
    ['techs', new Subject<PopulationSelection>()],
  ]);

  constructor() { }
}

export interface PopulationSelection {
  [key: number]: number;
}
