import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment.developments';
import { UserService } from './user/user.service';
import { ErrorService } from './core/error/error.service';

const { appUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private router: Router, private userService: UserService, private errorService: ErrorService) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (
            req.url.startsWith('/login') ||
            req.url.startsWith('/users')
        ) {
            req = req.clone({
                withCredentials: true,
                setHeaders: {
                    'X-Parse-Session-Token': this.userService.getSessionToken(),
                },
            });
        }

        return next.handle(req).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.router.navigate(['/login']);
                } else {
                    this.errorService.setError(err);
                }
                return [err];
            })
        );
    }
}

export const appInterceptorProvider: Provider = {
    multi: true,
    useClass: AppInterceptor,
    provide: HTTP_INTERCEPTORS,
};