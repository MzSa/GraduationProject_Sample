import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {publishingNeedComponent} from './need/publish-need.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {ModalModule} from 'ngx-bootstrap/modal';
import {HttpClientModule} from '@angular/common/http';
import {NgxTimelineModule} from 'ngx-timeline';
import {ServerService} from './server.service';
import {RequestComponent} from './request/request.component';

const routes: Routes = [
  {path: 'need', component: publishingNeedComponent},
  {path: 'request/:id', component: RequestComponent}
]

@NgModule({
  declarations: [publishingNeedComponent, RequestComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxTimelineModule,
    ModalModule.forRoot(),
  ],
  providers: [
    ServerService
  ]
})
export class publishingModule {
}
