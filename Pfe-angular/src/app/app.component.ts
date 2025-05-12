import { Component } from '@angular/core';
import { RouterModule , Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginInterfaceComponent } from './ui/login-interface/login-interface.component';
import { ConfirmDialogComponent } from './ui/Users/confirm-dialog/confirm-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service'; 
import { MatNativeDateModule,NativeDateAdapter  } from '@angular/material/core';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    LoginInterfaceComponent,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    ConfirmDialogComponent,
    MatNativeDateModule
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },  // Optionnel pour localisation
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pfe-angular';

  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout(); // Appelle la méthode de déconnexion
  }
}
