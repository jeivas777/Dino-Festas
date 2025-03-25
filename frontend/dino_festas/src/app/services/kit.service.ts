import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Kit {
  nome: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class KitService {
  private baseEndpoint = 'http://localhost:8080/api/kits'
  
  constructor(private http:HttpClient) {}
  
  getKits(): Observable<Kit[]> {
    return this.http.get<Kit[]>(`${this.baseEndpoint}`)
  }

  createKit(kit: Kit): Observable<Kit> {
    return this.http.post<Kit>(`${this.baseEndpoint}`, kit)
  }

  updateKit(id: number, kit: Kit): Observable<Kit> {
    return this.http.put<Kit>(`${this.baseEndpoint}`, kit)
  }

  deleteKit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`)
  }
}
