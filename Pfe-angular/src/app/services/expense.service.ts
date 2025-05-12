import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private apiUrl = 'http://localhost:8888/MSEXPENSE/depense';
  
  constructor(private http: HttpClient) {}
  
  getAll(): Observable<any[]> {
    return this.http.get(`${this.apiUrl}/getAll`, { responseType: 'text' }).pipe(
      map(text => {
        // Tenter de nettoyer le JSON récursif mal formé
        const cleanedJson = this.cleanRecursiveJson(text);
        console.log('JSON nettoyé:', cleanedJson.substring(0, 200) + '...');
        return JSON.parse(cleanedJson);
      }),
      tap(data => console.log('Données traitées:', data.length, 'éléments')),
      catchError(this.handleError)
    );
  }
  
  // Méthode pour nettoyer le JSON récursif qui cause des problèmes
  private cleanRecursiveJson(jsonText: string): string {
    // 1. Compter les occurrences de "justificatifs": [
    const justificatifMatches = jsonText.match(/"justificatifs":\s*\[/g);
    const depthLevel = justificatifMatches ? justificatifMatches.length : 0;
    
    console.log(`Détecté ${depthLevel} niveaux de récursion "justificatifs"`);
    
    if (depthLevel <= 1) {
      // Si pas de récursion excessive, retourner tel quel
      return jsonText;
    }
    
    // 2. Limiter la récursion pour éviter la boucle infinie
    let result = jsonText;
    let depth = 0;
    let startPos = 0;
    
    while (startPos < result.length) {
      // Trouver la position du pattern "justificatifs": [
      const justificatifsPos = result.indexOf('"justificatifs":', startPos);
      if (justificatifsPos === -1) break;
      
      // Trouver l'ouverture du tableau
      const arrayStartPos = result.indexOf('[', justificatifsPos);
      if (arrayStartPos === -1) break;
      
      depth++;
      
      // Si nous sommes au 2ème niveau ou plus, simplifier
      if (depth > 1) {
        // Trouver la fin correspondante du tableau
        let openBrackets = 1;
        let arrayEndPos = arrayStartPos + 1;
        
        while (openBrackets > 0 && arrayEndPos < result.length) {
          if (result[arrayEndPos] === '[') openBrackets++;
          if (result[arrayEndPos] === ']') openBrackets--;
          arrayEndPos++;
        }
        
        if (arrayEndPos < result.length) {
          // Remplacer le contenu récursif par un tableau vide
          result = result.substring(0, arrayStartPos + 1) + ']' + result.substring(arrayEndPos);
          console.log(`Nettoyage du niveau ${depth} de récursion`);
        }
      }
      
      startPos = justificatifsPos + 1;
    }
    
    // 3. Vérifier si le JSON est valide après modification
    try {
      JSON.parse(result);
      console.log('JSON nettoyé avec succès');
      return result;
    } catch (e) {
      console.error('Échec du nettoyage, application d une méthode plus agressive');
      
      // Si toujours pas valide, essayer une approche plus drastique
      try {
        // Extraction simplifiée en utilisant une expression régulière pour juste prendre le premier niveau
        const regex = /\[\s*(\{[^{]*?\}(?:\s*,\s*\{[^{]*?\})*)\s*\]/;
        const match = jsonText.match(regex);
        if (match && match[0]) {
          const baseArray = match[0];
          console.log('Extraction simplifiée réussie');
          return baseArray;
        }
      } catch (e2) {
        console.error('Échec de l\'extraction simplifiée');
      }
      
      // Si tout échoue, retourner un tableau vide
      console.error('Retour d\'un tableau vide comme solution de dernier recours');
      return '[]';
    }
  }
  
  addExpense(expense: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/add`, JSON.stringify(expense), { headers }).pipe(
      tap(response => console.log('Dépense ajoutée:', response)),
      catchError(this.handleError)
    );
  }

  updateExpense(id: number, expense: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.apiUrl}/update/${id}`, JSON.stringify(expense), { headers }).pipe(
      tap(response => console.log('Dépense mise à jour:', response)),
      catchError(this.handleError)
    );
  }

  deleteExpense(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => console.log('Dépense supprimée, ID:', id)),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Une erreur est survenue:', error);
    
    // Si l'erreur est liée au parsing JSON
    if (error.message && error.message.includes('parsing')) {
      console.error('Erreur de parsing JSON. Réponse du serveur malformée.');
      return throwError(() => new Error('Le format de données retourné par le serveur est incorrect. Contactez l\'administrateur système.'));
    }
    
    // Vous pouvez personnaliser le message d'erreur en fonction du code d'erreur
    let errorMessage = 'Une erreur est survenue lors de la communication avec le serveur';
    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur renvoyée par le backend
      errorMessage = `Code d'erreur: ${error.status}, Message: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}