import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopulationContainerComponent } from './population-container.component';

describe('PopulationContainerComponent', () => {
  let component: PopulationContainerComponent;
  let fixture: ComponentFixture<PopulationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopulationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopulationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
