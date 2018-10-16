import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse) {
          this.errorService.setError(err);
        }
        return throwError(err);
      }));
  }
}
