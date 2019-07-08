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

  public authorization() {
    var headers = new HttpHeaders();

    headers.append('content-type', 'application/X-www-form-urlencoded;charset=UTF-8');

    this.http.post('http://localhost:3000/authorize', {headers: headers}).subscribe((res) => {
      console.log(res);
    });
  }

}
