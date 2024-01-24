import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, HttpService } from '../../http.service';
import { Room, UpdateRoom } from '../reducers/rooms.reducers';

@Injectable()
export class RoomService {
  constructor(private http: HttpService) {
  }

  private url = baseUrl + '/rooms';

  public getRooms(propertyId: string): Observable<Room[]> {
    return this.http.get<Room[]>(
      this.url + '/properties/' + propertyId + '/rooms',
      {}
    );
  }

  public insertRoom(propertyId: string): Observable<Room> {
    return this.http.post<Room>(
      this.url + '/properties/' + propertyId + '/rooms',
      {},
      {}
    );
  }

  public updateRoom(
    propertyId: string,
    roomId: string,
    update: UpdateRoom
  ): Observable<Room> {
    return this.http.patch<Room>(
      this.url + '/properties/' + propertyId + '/rooms/' + roomId,
      {},
      update
    );
  }

  public deleteRoom(propertyId: string, roomId: string): Observable<any> {
    return this.http.delete<any>(
      this.url + '/properties/' + propertyId + '/rooms/' + roomId,
      {}
    );
  }

  reorderImage(propertyId, roomId, imageId): Observable<Room> {
    return this.http.patch<Room>(
      this.url +
      '/properties/' +
      propertyId +
      '/rooms/' +
      roomId +
      '/images/' +
      imageId,
      {},
      {}
    );
  }
}
