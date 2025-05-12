import { Component,OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { ExpenseReportService } from '../../../services/expense-report.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common'; // Importer CommonModule ici
@Component({
  selector: 'app-add-ndf',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    CommonModule
    
  ],
  templateUrl: './add-ndf.component.html',
  styleUrl: './add-ndf.component.css'
})
export class AddNdfComponent  implements OnInit {

  noteForm!: FormGroup; 

  constructor(private fb: FormBuilder, private noteDeFraisService: ExpenseReportService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.noteForm = this.fb.group({
      titre: ['', Validators.required], 
      datesoumission: ['', Validators.required], 
      motifnotefrais: ['', Validators.required], 
      statut: ['', Validators.required], 
      commentaire: ['', Validators.required], 
      dateapprobationrejet: ['', Validators.required], 
      montanttotal: ['', [Validators.required, Validators.pattern('^[0-9]*$')]] 
    });
  }

  ajouterNoteDeFrais(): void {
    if (this.noteForm.valid) {
      const noteDeFrais = this.noteForm.value; 
      console.log("Note de frais à ajouter:", noteDeFrais);
      
      this.noteDeFraisService.addNoteDeFrais(noteDeFrais).subscribe({
        next: (response) => {
          console.log("Réponse du serveur:", response);
          
          this.snackBar.open('Note de frais ajoutée avec succès!', 'Fermer', {
            duration: 3000, 
          });
  
          this.annuler(); 
        },
        error: (error) => {
          console.error("Erreur lors de l'ajout de la note de frais:", error);
          this.snackBar.open('Erreur lors de l\'ajout de la note de frais.', 'Fermer', {
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