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


  readonly  paramToTypeMap = {
    tycoons: 'Tycoons1',
    ecos: 'Ecos1',
    techs: 'Techs1',
  };

  buildingDatas: Observable<ProductionBuilding[]>;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
   this.buildingDatas = combineLatest(this.dataService.buildingData, this.activatedRoute.paramMap).pipe(
      map(([bds, pm]) => {
        const race = this.paramToTypeMap[pm.get('race')];
        return bds.filter(bd => bd.buildingLevel === race);
      })
    );
  }

}
