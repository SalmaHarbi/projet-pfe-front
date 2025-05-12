import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8888/MSUSER/user';

  constructor(private http: HttpClient) {}

  addUser(user: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; // Définissez le type de contenu comme JSON
    return this.http.post(`${this.apiUrl}/add`, JSON.stringify(user), { headers });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateUser(id: number, user: any): Observable<any> {
    const headers = { 'Content-Type': 'application/json' }; // Définissez le type de contenu comme JSON
    return this.http.put(`${this.apiUrl}/update/${id}`, JSON.stringify(user), { headers });
  }
}