import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TwitterResponse {
  data: any;
  resp: any;
}

export interface BttResponse {
  success: any;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class TwitterService {

  constructor(private http: HttpClient) { }

  search(val: string) {
    return this.http.post<TwitterResponse>(`https://btt-bo.herokuapp.com/search`, {val});
  }

  getRepo() {
    return this.http.get(`https://btt-bo.herokuapp.com/repo`);
  }

  getSpeakers() {
    return this.http.get<BttResponse>(`https://btt-bo.herokuapp.com/speaker`);
  }

}
