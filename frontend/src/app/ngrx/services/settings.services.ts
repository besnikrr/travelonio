import { Injectable } from '@angular/core';
import { baseUrl, HttpService } from '../../http.service';
import { Observable } from 'rxjs';
import { MunicipalityInfo } from '../../atomic-design/pages/sign-up/model/locations';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class SettingsServices {
  constructor(private http: HttpService) {}

  private url = baseUrl;

  public getLocations(queryParam?: string): Observable<MunicipalityInfo[]> {
    return this.http.get<MunicipalityInfo[]>(
      this.url +
        '/properties/locations' +
        (queryParam ? '?place=' + queryParam : ''),
      {}
    );
  }

  public getIp(): Observable<{ country_code2: string; ip: string }> {
    return this.http.get<{
      country_code2: string;
      ip: string;
    }>(
      'https://api.ipgeolocation.io/ipgeo?apiKey=f125cbb71329471fa8ebd634ac77ebbd&fields=country_code2',
      {}
    );
  }

  public getDestinationsCloseToYou(): Observable<any> {
    return this.getIp().pipe(
      mergeMap((client) => {
        return this.http.get<any>(
          this.url +
            '/properties/closeToYou?countryCode=' +
            client.country_code2,
          {}
        );
      })
    );
  }
}
