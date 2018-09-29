import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { PopulationService } from '../data/population.service';

@Component({
  selector: 'app-population-input',
  templateUrl: './population-input.component.html',
  styleUrls: ['./population-input.component.css']
})
export class PopulationInputComponent implements OnInit, OnChanges {

  @Input()
  levelCount: number;

  @Input()
  race: string;

  form: FormArray;

  constructor(private populationService: PopulationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.array(new Array(this.levelCount));

    this.form.valueChanges.pipe(map(((vc: number[]) => vc.reduce((pv, cr, index) => {
      pv[index + 1] = +cr;
      return pv;
    }, {})))).subscribe(v => this.populationService.populationSelection.get(this.race).next(v));

  }

  ngOnChanges() {
    if (this.form) {
      this.form.controls.splice(0, this.form.controls.length);
      Array.from(new Array(this.levelCount)).forEach(() => this.form.push(new FormControl()));
    }
  }

  copyArray<T>(arr: T[]) {
    return arr.map(e => e);
  }

}
