import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from './item.service';
import { AuthService } from '../auth/auth.service';

export interface Kit {
  id?: number;
  nome: string;
  imagens: string[]; // Array de URLs de imagens
  valor: number;
  categorias: any[];
}

@Injectable({
  providedIn: 'root',
})
export class KitService {
  private baseEndpoint = 'https://dino-festas.onrender.com/api/kits';

  constructor(private http: HttpClient) {}

  getKits(query: string = ''): Observable<Kit[]> {
    if (query)
      return this.http.get<Kit[]>(`${this.baseEndpoint}?query=${query}`);
    else return this.http.get<Kit[]>(`${this.baseEndpoint}`);
  }

  getKit(id: number): Observable<Kit> {
    return this.http.get<Kit>(`${this.baseEndpoint}/${id}`);
  }

  createKit(kit: Kit): Observable<Kit> {
    return this.http.post<Kit>(`${this.baseEndpoint}`, kit);
  }

  updateKit(id: number, kit: Kit): Observable<Kit> {
    return this.http.put<Kit>(`${this.baseEndpoint}/${id}`, kit);
  }

  deleteKit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }

  uploadImages(files: File[]): Observable<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    return this.http.post<string[]>(
      `${this.baseEndpoint}/upload-imagens`,
      formData
    );
  }
}
