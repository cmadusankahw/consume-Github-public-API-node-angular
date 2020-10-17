import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private usersSub: Subscription;

  public users :  {login: string, name: string, location: string, avatar_url: string}[] = [];

  constructor() { }

  ngOnInit() {

  }

}
