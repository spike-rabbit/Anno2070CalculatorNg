import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationInputComponent } from './population-input.component';

describe('PopulationInputComponent', () => {
  let component: PopulationInputComponent;
  let fixture: ComponentFixture<PopulationInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
