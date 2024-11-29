import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './pages/profile/profile.component';
import { EnfantsComponent } from './pages/enfants/enfants.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'enfants', component: EnfantsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
