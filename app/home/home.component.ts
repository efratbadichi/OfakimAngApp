import { UserModel } from '../core/userModel';
import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { UsersDBService } from '../core/users-db.service';
import { DateAdapter } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UsersFileService } from '../core/users-file.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectFormControl = new FormControl('', Validators.required);
  userModel = new UserModel(1, '', '', null, -1, '');

  constructor(private usersService: UsersDBService/*UsersFileService*/, private adapter: DateAdapter<any>, private router: Router) { }

  ngOnInit() {
    this.adapter.setLocale('he');
  }

  onSubmit() {
    this.usersService.addUser(this.userModel).subscribe((res: any) => {
      if (res.Id > 0)
        this.move2users();
    });
  }

  getCurrentModel() {
    return JSON.stringify(this.userModel) + " <br/>" + (this.userModel.birthDate != null ? this.userModel.birthDate.toLocaleDateString() : "null");
  }

  move2users() {
    this.router.navigate(["/users"]);
  }
}
