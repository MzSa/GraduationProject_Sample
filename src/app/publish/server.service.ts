import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get(`${environment.serverUrl}/event`);
  }

  createEvent(event: any) {
    return this.http.post(`${environment.serverUrl}/event`, event);
  }

  updateEvent(event: { id: number }) {
    return this.http.put(`${environment.serverUrl}/event/${event.id}`, event);
  }

  deleteEvent(event: { id: number }) {
    return this.http.delete(`${environment.serverUrl}/event/${event.id}`);
  }
}
