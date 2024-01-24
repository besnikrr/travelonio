import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { AppState } from './ngrx/reducers';
import { SnackBarService } from './ngrx/services/snackbar.service';
import { setPropertyUserSession } from './ngrx/actions/property-user.actions';
import { isPlatformBrowser } from '@angular/common';

export const baseUrl = environment.baseUrl;

export interface IHttpServiceConfig {
  tokenGetter: () => string;
  contentTypeHeader: string;
  acceptHeader: string;
  apiEndpoint: string;
  apiMockEndpoint: string;
  numberOfHttpRetries: number;
  useMockEndpointOnError: boolean;
  errorHandler: (error: HttpErrorResponse) => void;
}

function getToken(): string {
  try {
    return window.localStorage.getItem('jwt') as string;
  } catch (e) {
    return 'undefined';
  }
}

const httpServiceConfigDefaults: IHttpServiceConfig = {
  tokenGetter: () => getToken(),
  contentTypeHeader: 'application/json; charset=utf-8',
  acceptHeader: 'application/json; charset=utf-8',
  apiEndpoint: '',
  apiMockEndpoint: '',
  numberOfHttpRetries: 0,
  useMockEndpointOnError: false,
  errorHandler: (error: HttpErrorResponse) => console.error(error)
};

export interface IHttpServiceConfigOptional {
  tokenGetter?: () => string;
  contentTypeHeader?: string;
  acceptHeader?: string;
  apiEndpoint?: string;
  apiMockEndpoint?: string;
  numberOfHttpRetries?: number;
  useMockEndpointOnError?: boolean;
  errorHandler?: (error: HttpErrorResponse) => void;
}

type supportedHttpMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class HttpServiceConfig {
  private config: IHttpServiceConfig;

  constructor(config: IHttpServiceConfigOptional = {}) {
    this.config = { ...httpServiceConfigDefaults, ...config };
  }

  public getConfig(): IHttpServiceConfig {
    return this.config;
  }
}

@Injectable()
export class HttpService {
  private config: IHttpServiceConfig;
  private connectionInterrupted = new BehaviorSubject<boolean>(false);
  public connectionInterrupted$ = this.connectionInterrupted.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<AppState>,
    private snackBar: SnackBarService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    // INFO: make config injectable from outside if this service should be extracted to a separate npm-library...
    const options = new HttpServiceConfig({
      apiEndpoint: '',
      apiMockEndpoint: '',
      numberOfHttpRetries: 0,
      useMockEndpointOnError: false,
      errorHandler: (error: HttpErrorResponse) => {

        if (error.status === 0) {
        } else if (error.status === 401) {
          this.snackBar.openSnackBar(error.statusText, '');
          if (isPlatformBrowser(this.platformId)) {
            window.localStorage.removeItem('jwt');
          }
          this.store.dispatch(setPropertyUserSession(undefined));
          this.router.navigate(['/login'], {
            queryParams: { returnUrl: this.router.routerState.snapshot.url }
          });
        }
      }
    });
    this.config = options.getConfig();
  }

  getHeaders(withBody: boolean): HttpHeaders {
    const headers = new HttpHeaders()
      .set('Cache-Control', 'no-cache, no-store, must-revalidate')
      .set('Pragma', 'no-cache')
      .set('Expires', '0')
      .set('Authorization', httpServiceConfigDefaults.tokenGetter() || '');

    return withBody
      ? headers
        .set('Content-Type', httpServiceConfigDefaults.contentTypeHeader)
        .set('Accept', httpServiceConfigDefaults.acceptHeader)
      : headers;
  }

  getHeadersForUploads(withBody: boolean): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      httpServiceConfigDefaults.tokenGetter() || ''
    );
    // .set('Content-Type', 'multipart/form-hp-display-data')
    // .set('Accept', httpServiceConfigDefaults.acceptHeader);
  }

  // tslint:disable-next-line:typedef
  requestClosure<T>(
    method: supportedHttpMethods,
    path: string,
    body?: any,
    params?: HttpParams,
    headers?: HttpHeaders
  ) {
    return (endpoint: string): Observable<any> => {
      if (body && typeof body !== 'object') {
        if (typeof body === 'string') {
          body = '"' + body + '"';
        }
      }

      const options: any = {
        headers,
        params,
        responseType: 'json'
      };

      switch (method) {
        case 'GET':
          return this.http.get<T>(endpoint + path, options);
        case 'POST':
          return this.http.post<T>(endpoint + path, body, options);
        case 'PUT':
          return this.http.put<T>(endpoint + path, body, options);
        case 'PATCH':
          return this.http.patch<T>(endpoint + path, body, options);
        case 'DELETE':
          return this.http.delete<T>(endpoint + path, options);
        default:
          return this.http.get<T>(endpoint + path, options);
      }
    };
  }

  public getParams(queryParameters: any): HttpParams {
    let params = new HttpParams();

    for (const paramKey in queryParameters) {
      if (queryParameters.hasOwnProperty(paramKey)) {
        if (queryParameters[paramKey]) {
          params = params.set(
            paramKey,
            Array.isArray(queryParameters[paramKey])
              ? queryParameters[paramKey].join(',')
              : queryParameters[paramKey]
          );
        }
      }
    }

    return params;
  }

  public get<T>(
    path: string,
    queryParameters: any,
    disableDefaultHandling = false
  ): Observable<T> {
    return this.sendCallWithItbHandling<T>(
      this.requestClosure<T>(
        'GET',
        path,
        {},
        this.getParams(queryParameters),
        this.getHeaders(false)
      ),
      disableDefaultHandling
    );
  }

  public post<T>(
    path: string,
    queryParameters: any,
    body: any,
    disableDefaultHandling = false,
    attachment = false
  ): Observable<T> {
    return this.sendCallWithItbHandling<T>(
      this.requestClosure<T>(
        'POST',
        path,
        body,
        this.getParams(queryParameters),
        !attachment ? this.getHeaders(true) : this.getHeadersForUploads(true)
      ),
      disableDefaultHandling
    );
  }

  public put<T>(
    path: string,
    queryParameters: any,
    body: any,
    disableDefaultHandling = false
  ): Observable<T> {
    return this.sendCallWithItbHandling<T>(
      this.requestClosure<T>(
        'PUT',
        path,
        body,
        this.getParams(queryParameters),
        this.getHeaders(true)
      ),
      disableDefaultHandling
    );
  }

  public patch<T>(
    path: string,
    queryParameters: any,
    body: any,
    disableDefaultHandling = false
  ): Observable<T> {
    return this.sendCallWithItbHandling<T>(
      this.requestClosure<T>(
        'PATCH',
        path,
        body,
        this.getParams(queryParameters),
        this.getHeaders(true)
      ),
      disableDefaultHandling
    );
  }

  public delete<T>(
    path: string,
    queryParameters: any,
    disableDefaultHandling = false
  ): Observable<T> {
    return this.sendCallWithItbHandling<T>(
      this.requestClosure<T>(
        'DELETE',
        path,
        {},
        this.getParams(queryParameters),
        this.getHeaders(false)
      ),
      disableDefaultHandling
    );
  }

  public useMockBackend(
    useMockEndpointOnError: boolean,
    error: any,
    lastRequestMocked: boolean
  ): boolean {
    return (
      useMockEndpointOnError &&
      !lastRequestMocked &&
      (!error.status ||
        error.status === 0 ||
        error.status === 405 ||
        error.status >= 500 ||
        error.status === 404)
    );
  }

  public getEndpoint(mockFallback: boolean): string {
    return mockFallback ? this.config.apiMockEndpoint : this.config.apiEndpoint;
  }

  private sendCallWithItbHandling<T>(
    request: any,
    disableDefaultHandling: boolean,
    mockFallback: boolean = false,
    nrOfRetries: number = this.config.numberOfHttpRetries
  ): Observable<any> {
    return request(this.getEndpoint(mockFallback)).pipe(
      retry(nrOfRetries),
      tap(() => this.connectionInterrupted.next(false)),
      catchError((error: HttpErrorResponse) =>
        this.useMockBackend(
          this.config.useMockEndpointOnError,
          error,
          mockFallback
        )
          ? this.sendCallWithItbHandling<T>(
            request,
            disableDefaultHandling,
            true,
            0
          )
          : this.handleError(error, disableDefaultHandling)
      )
    );
  }

  private handleError(
    error: HttpErrorResponse,
    disableDefaultHandling: boolean
  ): Observable<Response> {
    this.connectionInterrupted.next(
      error.status === undefined || error.status === 0
    );
    if (!disableDefaultHandling) {
      this.config.errorHandler(error);
    }

    return throwError(error);
  }
}
