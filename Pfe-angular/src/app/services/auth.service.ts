import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  realm_access: {
    roles: string[];
  };
  email: string; // Ajoutez les champs nécessaires selon votre token
  given_name: string;
  family_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8888/MSUSER/auth/login'; 
  private logoutUrl = 'http://localhost:8888/MSUSER/auth/logout';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post(this.apiUrl, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      withCredentials: true  
    });
  }

  handleLoginSuccess(token: string) {
    localStorage.setItem('access_token', token);

    const decodedToken = jwtDecode<DecodedToken>(token);
    const roles = decodedToken.realm_access.roles;

    if (roles.includes('Manager')) {
      this.router.navigate(['/home-manager']);
    } else if (roles.includes('Employee')) {
      this.router.navigate(['/home-employee']);
    } else if (roles.includes('AdminFinance')) {
      this.router.navigate(['/home-adminFinance']);
    } else {
      this.router.navigate(['/unauthorized']);
    }
  }

  // Nouvelle méthode pour récupérer les informations de l'utilisateur connecté
  getCurrentUser(): DecodedToken | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      return jwtDecode<DecodedToken>(token);
    }
    return null;
  }

  logout(): void {
    console.log('Calling logout API'); // Vérifiez si ce message s'affiche dans la console
    this.http.post(this.logoutUrl, {}, { withCredentials: true }).subscribe({
      next: () => {
        console.log('Déconnexion réussie');
        localStorage.removeItem('access_token'); // Supprimez le token localement
        this.router.navigate(['/']); // Redirigez vers la page de connexion
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion :', err);
        localStorage.removeItem('access_token'); // Supprimez le token même en cas d'erreur
        this.router.navigate(['/']); // Redirigez vers la page de connexion
      }
    });
  }
}
