import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../services/user.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importez MatSnackBar et MatSnackBarModule

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSnackBarModule // Ajoutez MatSnackBarModule ici
  ],
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.css']
})
export class AddUserDialogComponent {
  userForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private snackBar: MatSnackBar, // Injectez MatSnackBar
    @Inject(MAT_DIALOG_DATA) public data: any // Données passées au formulaire
  ) {
    // Initialisation du formulaire avec les données existantes ou des valeurs par défaut
    this.userForm = this.fb.group({
      nom: [data?.nom || '', Validators.required],
      prenom: [data?.prenom || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      motDePasse: [data?.motDePasse || '', Validators.required],
      role: [data?.role || '', Validators.required]
    });
  }

  // Gestion du fichier photo
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  // Enregistrement des données
  onSave(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;

      // Ajoutez une valeur par défaut pour le champ photo si nécessaire
      if (!user.photo) {
        user.photo = 'string.png';
      }

      this.userService.addUser(user).subscribe({
        next: (response) => {
          console.log('Utilisateur ajouté avec succès', response);
          this.snackBar.open('Utilisateur ajouté avec succès', 'Fermer', {
            duration: 3000, // Durée d'affichage en millisecondes
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.dialogRef.close(true); // Fermez le dialogue avec succès
        },
        error: (err) => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur', err);
          this.snackBar.open('Erreur lors de l\'ajout de l\'utilisateur', 'Fermer', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Ferme le dialogue sans rien retourner
  }
}
