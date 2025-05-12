import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ExpenseService } from '../../services/expense.service';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-test',
  standalone: true,
  imports:[
MatTableModule,
MatSortModule,
CommonModule
  ],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  displayedColumns: string[] = [
    'datedepense',
    'categorie',
    'description',
    'montant',
    'montantconverti',
    'nomfournisseur',
    'indicateurfiscabilte'
    
  ];

  dataSource = new MatTableDataSource<any>();
  isLoading = true;
  errorMessage = '';

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.getExpenses();
  }

  getExpenses(): void {
    this.expenseService.getAll().subscribe({
      next: (data) => {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement des dépenses.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}
