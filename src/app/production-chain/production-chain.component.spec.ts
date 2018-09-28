import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionChainComponent } from './production-chain.component';

describe('ProductionChainComponent', () => {
  let component: ProductionChainComponent;
  let fixture: ComponentFixture<ProductionChainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionChainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
