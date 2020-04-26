import { TestBed } from '@angular/core/testing';

import { GoogleAnalyticService } from './google-analytic.service';

describe('GoogleAnalyticService', () => {
  let service: GoogleAnalyticService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAnalyticService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
