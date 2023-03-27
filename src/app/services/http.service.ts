import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

export function applicationHttpClientCreator(http: HttpClient) {
  return new HttpService(http);
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseApiUrl = environment.baseApiUrl;

  options: IRequestOptions = {
    headers: this.getHeaders()
  };

  constructor(public http: HttpClient) { }

  public get<T>(endPoint: string): Observable<T> {
    return this.http.get<T>(this.baseApiUrl + endPoint, this.options);
  }

  public post<T>(endPoint: string, params?: Object): Observable<T> {
    return this.http.post<T>(this.baseApiUrl + endPoint, params, this.options);
  }

  public put<T>(endPoint: string, params?: Object): Observable<T> {
    return this.http.put<T>(this.baseApiUrl + endPoint, params, this.options);
  }

  public delete<T>(endPoint: string, params?: Object): Observable<T> {
    let requestOptions = this.options

    if (params != null) {
      requestOptions = {
        headers: this.getHeaders(),
        body: params
      };
    }

    return this.http.delete<T>(this.baseApiUrl + endPoint, requestOptions);
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJuYW1laWQiOiJnQ1N4OTVSS3hRSFk0YjFaUjZKNkFmbCtqNW5BSENxNXJCdThrV0hNUDdGTkJ2NUhpZ0tQRWNBa1dkaDVOT3UxIiwibmJmIjoxNjc5OTQyNDk3LCJleHAiOjE2ODA1NDcyOTcsImlhdCI6MTY3OTk0MjQ5N30.zu5F9NNRwXeRFOG5FlTCF6uSjLmNmiPBg19Bk5euu3k');
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');

    return headers;
  }
}