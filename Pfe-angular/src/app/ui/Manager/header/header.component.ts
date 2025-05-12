import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileDialogComponent } from '../../profile-dialog/profile-dialog.component';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    RouterModule, // Pour les icônes
    MatButtonModule, // Pour les boutons
    MatMenuModule, // Pour les menus
    MatDividerModule // Pour les séparateurs
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>(); // Émet un événement pour basculer le menu
  currentUser: any;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    console.log('Utilisateur connecté :', this.currentUser);
  }

  onToggleMenu(): void {
    this.toggleMenu.emit(); // Émet l'événement pour le parent
  }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '500px',
      data: { user: this.currentUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentUser = result; // Met à jour les informations de l'utilisateur
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}