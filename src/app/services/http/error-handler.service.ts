import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/models/exception/errorResponse.model';
import { CookieStorageService } from '../storage/cookie-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private cookieStorageService: CookieStorageService,
    private router: Router) { }

  public handleError(response: ErrorResponse) {

    console.log(response);
    let error: any = {
      url: response.url,
      status: response.status,
      errors: response.error?.errors
    };

    

    if (error.status == 401
      && (error.errors?.UserSessionExpired
          || error.errors?.FailedToChallangeToken
          || error.errors?.FailedToValidateToken)) {
        this.cookieStorageService.deleteAll();
        this.router.navigate(['sign-in']);
    }

    let errorResponse = new ErrorResponse();
    errorResponse.error = response.error;
    errorResponse.message = response.message;
    errorResponse.name = response.name;
    errorResponse.ok = response.ok;
    errorResponse.status = response.status;
    errorResponse.statusText = response.statusText;
    errorResponse.url = response.url;

    return errorResponse;
  }

  public isErrorResponse(object: ErrorResponse | null) {
    if (object instanceof ErrorResponse) {
      return true;
    }

    return false;
  }
}