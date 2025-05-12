import { Component, Inject, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort'; // Correct import
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-expense-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginator,
    MatSort,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './expense-details-dialog.component.html',
  styleUrls: ['./expense-details-dialog.component.css']
})
export class ExpenseDetailsDialogComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['titre', 'datesoumission', 'statut'];
  
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort; 
  
    constructor(@Inject(MAT_DIALOG_DATA) public data: any[]) {}
  
    ngOnInit(): void {
      if (this.data && this.data.length) {
        this.dataSource = new MatTableDataSource(this.data);
      }
    }
  
    ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  
    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }