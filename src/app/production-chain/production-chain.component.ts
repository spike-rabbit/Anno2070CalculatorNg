import { Component, Input, OnInit } from '@angular/core';

import { ProductionBuilding } from '../data/data.service';

@Component({
  selector: 'app-production-chain',
  templateUrl: './production-chain.component.html',
  styleUrls: ['./production-chain.component.css']
})
export class ProductionChainComponent implements OnInit {

  @Input()
  productionBuilding: ProductionBuilding;

  @Input()
  count: number;

  @Input()
  parentTime: number;

  @Input()
  amount = 1000;

  @Input()
  siblingCount: number;

  constructor() { }

  ngOnInit() {
    if (!this.count) {
      // Count is not provided so it must be calculated --> secondary production building
      this.count = (this.productionBuilding.productTime / 1000) / (this.parentTime / (this.amount || 1000));
    }
  }

}
