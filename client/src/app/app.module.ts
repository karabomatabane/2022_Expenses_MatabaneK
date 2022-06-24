import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ExpenseListComponent } from './expenses/expense-list/expense-list.component';
import { ExpenseDetailComponent } from './expenses/expense-detail/expense-detail.component';
import { ContactComponent } from './contact/contact.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ExpenseEditComponent } from './modals/expense-edit/expense-edit.component';
import { ExpenseAddComponent } from './modals/expense-add/expense-add.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DatePipe, DecimalPipe } from '@angular/common';
import { DateInputComponent } from './_forms/date-input/date-input.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ExpenseListComponent,
    ExpenseDetailComponent,
    ContactComponent,
    DisclaimerComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ExpenseEditComponent,
    ExpenseAddComponent,
    TextInputComponent,
    DateInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    DatePipe, DecimalPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
