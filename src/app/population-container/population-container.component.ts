import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataService, ProductionBuilding } from '../data/data.service';

@Component({
  selector: 'app-population-container',
  templateUrl: './population-container.component.html',
  styleUrls: ['./population-container.component.css']
})
export class PopulationContainerComponent implements OnInit {

  buildingDatas: Observable<ProductionBuilding[]>;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.buildingDatas = combineLatest(this.dataService.buildingData, this.dataService.peopleData, this.activatedRoute.paramMap).pipe(
      map(([bds, pd, pm]) => {
        const race = pm.get('race');
        const resources = new Set<string>();
        Object.values(pd[race]).forEach(m => {
          const keys = m.keys();

          let res = keys.next();
          while (!res.done) {
            resources.add(res.value);
            res = keys.next();
          }

        });
        return bds.filter(bd => resources.has(bd.product));
      })
    );
  }

  calculate(selection: PopulationSelection) {

  }

}

export interface PopulationSelection {
  [key: number]: number;
}
