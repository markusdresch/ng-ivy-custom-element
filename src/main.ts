// // import { enableProdMode } from '@angular/core';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { AppModule } from './app/app.module';
// // import { environment } from './environments/environment';

// // if (environment.production) {
// //   enableProdMode();
// // }

// platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop'})
//   .catch(err => console.error(err));

import { Injector, Sanitizer, ɵLifecycleHooksFeature as LifecycleHooksFeature, ɵrenderComponent as renderComponent } from '@angular/core';
import { DomSanitizer, ɵDomSanitizerImpl as DomSanitizerImpl } from '@angular/platform-browser';
import { HttpClient, HttpHandler, HttpXhrBackend } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app/app.component';

// const rootInjector: Injector = Injector.create({
//   name: 'root',
//   providers: [
//     {
//       deps: [],
//       provide: DomSanitizer,
//       useClass: DomSanitizerImpl,
//     },
//     {
//       provide: Sanitizer,
//       useExisting: DomSanitizer,
//     },
//     { provide: HttpClient, deps: [ HttpHandler ] },
//     { provide: HttpHandler, useValue: new HttpXhrBackend({ build: () => new XMLHttpRequest() }) }
//   ]
// });

renderComponent(AppComponent/*, {
  hostFeatures: [
    LifecycleHooksFeature,
  ],
  injector: rootInjector,
  sanitizer: rootInjector.get(Sanitizer)
}*/);

// customElements.define('ng-ivy-custom-element',
//             createCustomElement(AppComponent, { injector: rootInjector }));
