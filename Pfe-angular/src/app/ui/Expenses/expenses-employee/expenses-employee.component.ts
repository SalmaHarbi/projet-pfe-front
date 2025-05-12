import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HeaderEmployeeComponent } from '../../header-employee/header-employee.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'; 
import { CommonModule } from '@angular/common'; 
import { ExpenseService } from '../../../services/expense.service';
import { ExpenseDetailsDialogComponent } from '../expense-details-dialog/expense-details-dialog.component';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { EditExpenseComponent } from '../edit-expense/edit-expense.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-expenses-employee',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    HeaderEmployeeComponent,
    ExpenseDetailsDialogComponent ,
    ConfirmationDialogComponent
  ],
  templateUrl: './expenses-employee.component.html',
  styleUrl: './expenses-employee.component.css'
})
export class ExpensesEmployeeComponent implements OnInit{
  displayedColumns: string[] = ['datedepense', 'categorie','description','montant','montantconverti','nomfournisseur','indicateurfiscabilte', 'notedefrais', 'action'];
  dataSource = new MatTableDataSource<any>();
  isMenuVisible = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private expenseService: ExpenseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllExpenses();
  }

  getAllExpenses(): void {
    this.expenseService.getAll().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showExpenseDetails(ndfs: any) {
    this.dialog.open(ExpenseDetailsDialogComponent, {
      width: '800px',
      data: ndfs
    });}

    /*showJustifDetails(ndfs:any){
      this.dialog.open(JustificatifComponent,{
      width: '800px',
      data: ndfs
    });}
*/
    
      addExpense(): void {
          this.dialog.open(AddExpenseComponent, {
                  width: '800px', 
                  data: {} 
                })
      }
    
      editExpense(expense: any): void {
          console.log('Editing expense with ID:', expense.id); 
            const dialogRef = this.dialog.open(EditExpenseComponent, {
              width: '800px',
              data: { ...expense }  
            });
          
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                console.log('Returned data:', result); 
                this.expenseService.updateExpense(expense.id, result).subscribe({
                  next: (response) => {
                    console.log('Depense mise à jour avec succès:', response);
                    // Recharger les données
                    this.getAllExpenses();
                  },
                  error: (error) => {
                    console.error('Erreur lors de la mise à jour:', error);
                  }
                });
              }
            });
      }
    
      deleteExpense(expense: any): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '350px',
          data: { message: `Supprimer la dépense  ?` }
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.expenseService.deleteExpense(expense.id).subscribe({
              next: () => {
                console.log('Dépense supprimée avec succès');
                this.getAllExpenses();
              },
              error: (error) => {
                console.error('Erreur lors de la suppression:', error);
              }
            });
          }
        });
      }
    
    }

