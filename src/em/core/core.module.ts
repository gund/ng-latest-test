import { ApiService } from './services/api/api.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export interface CoreConfig {
  apiUrl?: string;
}

@NgModule({
  imports: [CommonModule],
  exports: [],
  declarations: [],
  providers: [ApiService],
})
export class CoreModule {

  static configure(config: CoreConfig) {
    ApiService.forBase(config.apiUrl || '');
  }

}
