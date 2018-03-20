import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes, LoadChildren } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

// Root Component
import { AppComponent } from './app.component';

// Common Component
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { MainComponent } from './common/main.component';

// Login Component
import { LoginComponent } from './member/login/login.component';
import { SignupComponent } from './member/signup/signup.component';

// NotFound Component
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', component: NotfoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    MainComponent,
    NotfoundComponent
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, RouterModule.forRoot(routes, { useHash: false })],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
