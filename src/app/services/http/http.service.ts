import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, isObservable, Observable, Subscription } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { User } from 'src/app/models/user/user.model';
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

export function applicationHttpClientCreator(
  http: HttpClient,
  jwtService: JwtTokenService) {
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

  constructor(
    private http: HttpClient,
    private jwtService: JwtTokenService) { }

  public async getAsync<T>(endPoint: string): Promise<T | null> {
    this.setAuthorizationHeaderToken();
    return await this.executeHttpRequestAsync(
      this.http.get<T>(this.baseApiUrl + endPoint, this.options));
  }

  public async postAsync<T>(endPoint: string, params?: Object): Promise<T | null> {
    this.setAuthorizationHeaderToken();
    return await this.executeHttpRequestAsync(
      this.http.post<T>(this.baseApiUrl + endPoint, params, this.options));
  }

  public async putAsync<T>(endPoint: string, params?: Object): Promise<T | null> {
    this.setAuthorizationHeaderToken();
    return await this.executeHttpRequestAsync(
      this.http.put<T>(this.baseApiUrl + endPoint, params, this.options));
  }

  public async deleteAsync<T>(endPoint: string, params?: Object): Promise<T | null> {
    this.setAuthorizationHeaderToken();

    let requestOptions: IRequestOptions = {
      headers: this.options.headers,
      body: params
    };

    return await this.executeHttpRequestAsync(
      this.http.delete<T>(this.baseApiUrl + endPoint, requestOptions));
  }

  private async executeHttpRequestAsync<T>(method: Observable<T>): Promise<T | null> {
    let result: T | null = null;
    await this.createHttpRequestPromise(method)
      .then((success) => {
        result = success;
      })
      .catch((error) => {
        console.log(error);
        //throw Error(error);
      });

    return result;
  }

  private createHttpRequestPromise<T>(method: Observable<T>): Promise<T | null> {
    return new Promise<T | null>(function(resolve, reject) {
      method.subscribe({
        next: (item) => {
          resolve(item);
        },
        error: (response) => {
          reject(response);
        }
      })
    });
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