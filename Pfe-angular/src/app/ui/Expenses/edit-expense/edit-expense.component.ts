import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
 
@Component({
  selector: 'app-edit-expense',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css'
})
export class EditExpenseComponent {
  editForm: FormGroup;
  id: number;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Data received in EditExpenseComponent:', data); 
    this.id = data.id; 
    this.editForm = this.fb.group({
      datedepense: [data.datedepense, Validators.required],
      categorie: [data.categorie, Validators.required],
      description: [data.description, Validators.required],
      montant: [data.montant, Validators.required],
      montantconverti: [data.montantconverti, Validators.required],
      nomfournisseur: [data.nomfournisseur, Validators.required],
      indicateurfiscabilte: [data.indicateurfiscabilte, Validators.required],

    });
  }

  save(): void {
    if (this.editForm.valid && this.id) { 
      console.log('ID:', this.id);
      console.log('Form Values:', this.editForm.value);
      this.dialogRef.close({ id: this.id, ...this.editForm.value });
    } else {
      console.error('ID is missing or form is invalid');
    }
  }
  cancel(): void {
    this.dialogRef.close();  // Fermer sans enregistrer
  }
}
