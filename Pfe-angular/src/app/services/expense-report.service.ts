import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpenseReportService {
  private apiUrl = 'http://localhost:8888/MSEXPENSEREPORT/ndf';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAll`);
  }

  addNoteDeFrais(noteDeFrais: any) {
    const headers = {
      headers: { 'Content-Type': 'application/json' }
    };

    return this.http.post(`${this.apiUrl}/add`, JSON.stringify(noteDeFrais), headers);
  }


updateNoteDeFrais(id: number, noteDeFrais: any): Observable<any> {
  const headers = {
    headers: { 'Content-Type': 'application/json' }
  };
  return this.http.put(`${this.apiUrl}/update/${id}`, JSON.stringify(noteDeFrais), headers);
}

deleteNoteDeFrais(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/delete/${id}`);
}
}

  
