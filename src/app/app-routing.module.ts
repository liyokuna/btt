import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwPageComponent } from './twitter-page/tw-page.component';

const routes: Routes = [
  { path: 'twitter', component: TwPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
