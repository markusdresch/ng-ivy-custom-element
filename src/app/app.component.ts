import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Model } from './models/model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ng-ivy-custom-element',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  // providers: [ { provide: HttpClient, deps: [ HttpHandler ] } ]
})
export class AppComponent {

    title = 'ng-ivy-custom-element';

    @Input('in')
    set inputAttribute(value: string) {
        console.log(value);
    }

    private dataSubject = new BehaviorSubject<Model>(null);
    data$ = this.dataSubject.asObservable();

    // private http: HttpClient;
    constructor(private http: HttpClient) {
        http.get<Model>('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
            console.log(data);
            this.dataSubject.next(data);
        });
    }
}
