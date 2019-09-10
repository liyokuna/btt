import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface TwitterResponse {
  data: any;
  resp: any;
}

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }

  search(val: string) {
    return this.http.post<TwitterResponse>(`http://localhost:3000/search`, {val});
  }

  getRepo() {
    return this.http.get(`http://localhost:3000/repo`);
  }

  getSpeakers() {
    return this.http.get(`http://localhost:3000/speaker`);
  }

}
