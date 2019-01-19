import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { UserModel } from './userModel';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import * as _ from 'lodash';


interface IServerResponse {
  items: string[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersDBService {

  users: UserModel[];

  constructor(private http: HttpClient) { }

  addUser(userObj: UserModel): Observable<any> {

    let request = {
      user: {
        FullName: userObj.name,
        Email: userObj.email,
        BirthDate: userObj.birthDate.toLocaleDateString(),
        Phone: userObj.phone,
        Gender: userObj.gender
      }
    };

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')

    return this.http.post(environment.ofakimAPI + 'users', JSON.stringify(request.user), { headers: headers })
      .pipe(map((res) => {
        return res;
      }),
        catchError(this.handleError));


  }

  getAll(): Observable<UserModel[]> {
    return this.http.get(environment.ofakimAPI + '/users').pipe(
      map((res: any[]) => {
        if (res != null && res.length > 0) {
          this.users = res.map(function (item) {
            return {
              id: item.Id,
              name: item.FullName,
              email: item.Email,
              birthDate: item.BirthDate,
              phone: item.Phone,
              gender: item.Gender
            };
          });

        }
        return this.users;
      }),
      catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse) {
    console.log(error);
    // return an observable with a user friendly message
    return throwError('Error occured. pls try again later..');
  }

 

}
