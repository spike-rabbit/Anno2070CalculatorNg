import { Component, Input, OnInit } from '@angular/core';

import { ProductionBuilding } from '../data/data.service';

@Component({
  selector: 'app-production-building-list',
  templateUrl: './production-building-list.component.html',
  styleUrls: ['./production-building-list.component.css']
})

export class ProductionBuildingListComponent implements OnInit {
  @Input()
  productionBuildings: ProductionBuilding[];

  constructor() { }

  ngOnInit() {

  }

}
