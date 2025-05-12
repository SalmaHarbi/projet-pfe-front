import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ExpenseReportService} from '../../../services/expense-report.service';
import { HeaderEmployeeComponent } from '../../header-employee/header-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; 
import { UserDetailsDialogComponent } from '../user-details-dialog/user-details-dialog.component';
import { AddNdfComponent } from '../add-ndf/add-ndf.component';
import { EditNdfComponent } from '../edit-ndf/edit-ndf.component';
import { MatSort } from '@angular/material/sort'; 

@Component({
  selector: 'app-ndf-employee',
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
    MatSort
  ],
  templateUrl: './ndf-employee.component.html',
  styleUrl: './ndf-employee.component.css'
})
export class NDFEmployeeComponent implements OnInit{
  displayedColumns: string[] = ['titre', 'datesoumission','motifnotefrais', 'statut','commentaire','dateapprobationrejet', 'montanttotal', 'dépenses','action'];
  dataSource = new MatTableDataSource<any>();
  isMenuVisible = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private expenseService: ExpenseReportService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllExpenseReports();
  }

  getAllExpenseReports(): void {
    this.expenseService.getAll().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
this.dataSource.sort = this.sort;   
 });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ajouterDepense(ndf: any): void {
    this.dialog.open(UserDetailsDialogComponent, {
      width: '400px',
      data: {
        prenom: ndf.user.prenom,
        nom: ndf.user.nom,
        email: ndf.user.email,
        role: ndf.user.role
      }
    });
  }

  ajouterNoteDeFrais(): void {
     this.dialog.open(AddNdfComponent, {
          width: '800px', 
          data: {} 
        })
  }

  editNdf(ndf: any): void {
    console.log('Editing NDF with ID:', ndf.id); 
    const dialogRef = this.dialog.open(EditNdfComponent, {
      width: '800px',
      data: { ...ndf }  
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Returned data:', result); 
        this.expenseService.updateNoteDeFrais(ndf.id, result).subscribe({
          next: (response) => {
            console.log('Note de frais mise à jour avec succès:', response);
            this.getAllExpenseReports();
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
          }
        });
      }
    });
  }
  
  
  deleteNdf(ndf: any): void {
    const confirmation = confirm(`Supprimer la note de frais : ${ndf.titre} ?`);
    if (confirmation) {
      console.log('Suppression de la note de frais :', ndf);
      this.expenseService.deleteNoteDeFrais(ndf.id).subscribe({
        next: (response: any) => {  
          console.log('Note de frais supprimée avec succès:', response);
          this.getAllExpenseReports();
        },
        error: (error: any) => {  
          console.error('Erreur lors de la suppression:', error);
        }
      });
    }
  }}
