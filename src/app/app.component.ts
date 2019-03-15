import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { Model } from './models/model';
import { BehaviorSubject } from 'rxjs';
import { PushPipe } from './pipes/push.pipe';

@Component({
  selector: 'ng-ivy-custom-element',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,

//   providers: [
//     { provide: HttpClient, deps: [ HttpHandler ] },
//     { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest() }) },
//     { provide: PushPipe, deps: [ ChangeDetectorRef ] }
//   ]
})
export class AppComponent {

    title = 'ng-ivy-custom-element';

    @Input()
    private in: string;

    // @Input('in')
    set inputAttribute(value: string) {
        console.log('setter', value);
        this.in = value;
    }

    get inputAttribute(): string {
        console.log('getter', this.in);
        return this.in;
    }

    private dataSubject = new BehaviorSubject<Model>(null);
    data$ = this.dataSubject.asObservable();

    constructor(http: HttpClient) {
        http.get<Model>('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
            console.log('loaded remote data', data);
            this.dataSubject.next(data);
        });
    }
}
