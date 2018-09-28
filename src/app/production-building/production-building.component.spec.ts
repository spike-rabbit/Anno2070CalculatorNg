import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionBuildingComponent } from './production-building.component';

describe('ProductionBuildingComponent', () => {
  let component: ProductionBuildingComponent;
  let fixture: ComponentFixture<ProductionBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionBuildingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
