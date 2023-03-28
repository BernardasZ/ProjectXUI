import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { JwtTokenService } from '../auth/jwt-token.service';

export interface IRequestOptions {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
  body?: any;
}

export function applicationHttpClientCreator(http: HttpClient, jwtService: JwtTokenService) {
  return new HttpService(http, jwtService);
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseApiUrl = environment.baseApiUrl;

  options: IRequestOptions = {
    headers: this.getHeaders()
  };

  constructor(private http: HttpClient, private jwtService: JwtTokenService) { }

  public get<T>(endPoint: string): Observable<T> {
    this.setAuthorizationHeaderToken();
    return this.http.get<T>(this.baseApiUrl + endPoint, this.options);
  }

  public post<T>(endPoint: string, params?: Object): Observable<T> {
    this.setAuthorizationHeaderToken();
    return this.http.post<T>(this.baseApiUrl + endPoint, params, this.options);
  }

  public put<T>(endPoint: string, params?: Object): Observable<T> {
    this.setAuthorizationHeaderToken();
    return this.http.put<T>(this.baseApiUrl + endPoint, params, this.options);
  }

  public delete<T>(endPoint: string, params?: Object): Observable<T> {
    this.setAuthorizationHeaderToken();

    let requestOptions: IRequestOptions = {
      headers: this.options.headers,
      body: params
    };

    return this.http.delete<T>(this.baseApiUrl + endPoint, requestOptions);
  }

  private setAuthorizationHeaderToken(): void {
    let token = this.jwtService.getToken();

    if (token) {
      this.options.headers = this.options.headers?.set('Authorization', 'Bearer ' + token);
    }
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');

    return headers;
  }
}