import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwPageComponent } from './twitter-page/tw-page.component';
import { HomeComponent } from './home/home.component';
import { SpeakersComponent } from './speakers/speakers.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'tweets', component: TwPageComponent },
  { path: 'speakers', component: SpeakersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
