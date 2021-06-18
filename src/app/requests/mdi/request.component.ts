import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {ServerService} from '../server.service';

@Component({
  selector: 'app-mdi',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  form!: FormGroup;
  modalRef!: BsModalRef;
  events: any[] = [];
  currentEvent: any = {id: null, name: '', description: '', date: new Date()};
  modalCallback!: () => void;


  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private server: ServerService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.currentEvent.name, Validators.required],
      description: this.currentEvent.description,
      date: [this.currentEvent.date, Validators.required],
    });
    this.getEvents();
  }

  private updateForm() {
    this.form.setValue({
      name: this.currentEvent.name,
      description: this.currentEvent.description,
      date: new Date(this.currentEvent.date),
    });
  }

  private getEvents() {
    this.server.getEvents().subscribe((response: any) => {
      console.log('Response', response);
      this.events = response.map(
        (ev: {
          body: any;
          description: any;
          header: any;
          name: any;
          icon: string;
        }) => {
          ev.body = ev.description;
          ev.header = ev.name;
          ev.icon = 'fa-clock-o';
          return ev;
        }
      );
    });
  }

  addEvent(template: any) {
    this.currentEvent = {
      id: null,
      name: '',
      description: '',
      date: new Date(),
    };
    this.updateForm();
    this.modalCallback = this.createEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  createEvent() {
    const newEvent = {
      name: this.form.get('name')!.value,
      description: this.form.get('description')!.value,
      date: this.form.get('date')!.value,
    };
    this.modalRef.hide();
    this.server.createEvent(newEvent).subscribe(() => {
      this.getEvents();
    });
  }

  editEvent(index: number, template: any) {
    this.currentEvent = this.events[index];
    this.updateForm();
    this.modalCallback = this.updateEvent.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateEvent() {
    const eventData = {
      id: this.currentEvent.id,
      name: this.form.get('name')!.value,
      description: this.form.get('description')!.value,
      date: this.form.get('date')!.value,
    };
    this.modalRef.hide();
    this.server.updateEvent(eventData).subscribe(() => {
      this.getEvents();
    });
  }

  deleteEvent(index: number) {
    this.server.deleteEvent(this.events[index]).subscribe(() => {
      this.getEvents();
    });
  }

  onCancel() {
    this.modalRef.hide();
  }

}
