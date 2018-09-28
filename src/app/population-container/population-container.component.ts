import { Component, OnInit } from '@angular/core';

import { DataService } from '../data/data.service';

@Component({
  selector: 'app-population-container',
  templateUrl: './population-container.component.html',
  styleUrls: ['./population-container.component.css']
})
export class PopulationContainerComponent implements OnInit {

  constructor(public dataService: DataService) {}

  ngOnInit() {

  }

}
