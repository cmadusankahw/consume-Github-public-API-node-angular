import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class UserService {
  // Observer Pattern : Listeners for Subjects
  private userUpdated = new Subject<{login: string, name: string, location: string, avatar_url: string}>();
  private usersUpdated = new Subject<{login: string, name: string, location: string, avatar_url: string}[]>();


  // to render selected product
  private user:  {login: string, name: string, location: string, avatar_url: string};
  // to render selected product
  private users:  {login: string, name: string, location: string, avatar_url: string}[] = [];
  // api url
  private url = "http:/localhost:5000/api/users/";


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  public getUser(username: string) {
    this.http
    .get(
      "https://api.github.com/users/" + username
    )
    .subscribe((userList: {login: string, name: string, location: string, avatar_url: string}) => {
      this.user = userList;
      this.userUpdated.next(this.user);
    });
  }

  public getUsers() {
    this.http
      .get<{ message: string; users:  {id: string, name: string, location: string, avatar_url: string}[] }>(
        this.url + 'get/all'
      )
      .subscribe((userList) => {
        this.users = userList.users;
        this.usersUpdated.next([...this.users]);
      });
  }

  // add new product
  public addUser(user: {id: string, name: string, location: string, avatar_url: string}) {
        this.http
          .post<{ message: string}>(
            this.url + 'add',
            user
          )
          .subscribe((recievedData) => {
            console.log(recievedData.message);
          });
  }

  // update product
  public updateUser(user: {id: string, name: string, location: string, avatar_url: string}) {
    this.http
    .post<{ message: string}>(
      this.url + 'update',
      user
    )
    .subscribe((recievedData) => {
      console.log(recievedData.message);
    });
  }



  // remove product
  public removeProduct(userId: string) {
    this.http
      .delete<{ message: string }>(this.url + 'remove/' + userId)
      .subscribe((recievedData) => {
        console.log(recievedData.message);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/users']);
      });
  }

  public getUserUpdatedListener() {
    return this.userUpdated.asObservable();
  }

  public getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }

}
