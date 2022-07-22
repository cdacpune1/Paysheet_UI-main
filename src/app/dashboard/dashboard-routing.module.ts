import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AuthGuard } from '../shared/auth.guard';
import { EmployeeComponent } from './pages/employee/employee/employee.component';
import { PermissionComponent } from './pages/permission/permission.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { RoleComponent } from './pages/role/role.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { WrapperComponent } from './pages/wrapper/wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'wrapper',
    canActivate: [AuthGuard],
    component: WrapperComponent,
    children: [
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'permission',
        component: PermissionComponent
      },
      {
        path: 'role',
        component: RoleComponent
      },
      {
        path: 'projects',
        component: ProjectsComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      },

    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
