import { SharedModule } from './features/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const EM_IMPORTS = [
  NgbModule.forRoot(),
  SharedModule.forRoot(),
];
