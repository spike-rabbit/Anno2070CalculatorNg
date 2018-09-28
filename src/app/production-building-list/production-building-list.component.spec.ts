import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionBuildingListComponent } from './production-building-list.component';

describe('ProductionBuildingListComponent', () => {
  let component: ProductionBuildingListComponent;
  let fixture: ComponentFixture<ProductionBuildingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionBuildingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionBuildingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
