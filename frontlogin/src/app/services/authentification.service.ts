import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private curentUserSubject: BehaviorSubject<User>;
  public curentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.curentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('curentUser')));
    this.curentUser = this.curentUserSubject.asObservable();
   }

   public get curentUserValue(): User {
     return this.curentUserSubject.value;
   }
   register(user: User) {
    return this.http.post(`${environment.apiUrl}/user/register`, user);
}

   login(username: string, password:string) {
     return this.http.post<any>(`${environment.apiUrl}/user/authenticate`, {username, password})
      .pipe(map(user => {
        localStorage.setItem('curentUser', JSON.stringify(user));
        this.curentUserSubject.next(user);
        return user;
      }));
   }
    logout() {
      localStorage.removeItem('curentUser');
      this.curentUserSubject.next(null);
    }
    update(id, params) {
      return this.http.put(`${environment.apiUrl}/user/${id}`, params)
          .pipe(map(x => {
              // update stored user if the logged in user updated their own record
              if (id == this.curentUserValue.id) {
                  // update local storage
                  const user = { ...this.curentUserValue, ...params };
                  localStorage.setItem('user', JSON.stringify(user));

                  // publish updated user to subscribers
                  this.curentUserSubject.next(user);
              }
              return x;
          }));
  }

}
