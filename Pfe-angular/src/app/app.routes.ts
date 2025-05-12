import { Routes } from '@angular/router';
import { LoginInterfaceComponent } from './ui/login-interface/login-interface.component';
import { HeaderComponent } from './ui/Manager/header/header.component';
import { HomeManagerComponent } from './ui/home-manager/home-manager.component'; 
import { FooterComponent } from './ui/footer/footer.component';
import { HomeEmployeeComponent } from './ui/home-employee/home-employee.component';
import { HomeAdminFinanceComponent } from './ui/home-admin-finance/home-admin-finance.component';
import { AboutUsComponent } from './ui/about-us/about-us.component';
import { UsersInterfaceComponent } from './ui/Users/users-interface/users-interface.component';
import { AddUserDialogComponent } from './ui/Users/add-user-dialog/add-user-dialog.component';
import { ExpenseReportComponent } from './ui/expenseReport/expense-report/expense-report.component';
import { ExpensesComponent } from './ui/Expenses/expense/expense.component';
import { DepartmentComponent } from './ui/Departments/department/department.component';
import { ExpensesEmployeeComponent } from './ui/Expenses/expenses-employee/expenses-employee.component';
import { NDFEmployeeComponent } from './ui/expenseReport/ndf-employee/ndf-employee.component';
import { AboutUsEmployeeComponent } from './ui/about-us-employee/about-us-employee.component';
import { TestComponent } from './ui/test/test.component';

export const routes: Routes = [
  { path: '', component: LoginInterfaceComponent }, 
  { path: 'header', component: HeaderComponent },
  { path: 'home-employee', component: HomeEmployeeComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'home-manager', component: HomeManagerComponent },
  { path: 'home-adminFinance', component: HomeAdminFinanceComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'users-interface', component: UsersInterfaceComponent },
  { path: 'add-user-dialog', component: AddUserDialogComponent },
  { path: 'expense-report', component: ExpenseReportComponent},
  { path: 'expense', component: ExpensesComponent},
  { path: 'department', component: DepartmentComponent},
  { path: 'expense-employee', component:ExpensesEmployeeComponent},
  { path: 'expense-report-employee', component:NDFEmployeeComponent},
  { path:'about-us-employee', component:AboutUsEmployeeComponent},
  {path:'test' , component:TestComponent},
  { path: '**', redirectTo: '' },
];

