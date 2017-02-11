/**
 * This module is the entry for your App when NOT using universal.
 *
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.
 */

import { EM_DECLARATIONS } from './em.declarations';
import { EM_ENTRY_COMPONENTS } from './em.entry-components';
import { EM_IMPORTS } from './em.imports';
import { EM_PROVIDERS } from './em.providers';
import { ApplicationRef, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    EM_DECLARATIONS
  ],
  entryComponents: [EM_ENTRY_COMPONENTS],
  imports: [
    EM_IMPORTS,
    BrowserModule,
    HttpModule,
  ],
  providers: [EM_PROVIDERS]
})

export class EmModule { }
