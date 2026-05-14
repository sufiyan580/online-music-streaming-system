import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SongListComponent } from './song-list/song-list.component';
import { FilterPipe } from './filter.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AppRoutingModule } from './app-routing.module';
import { HomeLayoutComponent } from './home-layout/home-layout.component'; // ✅ ROUTING

@NgModule({
  declarations: [
    AppComponent,
    SongListComponent,
    FilterPipe,
    LoginComponent,
    RegisterComponent,
    HomeLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule   // ✅ REQUIRED FOR router-outlet
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
