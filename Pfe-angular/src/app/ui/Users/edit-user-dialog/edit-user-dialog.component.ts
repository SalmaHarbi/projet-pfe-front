import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Importez ReactiveFormsModule pour utiliser formGroup
    MatFormFieldModule, // Pour les champs de formulaire
    MatInputModule, // Pour les champs de saisie
    MatButtonModule, // Pour les boutons
    MatSelectModule, // Pour les listes déroulantes
    MatDialogModule // Pour les dialogues
  ],
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) {
    console.log('Données reçues pour l\'édition :', data); 
    this.userForm = this.fb.group({
      nom: [data?.nom || '', Validators.required],
      prenom: [data?.prenom || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      motDePasse: [data?.motDePasse || '', Validators.required],
      role: [data?.role || '', Validators.required]
    });
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value); 
    }
  }

  onCancel(): void {
    this.dialogRef.close(); 
  }
}
