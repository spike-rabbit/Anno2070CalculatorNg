import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DataService, ProductionBuilding } from '../data/data.service';
import { PopulationService } from '../data/population.service';

@Component({
  selector: 'app-population-container',
  templateUrl: './population-container.component.html',
  styleUrls: ['./population-container.component.css']
})
export class PopulationContainerComponent implements OnInit {

  buildingDatas: Observable<ProductionBuilding[]>;

  buildingCount: Observable<Map<ProductionBuilding, number>>;

  levelCount: Observable<number>;

  race: Observable<string>;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private populationService: PopulationService) { }

  ngOnInit() {

    this.race = this.activatedRoute.paramMap.pipe(map(pm => pm.get('race')));

    const pdByRace = combineLatest(this.dataService.peopleData, this.race).pipe(map(([pd, r]) => pd[r]));

    const popInputByRace = this.race.pipe(
      switchMap(race => this.populationService.populationSelection.get(race)));

    this.levelCount = pdByRace.pipe(map(piBR => Object.keys(piBR).length));

    this.buildingDatas = combineLatest(this.dataService.buildingData, pdByRace).pipe(
      map(([bds, pdBR]) => {
        const resources = new Set<string>();
        Object.values(pdBR).forEach(m => {
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

    this.buildingCount = combineLatest(this.buildingDatas, pdByRace, popInputByRace).pipe(map(([bds, pdBR, piBR]) => {
      return new Map(bds.map(bd => {
        return [bd, Object.entries(piBR).map(([level, count]) => {
          const eatFactor = (pdBR[level].get(bd.product) || 0) / 1000;
          return ((count / 100) * eatFactor) / (60000 / bd.productTime);
        }).reduce((pv, cv) => pv + cv)] as [ProductionBuilding, number];
      }));
    }));
  }
}
