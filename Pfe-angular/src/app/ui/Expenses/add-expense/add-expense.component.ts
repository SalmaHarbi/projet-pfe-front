import { Component,OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ExpenseService } from '../../../services/expense.service';

@Component({
  selector: 'app-add-expense',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule

  ],
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.css'
})
export class AddExpenseComponent implements OnInit{
noteForm!: FormGroup; 

  constructor(private fb: FormBuilder, private ExpenseService: ExpenseService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      datedepense: ['', Validators.required], 
      categorie: ['', Validators.required], 
      description: ['', Validators.required], 
      montant: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] , 
      montantconverti: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] , 
      nomfournisseur: ['', Validators.required], 
      indicateurfiscabilte: ['', [Validators.required]] 
    });
  }

  ajouterDepense(): void {
    if (this.noteForm.valid) {
      const depense = this.noteForm.value; 
      console.log("Dépense à ajouter:", depense);
      
      this.ExpenseService.addExpense(depense).subscribe({
        next: (response) => {
          console.log("Réponse du serveur:", response);
          
          this.snackBar.open('Dépense ajoutée avec succès!', 'Fermer', {
            duration: 3000, 
          });
  
          this.annuler(); 
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout de la dépense:", error);
          this.snackBar.open('Erreur lors de l\'ajout de la dépense.', 'Fermer', {
            duration: 3000,
          });
        }
      });
    } else {
      console.log("Formulaire invalide");
      this.snackBar.open('Veuillez remplir correctement tous les champs.', 'Fermer', {
        duration: 3000,
      });
    }
  }
  

  annuler(): void {
    this.noteForm.reset(); 
  }
}
