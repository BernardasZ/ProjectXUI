import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ErrorResponse } from 'src/app/models/exception/errorResponse.model';
import { JwtTokenService } from '../auth/jwt-token.service';
import { ErrorHandlerService } from './error-handler.service';

export interface RequestOptions {
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
  jwtService: JwtTokenService,
  errorHandler: ErrorHandlerService) {
  return new HttpService(http, jwtService, errorHandler);
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseApiUrl = environment.baseApiUrl;

  options: RequestOptions = {
    headers: this.getHeaders()
  };

  constructor(
    private http: HttpClient,
    private jwtService: JwtTokenService,
    private errorHandler: ErrorHandlerService) { }

  public async getAsync<T>(endPoint: string) {
    this.setAuthorizationHeaderToken();
    return await this.executeHttpRequestAsync(
      this.http.get<T>(this.baseApiUrl + endPoint, this.options));
  }

  public async postAsync<T>(endPoint: string, params?: Object) {
    this.setAuthorizationHeaderToken();
    return await this.executeHttpRequestAsync(
      this.http.post<T>(this.baseApiUrl + endPoint, params, this.options));
  }

  public async putAsync<T>(endPoint: string, params?: Object) {
    this.setAuthorizationHeaderToken();
    return await this.executeHttpRequestAsync(
      this.http.put<T>(this.baseApiUrl + endPoint, params, this.options));
  }

  public async deleteAsync<T>(endPoint: string, params?: Object) {
    this.setAuthorizationHeaderToken();

    let requestOptions: RequestOptions = {
      headers: this.options.headers,
      body: params
    };

    return await this.executeHttpRequestAsync(
      this.http.delete<T>(this.baseApiUrl + endPoint, requestOptions));
  }

  private async executeHttpRequestAsync<T>(method: Observable<T>) {
    let result: T | ErrorResponse | null = null;
    await this.createHttpRequestPromise(method)
      .then((success) => {
        result = success;
      })
      .catch((error: ErrorResponse) => {
        result = this.errorHandler.handleError(error);
      });

    return result;
  }

  private createHttpRequestPromise<T>(method: Observable<T>) {
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

  private setAuthorizationHeaderToken() {
      this.options.headers = this.options.headers?.set('Authorization', 'Bearer ' + this.jwtService.getToken());
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');

    return headers;
  }
}