import { TestBed } from '@angular/core/testing';

import { CookiemanagerService } from './cookiemanager.service';

describe('CookiemanagerService', () => {


  let service: CookiemanagerService;
  beforeEach(() => {service = new CookiemanagerService(); });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getCookie should return a boolean value', () => {
    service.setCookieWithString('test', 'true', 'localhost');

    expect(service.getCookie('test')).toBeTruthy();
  });

  it('#getCookie should return a undefined value after deleting stringtest cookie', () => {
    service.deleteCookie('stringTest');

    expect(service.getCookie('stringTest')).toBeUndefined();
  });
});
