import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {RequestsComponent} from './requests/requests.component';

const routes: Routes = [
  {path: 'request', component: RequestsComponent},
];

@NgModule({
  declarations: [RequestsComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild(routes),
  ]
})
export class TrackingUiModule {
}
