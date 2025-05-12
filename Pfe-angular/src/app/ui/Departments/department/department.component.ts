import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DepartmentService } from '../../../services/department.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { HeaderComponent } from '../../Manager/header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { UserListDialogComponent } from '../user-list-dialog/user-list-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule
  ],
  templateUrl: './department.component.html',
  styleUrl: './department.component.css'
})
export class DepartmentComponent implements OnInit {
  displayedColumns: string[] = ['nom', 'centredecout', 'utilisateurs'];
  dataSource = new MatTableDataSource<any>();
  isMenuVisible = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private departmentService: DepartmentService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllDepartment();
  }

  getAllDepartment(): void {
    this.departmentService.getAll().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  openUserListDialog(users: any[]): void {
    this.dialog.open(UserListDialogComponent, {
      width: '800px',
      data: users
    });
  }
  
}
