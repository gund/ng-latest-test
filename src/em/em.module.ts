import { CoreConfig, CoreModule } from './core/core.module';
import { EM_DECLARATIONS } from './em.declarations';
import { EM_ENTRY_COMPONENTS } from './em.entry-components';
import { EM_IMPORTS } from './em.imports';
import { EM_PROVIDERS } from './em.providers';
import { ModuleWithProviders, NgModule } from '@angular/core';
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

export class EmModule {

  static forRoot(config: CoreConfig = {}): ModuleWithProviders {
    CoreModule.configure(config);

    return {
      ngModule: EmModule
    };
  }

}
