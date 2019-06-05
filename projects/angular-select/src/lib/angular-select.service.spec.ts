import { TestBed } from '@angular/core/testing';

import { AngularSelectService } from './angular-select.service';

describe('AngularSelectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularSelectService = TestBed.get(AngularSelectService);
    expect(service).toBeTruthy();
  });
});
