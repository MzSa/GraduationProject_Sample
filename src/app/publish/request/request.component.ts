import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  public id: any;
  public events: any[];

  constructor(private _Activatedroute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
    });

    this.events = [
      {
        id: 1,
        header: 'المتبرع الأول',
        body: 'مكان السكن جمرايا التوصيل مجاني',
      },
      {
        id: 2,
        header: 'المتبرع الثاني',
        body: 'مكان السكن برزة',
      }
    ];
  }

  accept(id: number) {
    // alert('Accept from UserId : ', id);
    console.log('id === > ', id);
  }

  reject(id: number) {
    // alert('Rejected from UserId : ', id);
    console.log('id === > ', id);
  }
}
