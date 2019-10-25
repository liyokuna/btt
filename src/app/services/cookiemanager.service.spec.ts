import { TestBed } from '@angular/core/testing';

import { CookiemanagerService } from './cookiemanager.service';

describe('CookiemanagerService', () => {
  const service: CookiemanagerService = TestBed.get(CookiemanagerService);
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(this.service).toBeTruthy();
  });

  it('#getCookie should return a boolean value', () => {
    this.service.setCookie('test', true, 'localhost');

    expect(this.service.getCookie('test')).toBeTruthy();
  });

  it('#getCookie should return a undefined value after deleting stringtest cookie', () => {
    service.deleteCookie('stringTest');

    expect(service.getCookie('stringTest')).toBeUndefined();
  });
});
