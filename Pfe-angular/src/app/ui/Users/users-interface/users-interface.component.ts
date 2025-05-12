import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importez CommonModule
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../Manager/header/header.component';
import { FooterComponent } from '../../footer/footer.component';
import { UserService } from '../../../services/user.services';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'; // Importez MatDialogModule et MatDialog
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component'; // Importez le composant
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Assurez-vous d'importer le composant de dialogue de confirmation
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';


@Component({
  selector: 'app-users-interface',
  standalone: true,
  imports: [
    CommonModule, // Ajoutez CommonModule ici
    HeaderComponent,
    FooterComponent,
    MatPaginator,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule ,
    AddUserDialogComponent // Ajoutez le composant ici

  ],
  templateUrl: './users-interface.component.html',
  styleUrls: ['./users-interface.component.css']
})
export class UsersInterfaceComponent implements OnInit {
  isMenuVisible = true; // Contrôle la visibilité du menu

  displayedColumns: string[] = ['nom', 'prenom', 'email', 'role', 'action']; // Colonnes du tableau
  dataSource = new MatTableDataSource<any>(); // Source de données pour le tableau

  @ViewChild(MatPaginator) paginator!: MatPaginator; // Référence au paginator

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();

    // Configurez une fonction de filtrage personnalisée
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const searchTerm = filter.trim().toLowerCase();
      return (
        data.nom.toLowerCase().includes(searchTerm) || // Recherche par nom
        data.prenom.toLowerCase().includes(searchTerm) || // Recherche par prénom
        data.email.toLowerCase().includes(searchTerm) // Recherche par email
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // Connectez le paginator au tableau
  }

  fetchUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.dataSource.data = data; // Chargez les données récupérées dans le tableau
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
      }
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue; 
  }

  toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible; 
  }

  addUser(): void {
    this.dialog.open(AddUserDialogComponent, {
      width: '500px', 
      data: {} 
    })}

  editUser(user: any): void {
     console.log('Editing user information with ID:', user.id); 
                const dialogRef = this.dialog.open(EditUserDialogComponent, {
                  width: '800px',
                  data: { ...user }  
                });
              
                dialogRef.afterClosed().subscribe(result => {
                  if (result) {
                    console.log('Returned data:', result); 
                    this.userService.updateUser(user.id, result).subscribe({
                      next: (response) => {
                        console.log('user mise à jour avec succès:', response);
                        this.fetchUsers();
                      },
                      error: (error) => {
                        console.error('Erreur lors de la mise à jour:', error);
                      }
                    });
                  }
                });
          }

  deleteUser(user: any): void {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
              width: '350px',
              data: { message: `Etes vous sure de supprimer l'employee suivant ?` }
            });
          
            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                this.userService.deleteUser(user.id).subscribe({
                  next: () => {
                    console.log('utilisateur supprimée avec succès');
                    this.fetchUsers();
                  },
                  error: (error) => {
                    console.error('Erreur lors de la suppression:', error);
                  }
                });
              }
            });
}}