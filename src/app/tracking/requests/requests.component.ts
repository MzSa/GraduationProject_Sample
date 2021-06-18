import {Component, OnInit} from '@angular/core';
import State from './state';

@Component({
  selector: 'app-accordions',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class RequestsComponent implements OnInit {

  constructor() {
  }

  state: State[] = [
    {
      id: 1,
      nameOfRequest: 'first Request',
      status: 'needDonation'
    },
    {
      id: 2,
      nameOfRequest: 'second Request',
      status: 'needTransfer'
    },
    {
      id: 3,
      nameOfRequest: 'third Request',
      status: 'final'
    }
  ]

  ngOnInit() {
  }

}
