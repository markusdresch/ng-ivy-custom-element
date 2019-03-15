import { Injector, ɵrenderComponent as renderComponent, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app/app.component';
import { PushPipe } from './app/pipes/push.pipe';
import { JsonPipe } from '@angular/common';

const injector: Injector = Injector.create({
  name: 'root',
  providers: [
    { provide: HttpClient, deps: [ HttpHandler ] },
    { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest() }) },
    // { provide: PushPipe, deps: [ ChangeDetectorRef ] },
    // { provide: JsonPipe, deps: [] },
    // { provide: AppComponent, deps: [ JsonPipe, PushPipe, HttpClient ] }
  ]
});

// this correcly renders the component, but not as a custom element
// renderComponent(AppComponent, { injector: injector });

// this yields a ComponentFactoryResolver null ref exception
// customElements.define('ng-ivy-custom-element', createCustomElement(AppComponent, { injector: injector }));

class AppComponentCustomElement extends HTMLElement {
  constructor() {
    super();

    renderComponent(AppComponent, { injector: injector });
  }
}

customElements.define('ng-ivy-custom-element', AppComponentCustomElement);
