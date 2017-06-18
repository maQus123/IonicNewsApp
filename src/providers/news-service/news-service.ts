import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class NewsService {

  private apiUrl: string = "https://news-105d2.firebaseio.com/news";
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public getNewsList() {
    return this.http.get(this.apiUrl + "/.json")
      .map(this.extractData)
      .catch(this.handleError);
  }

  public getNewsItem(id: number) {
    return this.http.get(this.apiUrl + "/" + id.toString() + "/.json")
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(response: Response) {
    return response.json();
  }

  private handleError(error: Response | any) {
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }

}