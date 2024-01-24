import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, HttpService } from '../../http.service';

@Injectable()
export class AttachmentsService {
  constructor(private http: HttpService) {
  }

  private url = baseUrl + '/attachments';

  public insertPropertyImage(
    propertyId: string,
    file: File
  ): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<string>(
      this.url + '/properties/' + propertyId + '/images',
      {},
      formData,
      false,
      true
    );
  }

  public insertRoomImage(
    propertyId: string,
    roomId: string,
    file: File
  ): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);

    return this.http.post<string>(
      this.url + '/properties/' + propertyId + '/images?roomId=' + roomId,
      {},
      formData,
      false,
      true
    );
  }

  public deletePropertyImage(
    propertyId: string,
    roomId: string | undefined,
    imageId: string
  ): Observable<string> {
    const roomIdParam = roomId ? '?roomId=' + roomId : '';
    return this.http.delete<string>(
      this.url +
      '/properties/' +
      propertyId +
      '/images/' +
      imageId +
      roomIdParam,
      {}
    );
  }
}
