import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JustificatifService {
private apiUrl = 'http://localhost:8888/MSEXPENSE/justif';

constructor(private http: HttpClient) {}

getAll(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/getAll`);
}


addJustificatif(justif: any) {
  const headers = {
    headers: { 'Content-Type': 'application/json' }
  };

  return this.http.post(`${this.apiUrl}/add`, JSON.stringify(justif), headers);
}





}