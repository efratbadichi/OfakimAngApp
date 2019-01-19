import { Injectable } from '@angular/core';
import { HttpParams, HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserModel } from './userModel';
import { environment } from 'src/environments/environment';
import * as _ from 'lodash';
import { GenderPipe } from './gender.pipe';

@Injectable({
  providedIn: 'root'
})
export class UsersFileService {

  users: UserModel[];

  constructor(private http: HttpClient) { }

  addUser(userObj: UserModel): Observable<any> {

    let request = {
      user: {
        FullName: userObj.name,
        Email: userObj.email,
        BirthDate: userObj.birthDate.toLocaleDateString(),
        PhoneNumber: userObj.phone,
        Gender: new GenderPipe().transform(userObj)
      }
    };

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')//application/json')
      .set('Accept', 'application/json')

    return this.http.post(environment.ofakimAPI + 'usersfile', this.encodeUrlParams(request.user), { headers: headers })
      .pipe(map((res) => {
        debugger;
        return res;
      }),
        catchError(this.handleError));


  }

  getAll(): Observable<UserModel[]> {
    return this.http.get(environment.ofakimAPI + '/usersfile').pipe(
      map((res: any[]) => {
        debugger;
        if (res != null && res.length > 0) {
          this.users = res.map(function (item) {
            return {
              id: item.Id,
              name: item.FullName,
              email: item.Email,
              birthDate: item.BirthDate,
              phone: item.PhoneNumber,
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

  //encoded params that sending to server
  //on server side will get it in POST method as [FormBody] paramter
  public encodeUrlParams(data) {
    var body = new HttpParams();
    _.forEach(data, (value, key) => {
      body = body.append(key, value)

    })
    return body;
  }

}
