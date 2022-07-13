import { TestBed } from '@angular/core/testing';

import { HabitatServicesService } from './habitat-services.service';

describe('HabitatServicesService', () => {
  let service: HabitatServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitatServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
