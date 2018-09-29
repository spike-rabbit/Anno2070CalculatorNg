import { TestBed } from '@angular/core/testing';

import { PopulationService } from './population.service';

describe('PopulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PopulationService = TestBed.get(PopulationService);
    expect(service).toBeTruthy();
  });
});
