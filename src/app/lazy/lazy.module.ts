import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildComponent } from './child/child.component';
import { LazyRoutingModule } from './lazy-routing.module';
import { X_CALLER_CHAIN_TOKEN } from '../core/token-interceptor.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [CommonModule, LazyRoutingModule, CoreModule],
  declarations: [ChildComponent],
  providers: [{ provide: X_CALLER_CHAIN_TOKEN, useValue: 'CCCC', multi: true }],
})
export class LazyModule {}
