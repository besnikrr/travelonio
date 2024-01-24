import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl, HttpService } from '../../http.service';
import { Bed } from '../reducers/beds.reducers';

@Injectable()
export class BedService {
  constructor(private http: HttpService) {
  }

  private url = baseUrl + '/beds';

  public getBeds(): Observable<Bed[]> {
    return this.http.get<Bed[]>(this.url, {});
  }
}
