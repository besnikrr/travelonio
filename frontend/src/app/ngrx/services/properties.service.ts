import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, HttpService } from '../../http.service';
import { Property } from '../reducers/properties.reducers';
import { mapToUpdateProperty, UpdatePropertyData } from '../../atomic-design/pages/sign-up/model/sign-up.data';
import { PropertyRequestData, PropertySummaryInfo } from '../../shared/interfaces/property';

@Injectable()
export class PropertiesService {
  constructor(private http: HttpService) {
  }

  private url = baseUrl + '/properties';

  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.url, {});
  }

  public getPropertyList(body: PropertyRequestData): Observable<PropertySummaryInfo[]> {
    return this.http.post<PropertySummaryInfo[]>(this.url + '/search', {}, body);
  }

  public getProperty(propertyId: string): Observable<Property> {
    return this.http.get<Property>(this.url + '/' + propertyId, {});
  }

  public getPublicProperty(propertyId: string): Observable<Property> {
    return this.http.get<Property>(this.url + '/' + propertyId + '/review', {});
  }

  public insertProperty(): Observable<{ id: string }> {
    return this.http.post<{ id: string }>(this.url, {}, {});
  }

  public updateProperty(
    propertyId: string,
    update: UpdatePropertyData
  ): Observable<Property> {
    const body = mapToUpdateProperty(update);
    return this.http.patch<Property>(this.url + '/' + propertyId, {}, body);
  }

  public deleteProperty(propertyId: string): Observable<any> {
    return this.http.delete<any>(this.url + '/' + propertyId, {});
  }

  reorderImage(propertyId, imageId): Observable<Property> {
    return this.http.patch<Property>(
      this.url + '/' + propertyId + '/images/' + imageId,
      {},
      {}
    );
  }
}
