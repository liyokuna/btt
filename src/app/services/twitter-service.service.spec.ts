import { async, TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { TwitterService } from './twitter-service.service';

describe('TwitterService', () => {
  beforeEach(async(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
  })));

  it('should be created', () => {
    const service: TwitterService = TestBed.get(TwitterService);
    expect(service).toBeTruthy();
  });

  it('should retrieve speakers', () => {
    (done: DoneFn) => {
      const service: TwitterService = TestBed.get(TwitterService);
      service.getSpeakers().subscribe(value => {
        expect(value.success).toBeTruthy();
        done();
    });
  };
});

  it('should retrieve tweets', () => {
    (done: DoneFn) => {
      const service: TwitterService = TestBed.get(TwitterService);
      service.search('test').subscribe(value => {
        expect(value.data).toBeTruthy();
        done();
      });
  };
});

});
