import { Inject, Injectable, Optional } from '@angular/core';

import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const X_CALLER_CHAIN_TOKEN = new InjectionToken('x-caller-chain');

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    @Inject(X_CALLER_CHAIN_TOKEN) @Optional() private xCallerChain?: string
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(`xCallerChain Token: ${this.xCallerChain}`);
    return next.handle(
      req.clone({
        headers: req.headers.append(
          'Authorization',
          'Bearer THIS_IS_THE_ACCESS_TOKEN'
        ),
      })
    );
  }
}
