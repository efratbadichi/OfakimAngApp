import { Component, OnInit } from '@angular/core';
import { UserModel } from './../core/userModel';
import { UsersDBService } from 'src/app/core/users-db.service';
import { Router } from '@angular/router';
import { UsersFileService } from '../core/users-file.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  allUsers: UserModel[] = new Array();

  displayedColumns: string[] = ['id', 'name', 'email', 'gender', 'phone', 'birthDate'];

  constructor(private service: UsersDBService/*UsersFileService*/, private router: Router) { }

  ngOnInit() {

    this.loadUsers();
  }

  loadUsers(): any {
    this.service.getAll().subscribe(
      (res: UserModel[]) => {
        debugger;
        this.allUsers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  back2home() {
    this.router.navigate(['/home']);
  }
}
