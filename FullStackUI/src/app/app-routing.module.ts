import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { ModalComponentComponent } from './components/modal-component/modal-component.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'Home',
    pathMatch: 'full',
  },
  {
    path: 'Home',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'Employee',
    component: EmployeeComponent,
    data: {
      title: 'Employee'
    }
  },
  {
    path: 'Details',
    component: ModalComponentComponent,
    data: {
      title: 'Details'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
