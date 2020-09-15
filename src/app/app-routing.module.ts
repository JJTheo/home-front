import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowcaseComponent } from './components/showcase/showcase.component';

const routes: Routes = [
  { path: '', redirectTo: '/showcase', pathMatch:'full' },
  { path: 'showcase', component: ShowcaseComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
