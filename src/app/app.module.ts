import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './service/register.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CKEditorModule } from 'ng2-ckeditor'; 
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { RegisterDetailComponent } from './register-detail/register-detail.component';
import { SessionService } from './service/session.service';
import { ExportComponent } from './export/export.component';
import { AuthenticationService } from './service/authentication.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './service/auth.guard';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisterDetailComponent,
    ExportComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, 
    ReactiveFormsModule, 
    HttpModule,
    CKEditorModule,
    AppRoutingModule,
    FormsModule, 
    PaginationModule.forRoot()
  ],
  providers: [RegisterService, SessionService, AuthenticationService, AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
