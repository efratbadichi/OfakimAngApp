import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from 'src/app/home/home.component';
import { MatInputModule, MatButtonModule, MatIconModule, MatCardModule, MatNativeDateModule, MatSelectModule, MatOptionModule, MatTableModule } from '@angular/material';
import { FormsModule, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersDBService } from 'src/app/core/users-db.service';
import { HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AllUsersComponent } from './all-users/all-users.component';
import { GenderPipe } from './core/gender.pipe';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: AllUsersComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AllUsersComponent,
    GenderPipe
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatOptionModule,
    NgxPaginationModule,
    MatTableModule
  ],
  providers: [
    UsersDBService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
