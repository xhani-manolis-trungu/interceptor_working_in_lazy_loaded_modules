import { Inject, Injectable, Optional } from '@angular/core';

import {
  HttpRequest,
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const XCallerChainSkipHeader = 'x-caller-chain-skip';
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
    if (req.headers.has(XCallerChainSkipHeader)) {
      const headers = req.headers.delete(XCallerChainSkipHeader);
      return next.handle(req.clone({ headers }));
    } else {
      req = req.clone({
        setHeaders: {
          'x-caller-chain': this.xCallerChain
            ? this.xCallerChain
            : 'myEnterprise',
        },
      });
      return next.handle(req);
    }
  }
}
