import { CheckRoomAvailabilityBody } from '../reducers/booking.reducers';
import { baseUrl, HttpService } from '../../http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BookingService {
  constructor(private http: HttpService) {}

  private url = (propertyId) =>
    baseUrl + `/rooms/bookings/properties/${propertyId}/booking`;

  public checkRoomAvailability(
    propertyId: string,
    body: CheckRoomAvailabilityBody
  ): Observable<any> {
    return this.http.post<any>(this.url(propertyId), {}, body);
  }

  public reserveRoom(
    propertyId: string,
    roomId: string,
    startDate: string,
    endDate: string,
    guestsInfo: string,
    guests: { adults: number; children: number; infants: number },
    rooms: number,
    language: string
  ): Observable<{ id: string }> {
    const body = {
      startDate,
      endDate,
      guestsInfo,
      guests,
      rooms,
      language,
    };

    return this.http.post<{ id: string }>(
      baseUrl +
        '/rooms/properties/' +
        propertyId +
        '/rooms/' +
        roomId +
        '/booking',
      {},
      body
    );
  }

  public getReservedRoom(
    propertyId: string,
    roomId: string,
    bookingId: string
  ): Observable<any> {
    return this.http.get<any>(
      baseUrl +
        '/rooms/properties/' +
        propertyId +
        '/rooms/' +
        roomId +
        '/booking/' +
        bookingId,
      {}
    );
  }
}
