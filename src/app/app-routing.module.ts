import { ExportComponent } from './export/export.component';
import { HomeComponent } from './home/home.component';
import { RegisterDetailComponent } from './register-detail/register-detail.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './service/auth.guard';
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: 'view/:email',  component: RegisterDetailComponent },
  { path: 'export',     component: ExportComponent },
  { path: 'home',     component: HomeComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,  {useHash: true}) ], 
  exports: [RouterModule ]
})

export class AppRoutingModule {

}
