import { Component, Input, OnInit } from '@angular/core';

import { ProductionBuilding } from '../data/data.service';

@Component({
  selector: 'app-production-building',
  templateUrl: './production-building.component.html',
  styleUrls: ['./production-building.component.scss']
})
export class ProductionBuildingComponent implements OnInit {

  constructor() { }

  @Input()
  productionBuilding: ProductionBuilding;

  ngOnInit() {
  }

}
