import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TwitterResponse {
  data: any;
  success: any;
}

export interface BttResponse {
  success: any;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  private apiLink = 'https://btt-bo.herokuapp.com/';
  private pageNr = 1;

  constructor(private http: HttpClient) { }

  search(val: string): Observable<TwitterResponse> {
    const page = this.pageNr;
    const pageAmount = 8;
    return this.http.post<TwitterResponse>(this.apiLink + `search`, {val, page, pageAmount});
  }

  getRepo() {
    return this.http.get(this.apiLink + `repo`);
  }

  getSpeakers(): Observable<BttResponse> {
    return this.http.get<BttResponse>(this.apiLink + `speaker`);
  }

  paginatePage(): void {
    if (this.pageNr <= 15) {
      this.pageNr ++;
    }
  }

  paginateReset(): void {
    this.pageNr = 1;
  }

}
