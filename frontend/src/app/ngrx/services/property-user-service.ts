import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LoginPropertyUser,
  PropertyUser,
  PropertyUserSession,
  RegisterPropertyUser,
  UserData,
} from '../actions/action-models';
import { baseUrl, HttpService } from '../../http.service';

@Injectable()
export class PropertyUsersService {
  constructor(private http: HttpService) {}

  private url = baseUrl + '/users';

  public registerPropertyUser(
    propertyUserData: RegisterPropertyUser
  ): Observable<PropertyUser> {
    return this.http.post<PropertyUser>(
      this.url + '/register',
      {},
      propertyUserData
    );
  }

  public loginPropertyUser(
    loginUserData: LoginPropertyUser
  ): Observable<PropertyUserSession> {
    return this.http.post<PropertyUserSession>(
      this.url + '/login',
      {},
      loginUserData
    );
  }

  public checkPropertyUserSession(): Observable<PropertyUserSession> {
    return this.http.get<PropertyUserSession>(this.url + '/session', {});
  }

  logoutPropertyUser(): Observable<any> {
    return this.http.post<any>(this.url + '/logout', {}, {});
  }

  confirmEmail(link: string): Observable<string> {
    return this.http.get<string>(link, {});
  }

  public sendRecoveryLink(email: string): Observable<string> {
    return this.http.post<string>(this.url + '/forgotPassword', {}, { email });
  }

  changePassword(
    userId,
    newPassword: any,
    token
  ): Observable<PropertyUserSession> {
    return this.http.post<PropertyUserSession>(
      this.url + '/resetPassword',
      {},
      { userId, resetPasswordToken: token, newPassword }
    );
  }

  updateSelf(language?: string): Observable<UserData> {
    return this.http.patch<UserData>(this.url + '/self', {}, { language });
  }
}
