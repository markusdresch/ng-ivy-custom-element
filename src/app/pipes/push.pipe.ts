/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectorRef, EventEmitter, OnDestroy, Pipe, PipeTransform, WrappedValue} from '@angular/core';
import {Observable, SubscriptionLike} from 'rxjs';

/**
 * @ngModule CommonModule
 * @whatItDoes Unwraps a value from an Observable and runs local Change Detection.
 * @howToUse `observable$ | push`
 * @description
 * The `push` pipe subscribes to an `Observable` and returns the latest value it has
 * emitted. When a new value is emitted, the `push` pipe runs local Change Detection on the
 * component.
 * When the component gets destroyed, the `push` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 * @experimental
 */
@Pipe({name: 'push', pure: false})
export class PushPipe implements OnDestroy, PipeTransform {
  private latestValue: any = null;
  private latestReturnedValue: any = null;

  private subscription: SubscriptionLike|null = null;
  private obj: Observable<any>|EventEmitter<any>|null = null;

  constructor(private ref: ChangeDetectorRef) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.dispose();
    }
  }

  transform<T>(obj: null): null;
  transform<T>(obj: undefined): undefined;
  transform<T>(obj: Observable<T>|null|undefined): T|null;
  transform(obj: Observable<any>|null|undefined): any {
    if (!this.obj) {
      if (obj) {
        this.obj = obj;
        this.subscription =
            obj.subscribe({next: (value: any) => this.updateLatestValue(obj, value)});
      }
      this.latestReturnedValue = this.latestValue;
      return this.latestValue;
    }

    if (obj !== this.obj) {
      this.dispose();
      return this.transform(obj as any);
    }

    if (this.latestValue === this.latestReturnedValue) {
      return this.latestReturnedValue;
    }

    this.latestReturnedValue = this.latestValue;
    return WrappedValue.wrap(this.latestValue);
  }

  private dispose(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.latestValue = null;
    this.latestReturnedValue = null;
    this.subscription = null;
    this.obj = null;
  }

  private updateLatestValue(async: any, value: any): void {
    if (async === this.obj) {
      this.latestValue = value;
      this.ref.detectChanges();
    }
  }
}
