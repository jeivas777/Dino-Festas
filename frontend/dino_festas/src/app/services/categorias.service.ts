import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  private baseEndpoint =
    'https://dino-festas.onrender.com/api/categoriasDisponiveis';

  constructor(private http: HttpClient) {}

  getCategorias(query: string = ''): Observable<any> {
    if (query) {
      return this.http.get<any[]>(`${this.baseEndpoint}?query=${query}`);
    } else return this.http.get<any[]>(`${this.baseEndpoint}`);
  }

  getCategoria(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseEndpoint}/${id}`);
  }

  createCategorias(categoria: any): Observable<any> {
    return this.http.post<any>(`${this.baseEndpoint}`, categoria);
  }

  updateCategorias(id: number, item: any): Observable<any> {
    return this.http.put<any>(`${this.baseEndpoint}/${id}`, item);
  }

  deleteCategorias(id: number): Observable<void> {
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

  atualizarTodasCategorias(categorias: any[]): Observable<any> {
    return this.http.put<any>(
      `${this.baseEndpoint}/atualizar-todas`,
      categorias
    );
  }
}
