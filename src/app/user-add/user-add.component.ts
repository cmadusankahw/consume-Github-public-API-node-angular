import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../userService.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  private userSub: Subscription;

  public error = '';
  public user :  {login: string, name: string, location: string, avatar_url: string};
  public username = '';


  constructor(private userService :UserService) { }

  ngOnInit() {

  }

  public search(username: string) {
    this.userService.getUser(username);
    this.userSub = this.userService.getUserUpdatedListener()
      .subscribe((res: any) => {
        console.log(res);
        this.user = res;
      });
  }

}
