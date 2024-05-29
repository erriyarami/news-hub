import { ApplicationConfig, NgModule } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(),FormsModule,NgModule,DataTablesModule,DataTableDirective,
     provideAnimationsAsync(),provideToastr({ timeOut: 10000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,})]
};
