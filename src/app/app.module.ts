// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from 'src/app/app.component';
import { PushPipe } from 'src/app/pipes/push.pipe';

@NgModule({
    declarations: [
        AppComponent,
        PushPipe
    ],
    imports: [
        // BrowserModule,
        HttpClientModule
    ],
    providers: [],
    entryComponents: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
        console.log('module ctor');
    }

    ngDoBootstrap() {
        console.log('module bootstrap');

        customElements.define('ng-ivy-custom-element',
            createCustomElement(AppComponent, { injector: this.injector }));

        console.log('module', this.injector);
    }
}
